import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Filter, Eye, BadgeCheck, X } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SearchInput, Select } from '@/components/ui/Input'
import { TableWrap, THead, TH, TBody, TR, TD } from '@/components/ui/Table'
import { EntityStatusBadge } from '@/components/ui/StatusBadges'
import { Avatar } from '@/components/ui/Avatar'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState, LoadingRows } from '@/components/ui/States'
import { useTableState } from '@/lib/useTableState'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'
import { hospitals } from '@/data/mockData'
import type { Hospital } from '@/types'

export function Hospitals() {
  const loading = useSimulatedLoading(450)
  const [status, setStatus] = useState('ALL')

  const data = status === 'ALL' ? hospitals : hospitals.filter((h) => h.status === status)
  const table = useTableState<Hospital>({
    data,
    pageSize: 8,
    searchKeys: ['name', 'location', 'id'],
    initialSort: { key: 'consultations', dir: 'desc' },
  })

  return (
    <div>
      <PageHeader
        title="Hospitals"
        subtitle="Oversee hospitals, verification, and capacity across the network."
        actions={
          <Button variant="primary" onClick={() => alert('Add Hospital is disabled in the UI prototype.')}>
            <Plus className="h-4 w-4" /> Add Hospital
          </Button>
        }
      />

      <Card>
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
          <SearchInput value={table.query} onChange={table.setQuery} placeholder="Search hospitals or location…" className="lg:max-w-xs lg:flex-1" />
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <Select value={status} onChange={(e) => { setStatus(e.target.value); table.setPage(1) }} className="w-40">
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING">Pending</option>
              <option value="INACTIVE">Inactive</option>
            </Select>
            {(status !== 'ALL' || table.query) && (
              <Button variant="ghost" size="sm" onClick={() => { setStatus('ALL'); table.setQuery('') }}>
                <X className="h-3.5 w-3.5" /> Clear
              </Button>
            )}
          </div>
        </div>

        {loading ? (
          <LoadingRows rows={7} cols={7} />
        ) : table.rows.length === 0 ? (
          <EmptyState title="No hospitals found" message="No hospitals match your search or filters." action={<Button variant="secondary" onClick={() => { setStatus('ALL'); table.setQuery('') }}>Clear filters</Button>} />
        ) : (
          <>
            <TableWrap>
              <THead>
                <TR>
                  <TH sortable active={table.sort?.key === 'name'} dir={table.sort?.dir} onClick={() => table.toggleSort('name')}>Hospital</TH>
                  <TH>Location</TH>
                  <TH sortable align="center" active={table.sort?.key === 'doctors'} dir={table.sort?.dir} onClick={() => table.toggleSort('doctors')}>Doctors</TH>
                  <TH align="center">Departments</TH>
                  <TH sortable align="center" active={table.sort?.key === 'consultations'} dir={table.sort?.dir} onClick={() => table.toggleSort('consultations')}>Consultations</TH>
                  <TH>Status</TH>
                  <TH align="right">Actions</TH>
                </TR>
              </THead>
              <TBody>
                {table.rows.map((h) => (
                  <TR key={h.id}>
                    <TD>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={h.name} size="sm" />
                        <div className="leading-tight">
                          <p className="flex items-center gap-1 font-medium text-slate-800">
                            {h.name}
                            {h.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary-500" />}
                          </p>
                          <p className="text-xs text-slate-400">{h.id}</p>
                        </div>
                      </div>
                    </TD>
                    <TD className="text-slate-600">{h.location}</TD>
                    <TD align="center" className="tnum text-slate-600">{h.doctors}</TD>
                    <TD align="center" className="tnum text-slate-600">{h.departments}</TD>
                    <TD align="center" className="tnum text-slate-600">{h.consultations}</TD>
                    <TD><EntityStatusBadge status={h.status} /></TD>
                    <TD align="right">
                      <Link to={`/hospitals/${h.id}`} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-primary-600 hover:bg-primary-50 hover:text-primary-700 focus-ring">
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
