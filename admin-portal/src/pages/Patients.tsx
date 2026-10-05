import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Filter, Eye, X } from 'lucide-react'
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
import { patients } from '@/data/mockData'
import type { Patient } from '@/types'

export function Patients() {
  const loading = useSimulatedLoading(450)
  const [status, setStatus] = useState('ALL')

  const data = status === 'ALL' ? patients : patients.filter((p) => p.status === status)
  const table = useTableState<Patient>({
    data,
    pageSize: 8,
    searchKeys: ['name', 'email', 'id', 'city'],
    initialSort: { key: 'registered', dir: 'desc' },
  })

  return (
    <div>
      <PageHeader
        title="Patients"
        subtitle="Manage patient accounts across the MedBridges platform."
        actions={
          <Button variant="primary" onClick={() => alert('Add Patient is disabled in the UI prototype.')}>
            <Plus className="h-4 w-4" /> Add Patient
          </Button>
        }
      />

      <Card>
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
          <SearchInput
            value={table.query}
            onChange={table.setQuery}
            placeholder="Search by name, email, or ID…"
            className="lg:max-w-xs lg:flex-1"
          />
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <Select value={status} onChange={(e) => { setStatus(e.target.value); table.setPage(1) }} className="w-40">
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="PENDING">Pending</option>
              <option value="SUSPENDED">Suspended</option>
            </Select>
            <Select value="" onChange={() => {}} className="w-44">
              <option value="">Any date</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </Select>
            {(status !== 'ALL' || table.query) && (
              <Button variant="ghost" size="sm" onClick={() => { setStatus('ALL'); table.setQuery('') }}>
                <X className="h-3.5 w-3.5" /> Clear
              </Button>
            )}
          </div>
        </div>

        {loading ? (
          <LoadingRows rows={8} cols={6} />
        ) : table.rows.length === 0 ? (
          <EmptyState
            title="No patients found"
            message="No patients match your search or filters."
            action={<Button variant="secondary" onClick={() => { setStatus('ALL'); table.setQuery('') }}>Clear filters</Button>}
          />
        ) : (
          <>
            <TableWrap>
              <THead>
                <TR>
                  <TH sortable active={table.sort?.key === 'name'} dir={table.sort?.dir} onClick={() => table.toggleSort('name')}>Patient</TH>
                  <TH>Email</TH>
                  <TH sortable align="center" active={table.sort?.key === 'consultations'} dir={table.sort?.dir} onClick={() => table.toggleSort('consultations')}>Consultations</TH>
                  <TH sortable active={table.sort?.key === 'status'} dir={table.sort?.dir} onClick={() => table.toggleSort('status')}>Status</TH>
                  <TH sortable active={table.sort?.key === 'registered'} dir={table.sort?.dir} onClick={() => table.toggleSort('registered')}>Registered</TH>
                  <TH align="right">Actions</TH>
                </TR>
              </THead>
              <TBody>
                {table.rows.map((p) => (
                  <TR key={p.id}>
                    <TD>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={p.name} size="sm" />
                        <div className="leading-tight">
                          <p className="font-medium text-slate-800">{p.name}</p>
                          <p className="text-xs text-slate-400">{p.id} · {p.city}</p>
                        </div>
                      </div>
                    </TD>
                    <TD className="text-slate-600">{p.email}</TD>
                    <TD align="center" className="tnum text-slate-600">{p.consultations}</TD>
                    <TD><EntityStatusBadge status={p.status} /></TD>
                    <TD className="whitespace-nowrap text-slate-500 tnum">{p.registered}</TD>
                    <TD align="right">
                      <Link to={`/patients/${p.id}`} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-primary-600 hover:bg-primary-50 hover:text-primary-700 focus-ring">
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
