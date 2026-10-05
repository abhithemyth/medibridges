import { useState } from 'react'
import { Filter, AlertOctagon, X, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SearchInput, Select } from '@/components/ui/Input'
import { TableWrap, THead, TH, TBody, TR, TD } from '@/components/ui/Table'
import { ResolutionBadge } from '@/components/ui/StatusBadges'
import { Badge } from '@/components/ui/Badge'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState, LoadingRows } from '@/components/ui/States'
import { useTableState } from '@/lib/useTableState'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'
import { aiErrorLogs } from '@/data/mockData'
import type { AIErrorLog, AIErrorCode } from '@/types'

const errorCodes: AIErrorCode[] = [
  'AI_RATE_LIMITED', 'AI_UNAVAILABLE', 'AI_TIMEOUT', 'AI_INVALID_RESPONSE',
  'AI_AUTH_ERROR', 'AI_NOT_CONFIGURED', 'DOCUMENT_PROCESSING_FAILED',
]

function httpTone(status: number): 'rose' | 'amber' | 'slate' {
  if (status >= 500) return 'rose'
  if (status === 429) return 'amber'
  return 'slate'
}

export function AIErrorLogs() {
  const loading = useSimulatedLoading(450)
  const [code, setCode] = useState('ALL')
  const [resolution, setResolution] = useState('ALL')

  const data = aiErrorLogs.filter(
    (e) => (code === 'ALL' || e.errorCode === code) && (resolution === 'ALL' || e.resolution === resolution)
  )
  const table = useTableState<AIErrorLog>({
    data,
    pageSize: 10,
    searchKeys: ['analysisId', 'model', 'provider', 'errorCode'],
  })

  const active = code !== 'ALL' || resolution !== 'ALL' || !!table.query

  return (
    <div>
      <PageHeader title="AI Error Logs" subtitle="Provider-level failures and retries. Secrets are never displayed." />

      <div className="mb-4 flex items-start gap-3 rounded-lg border border-slate-200 bg-surface-50 px-4 py-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
        <div className="text-sm text-slate-600">
          <p className="font-medium text-slate-800">Security-safe view</p>
          <p className="mt-0.5">API keys, JWT tokens, passwords, and other secrets are redacted and never rendered in error logs.</p>
        </div>
      </div>

      <Card>
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
          <SearchInput value={table.query} onChange={table.setQuery} placeholder="Search analysis, model, provider…" className="lg:max-w-xs lg:flex-1" />
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <Select value={code} onChange={(e) => { setCode(e.target.value); table.setPage(1) }} className="w-56">
              <option value="ALL">All error codes</option>
              {errorCodes.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
            <Select value={resolution} onChange={(e) => { setResolution(e.target.value); table.setPage(1) }} className="w-40">
              <option value="ALL">All resolutions</option>
              <option value="RESOLVED">Resolved</option>
              <option value="RETRYING">Retrying</option>
              <option value="ESCALATED">Escalated</option>
              <option value="IGNORED">Ignored</option>
            </Select>
            {active && (
              <Button variant="ghost" size="sm" onClick={() => { setCode('ALL'); setResolution('ALL'); table.setQuery('') }}>
                <X className="h-3.5 w-3.5" /> Clear
              </Button>
            )}
          </div>
        </div>

        {loading ? (
          <LoadingRows rows={8} cols={8} />
        ) : table.rows.length === 0 ? (
          <EmptyState
            icon={<AlertOctagon className="h-6 w-6" />}
            title="No errors found"
            message="No error logs match your filters. This is a good sign."
            action={<Button variant="secondary" onClick={() => { setCode('ALL'); setResolution('ALL'); table.setQuery('') }}>Clear filters</Button>}
          />
        ) : (
          <>
            <TableWrap>
              <THead>
                <TR>
                  <TH>Analysis ID</TH>
                  <TH align="center">Attempt</TH>
                  <TH>Model</TH>
                  <TH>Provider</TH>
                  <TH align="center">HTTP</TH>
                  <TH>Error Code</TH>
                  <TH>Timestamp</TH>
                  <TH>Resolution</TH>
                </TR>
              </THead>
              <TBody>
                {table.rows.map((e) => (
                  <TR key={e.id}>
                    <TD className="font-medium text-slate-700 tnum">{e.analysisId}</TD>
                    <TD align="center"><span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-600 tnum">#{e.attempt}</span></TD>
                    <TD className="text-slate-600">{e.model}</TD>
                    <TD className="font-mono text-xs text-slate-500">{e.provider}</TD>
                    <TD align="center"><Badge tone={httpTone(e.httpStatus)}>{e.httpStatus}</Badge></TD>
                    <TD><span className="font-mono text-xs text-rose-600">{e.errorCode}</span></TD>
                    <TD className="whitespace-nowrap text-slate-500">{e.timestamp}</TD>
                    <TD><ResolutionBadge resolution={e.resolution} /></TD>
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
