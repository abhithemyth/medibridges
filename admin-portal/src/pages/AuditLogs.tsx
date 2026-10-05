import { useState } from 'react'
import { Filter, ScrollText, X } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SearchInput, Select } from '@/components/ui/Input'
import { TableWrap, THead, TH, TBody, TR, TD } from '@/components/ui/Table'
import { ResultBadge } from '@/components/ui/StatusBadges'
import { Avatar } from '@/components/ui/Avatar'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState, LoadingRows } from '@/components/ui/States'
import { useTableState } from '@/lib/useTableState'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'
import { auditLogs, adminUsers } from '@/data/mockData'
import type { AuditLog } from '@/types'

function actionLabel(a: string) {
  return a.replace(/_/g, ' ').toLowerCase().replace(/(^|\s)\w/g, (m) => m.toUpperCase())
}

export function AuditLogs() {
  const loading = useSimulatedLoading(450)
  const [admin, setAdmin] = useState('ALL')
  const [action, setAction] = useState('ALL')

  const allActions = Array.from(new Set(auditLogs.map((l) => l.action)))
  const data = auditLogs.filter(
    (l) => (admin === 'ALL' || l.admin === admin) && (action === 'ALL' || l.action === action)
  )
  const table = useTableState<AuditLog>({
    data,
    pageSize: 10,
    searchKeys: ['admin', 'action', 'target'],
  })

  const active = admin !== 'ALL' || action !== 'ALL' || !!table.query

  return (
    <div>
      <PageHeader title="Audit Logs" subtitle="A complete trail of administrative actions taken on the platform." />

      <Card>
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
          <SearchInput value={table.query} onChange={table.setQuery} placeholder="Search admin, action, or target…" className="lg:max-w-xs lg:flex-1" />
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <Select value={admin} onChange={(e) => { setAdmin(e.target.value); table.setPage(1) }} className="w-48">
              <option value="ALL">All admins</option>
              {adminUsers.map((a) => <option key={a.id} value={a.name}>{a.name}</option>)}
            </Select>
            <Select value={action} onChange={(e) => { setAction(e.target.value); table.setPage(1) }} className="w-56">
              <option value="ALL">All actions</option>
              {allActions.map((a) => <option key={a} value={a}>{actionLabel(a)}</option>)}
            </Select>
            <Select value="" onChange={() => {}} className="w-40">
              <option value="">Any date</option>
              <option>Today</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </Select>
            {active && (
              <Button variant="ghost" size="sm" onClick={() => { setAdmin('ALL'); setAction('ALL'); table.setQuery('') }}>
                <X className="h-3.5 w-3.5" /> Clear
              </Button>
            )}
          </div>
        </div>

        {loading ? (
          <LoadingRows rows={8} cols={5} />
        ) : table.rows.length === 0 ? (
          <EmptyState icon={<ScrollText className="h-6 w-6" />} title="No audit entries" message="No admin actions match your filters." action={<Button variant="secondary" onClick={() => { setAdmin('ALL'); setAction('ALL'); table.setQuery('') }}>Clear filters</Button>} />
        ) : (
          <>
            <TableWrap>
              <THead>
                <TR>
                  <TH>Admin</TH>
                  <TH>Action</TH>
                  <TH>Target</TH>
                  <TH>Timestamp</TH>
                  <TH>Result</TH>
                </TR>
              </THead>
              <TBody>
                {table.rows.map((l) => (
                  <TR key={l.id}>
                    <TD>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={l.admin} size="sm" />
                        <span className="font-medium text-slate-800">{l.admin}</span>
                      </div>
                    </TD>
                    <TD>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">{actionLabel(l.action)}</span>
                    </TD>
                    <TD className="text-slate-600">{l.target}</TD>
                    <TD className="whitespace-nowrap text-slate-500 tnum">{l.timestamp}</TD>
                    <TD><ResultBadge result={l.result} /></TD>
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
