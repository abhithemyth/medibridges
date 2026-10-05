import { useState } from 'react'
import { Filter, Download, Eye, ShieldAlert, Lock, X } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SearchInput, Select } from '@/components/ui/Input'
import { TableWrap, THead, TH, TBody, TR, TD } from '@/components/ui/Table'
import { AIStatusBadge, DocStatusBadge } from '@/components/ui/StatusBadges'
import { Badge } from '@/components/ui/Badge'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState, LoadingRows } from '@/components/ui/States'
import { useTableState } from '@/lib/useTableState'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'
import { documents } from '@/data/mockData'
import type { DocumentRecord } from '@/types'

const docTypes = ['Radiology', 'Report', 'Lab', 'Pathology', 'Administrative']

const typeIconBg: Record<string, string> = {
  Radiology: 'bg-indigo-50 text-indigo-600',
  Report: 'bg-primary-50 text-primary-600',
  Lab: 'bg-accent-50 text-accent-600',
  Pathology: 'bg-rose-50 text-rose-600',
  Administrative: 'bg-slate-100 text-slate-600',
}

export function Documents() {
  const loading = useSimulatedLoading(450)
  const [type, setType] = useState('ALL')
  const [ai, setAi] = useState('ALL')

  const data = documents.filter(
    (d) => (type === 'ALL' || d.type === type) && (ai === 'ALL' || d.aiStatus === ai)
  )
  const table = useTableState<DocumentRecord>({
    data,
    pageSize: 8,
    searchKeys: ['name', 'patient', 'consultation', 'type'],
  })

  const active = type !== 'ALL' || ai !== 'ALL' || !!table.query

  return (
    <div>
      <PageHeader
        title="Documents"
        subtitle="Medical documents uploaded across consultations. Sensitive files are protected."
      />

      <div className="mb-4 flex items-start gap-3 rounded-lg border border-amber-100 bg-amber-50/60 px-4 py-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div className="text-sm text-amber-800">
          <p className="font-medium">Sensitive medical data</p>
          <p className="mt-0.5 text-amber-700/90">
            Documents marked <Badge tone="amber" className="mx-0.5"><Lock className="h-3 w-3" /> Sensitive</Badge> contain protected health information. Access is logged and restricted to authorized roles.
          </p>
        </div>
      </div>

      <Card>
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
          <SearchInput value={table.query} onChange={table.setQuery} placeholder="Search documents, patient, or case…" className="lg:max-w-xs lg:flex-1" />
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <Select value={type} onChange={(e) => { setType(e.target.value); table.setPage(1) }} className="w-44">
              <option value="ALL">All types</option>
              {docTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
            <Select value={ai} onChange={(e) => { setAi(e.target.value); table.setPage(1) }} className="w-40">
              <option value="ALL">All AI statuses</option>
              <option value="SUCCESS">Success</option>
              <option value="PROCESSING">Processing</option>
              <option value="FAILED">Failed</option>
              <option value="PENDING">Pending</option>
            </Select>
            {active && (
              <Button variant="ghost" size="sm" onClick={() => { setType('ALL'); setAi('ALL'); table.setQuery('') }}>
                <X className="h-3.5 w-3.5" /> Clear
              </Button>
            )}
          </div>
        </div>

        {loading ? (
          <LoadingRows rows={8} cols={8} />
        ) : table.rows.length === 0 ? (
          <EmptyState title="No documents found" message="No documents match your search or filters." action={<Button variant="secondary" onClick={() => { setType('ALL'); setAi('ALL'); table.setQuery('') }}>Clear filters</Button>} />
        ) : (
          <>
            <TableWrap>
              <THead>
                <TR>
                  <TH>Document</TH>
                  <TH>Patient</TH>
                  <TH>Consultation</TH>
                  <TH>Type</TH>
                  <TH>Uploaded</TH>
                  <TH>Processing</TH>
                  <TH>AI Status</TH>
                  <TH align="right">Actions</TH>
                </TR>
              </THead>
              <TBody>
                {table.rows.map((d) => (
                  <TR key={d.id}>
                    <TD>
                      <div className="flex items-center gap-2.5">
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${typeIconBg[d.type] ?? 'bg-slate-100 text-slate-500'}`}>
                          {d.sensitive ? <Lock className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </span>
                        <div className="min-w-0 leading-tight">
                          <p className="truncate font-medium text-slate-800">{d.name}</p>
                          <p className="text-xs text-slate-400 tnum">{(d.sizeKb / 1024).toFixed(1)} MB</p>
                        </div>
                      </div>
                    </TD>
                    <TD className="text-slate-600">{d.patient}</TD>
                    <TD className="text-slate-500 tnum">{d.consultation}</TD>
                    <TD><span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{d.type}</span></TD>
                    <TD className="whitespace-nowrap text-slate-500">{d.uploaded}</TD>
                    <TD><DocStatusBadge status={d.processingStatus} /></TD>
                    <TD><AIStatusBadge status={d.aiStatus} /></TD>
                    <TD align="right">
                      <div className="inline-flex items-center gap-1">
                        <button title="View" className="rounded-md p-1.5 text-slate-500 hover:bg-primary-50 hover:text-primary-600 focus-ring" onClick={() => alert('Document preview is disabled in the UI prototype.')}><Eye className="h-4 w-4" /></button>
                        <button title="Download" className="rounded-md p-1.5 text-slate-500 hover:bg-primary-50 hover:text-primary-600 focus-ring" onClick={() => alert('Download is disabled in the UI prototype.')}><Download className="h-4 w-4" /></button>
                      </div>
                    </TD>
                  </TR>
                ))}
              </TBody>
            </TableWrap>
            <Pagination page={table.page} pageSize={table.pageSize} total={table.total} onPage={table.setPage} />
          </>
        )}
      </Card>
    </div>
  )
}
