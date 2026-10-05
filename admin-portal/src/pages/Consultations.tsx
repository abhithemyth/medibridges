import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter, Eye, X } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SearchInput, Select } from '@/components/ui/Input'
import { TableWrap, THead, TH, TBody, TR, TD } from '@/components/ui/Table'
import { ConsultationStatusBadge, AIStatusBadge } from '@/components/ui/StatusBadges'
import { Avatar } from '@/components/ui/Avatar'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState, LoadingRows } from '@/components/ui/States'
import { useTableState } from '@/lib/useTableState'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'
import { consultations, hospitals, departments } from '@/data/mockData'
import type { Consultation, ConsultationStatus } from '@/types'

const statuses: ConsultationStatus[] = ['NEW', 'PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELLED']

export function Consultations() {
  const loading = useSimulatedLoading(500)
  const [status, setStatus] = useState('ALL')
  const [hospital, setHospital] = useState('ALL')
  const [dept, setDept] = useState('ALL')

  const data = consultations.filter(
    (c) =>
      (status === 'ALL' || c.status === status) &&
      (hospital === 'ALL' || c.hospital === hospital) &&
      (dept === 'ALL' || c.department === dept)
  )
  const table = useTableState<Consultation>({
    data,
    pageSize: 8,
    searchKeys: ['caseId', 'patient', 'hospital', 'department'],
  })

  const active = status !== 'ALL' || hospital !== 'ALL' || dept !== 'ALL' || !!table.query

  // Status summary chips
  const counts = statuses.map((s) => ({ s, n: consultations.filter((c) => c.status === s).length }))

  return (
    <div>
      <PageHeader title="Consultations" subtitle="Review and manage every consultation case across the platform." />

      {/* Status summary */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => { setStatus('ALL'); table.setPage(1) }}
          className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors focus-ring ${status === 'ALL' ? 'border-primary-300 bg-primary-50 text-primary-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
        >
          All <span className="tnum text-slate-400">{consultations.length}</span>
        </button>
        {counts.map(({ s, n }) => (
          <button
            key={s}
            onClick={() => { setStatus(s); table.setPage(1) }}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium capitalize transition-colors focus-ring ${status === s ? 'border-primary-300 bg-primary-50 text-primary-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
          >
            {s.toLowerCase()} <span className="tnum text-slate-400">{n}</span>
          </button>
        ))}
      </div>

      <Card>
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 xl:flex-row xl:items-center">
          <SearchInput value={table.query} onChange={table.setQuery} placeholder="Search case, patient, hospital…" className="xl:max-w-xs xl:flex-1" />
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <Select value={hospital} onChange={(e) => { setHospital(e.target.value); table.setPage(1) }} className="w-48">
              <option value="ALL">All hospitals</option>
              {hospitals.map((h) => <option key={h.id} value={h.name}>{h.name}</option>)}
            </Select>
            <Select value={dept} onChange={(e) => { setDept(e.target.value); table.setPage(1) }} className="w-44">
              <option value="ALL">All departments</option>
              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </Select>
            <Select value="" onChange={() => {}} className="w-40">
              <option value="">Any date</option>
              <option>Today</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </Select>
            {active && (
              <Button variant="ghost" size="sm" onClick={() => { setStatus('ALL'); setHospital('ALL'); setDept('ALL'); table.setQuery('') }}>
                <X className="h-3.5 w-3.5" /> Clear
              </Button>
            )}
          </div>
        </div>

        {loading ? (
          <LoadingRows rows={8} cols={7} />
        ) : table.rows.length === 0 ? (
          <EmptyState title="No consultations found" message="No cases match your search or filters." action={<Button variant="secondary" onClick={() => { setStatus('ALL'); setHospital('ALL'); setDept('ALL'); table.setQuery('') }}>Clear filters</Button>} />
        ) : (
          <>
            <TableWrap>
              <THead>
                <TR>
                  <TH>Case ID</TH>
                  <TH>Patient</TH>
                  <TH>Hospital</TH>
                  <TH>Department</TH>
                  <TH>Submitted</TH>
                  <TH>Status</TH>
                  <TH>AI</TH>
                  <TH align="right">Actions</TH>
                </TR>
              </THead>
              <TBody>
                {table.rows.map((c) => (
                  <TR key={c.id}>
                    <TD className="font-medium text-slate-700 tnum">{c.caseId}</TD>
                    <TD>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={c.patient} size="sm" />
                        <span className="font-medium text-slate-800">{c.patient}</span>
                      </div>
                    </TD>
                    <TD className="text-slate-600">{c.hospital}</TD>
                    <TD><span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{c.department}</span></TD>
                    <TD className="whitespace-nowrap text-slate-500">{c.submitted}</TD>
                    <TD><ConsultationStatusBadge status={c.status} /></TD>
                    <TD><AIStatusBadge status={c.aiStatus} /></TD>
                    <TD align="right">
                      <Link to={`/consultations/${c.id}`} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-primary-600 hover:bg-primary-50 hover:text-primary-700 focus-ring">
                        <Eye className="h-4 w-4" /> View
                      </Link>
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
