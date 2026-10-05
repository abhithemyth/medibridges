import { useState } from 'react'
import { Plus, Filter, Eye, Pencil, Power, X } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SearchInput, Select } from '@/components/ui/Input'
import { TableWrap, THead, TH, TBody, TR, TD } from '@/components/ui/Table'
import { EntityStatusBadge } from '@/components/ui/StatusBadges'
import { Avatar } from '@/components/ui/Avatar'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState, LoadingRows } from '@/components/ui/States'
import { Modal } from '@/components/ui/Modal'
import { useTableState } from '@/lib/useTableState'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'
import { doctors as seedDoctors, departments } from '@/data/mockData'
import type { Doctor, EntityStatus } from '@/types'

export function Doctors() {
  const loading = useSimulatedLoading(450)
  const [status, setStatus] = useState('ALL')
  const [dept, setDept] = useState('ALL')
  const [rows, setRows] = useState<Doctor[]>(seedDoctors)
  const [confirm, setConfirm] = useState<Doctor | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const data = rows.filter(
    (d) => (status === 'ALL' || d.status === status) && (dept === 'ALL' || d.department === dept)
  )
  const table = useTableState<Doctor>({
    data,
    pageSize: 8,
    searchKeys: ['name', 'specialization', 'hospital'],
    initialSort: { key: 'consultations', dir: 'desc' },
  })

  function toggleActive(doc: Doctor) {
    const next: EntityStatus = doc.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    setRows((prev) => prev.map((d) => (d.id === doc.id ? { ...d, status: next } : d)))
    setConfirm(null)
    setToast(`${doc.name} is now ${next === 'ACTIVE' ? 'active' : 'deactivated'}.`)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div>
      <PageHeader
        title="Doctors"
        subtitle="Manage medical professionals and their platform access."
        actions={
          <Button variant="primary" onClick={() => alert('Add Doctor is disabled in the UI prototype.')}>
            <Plus className="h-4 w-4" /> Add Doctor
          </Button>
        }
      />

      <Card>
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
          <SearchInput value={table.query} onChange={table.setQuery} placeholder="Search doctors…" className="lg:max-w-xs lg:flex-1" />
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <Select value={dept} onChange={(e) => { setDept(e.target.value); table.setPage(1) }} className="w-40">
              <option value="ALL">All departments</option>
              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </Select>
            <Select value={status} onChange={(e) => { setStatus(e.target.value); table.setPage(1) }} className="w-36">
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="PENDING">Pending</option>
            </Select>
            {(status !== 'ALL' || dept !== 'ALL' || table.query) && (
              <Button variant="ghost" size="sm" onClick={() => { setStatus('ALL'); setDept('ALL'); table.setQuery('') }}>
                <X className="h-3.5 w-3.5" /> Clear
              </Button>
            )}
          </div>
        </div>

        {loading ? (
          <LoadingRows rows={8} cols={7} />
        ) : table.rows.length === 0 ? (
          <EmptyState title="No doctors found" message="No doctors match your search or filters." action={<Button variant="secondary" onClick={() => { setStatus('ALL'); setDept('ALL'); table.setQuery('') }}>Clear filters</Button>} />
        ) : (
          <>
            <TableWrap>
              <THead>
                <TR>
                  <TH sortable active={table.sort?.key === 'name'} dir={table.sort?.dir} onClick={() => table.toggleSort('name')}>Doctor</TH>
                  <TH>Specialization</TH>
                  <TH>Hospital</TH>
                  <TH>Department</TH>
                  <TH sortable align="center" active={table.sort?.key === 'consultations'} dir={table.sort?.dir} onClick={() => table.toggleSort('consultations')}>Consultations</TH>
                  <TH>Status</TH>
                  <TH align="right">Actions</TH>
                </TR>
              </THead>
              <TBody>
                {table.rows.map((d) => (
                  <TR key={d.id}>
                    <TD>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={d.name} size="sm" />
                        <div className="leading-tight"><p className="font-medium text-slate-800">{d.name}</p><p className="text-xs text-slate-400">{d.experience} yrs exp</p></div>
                      </div>
                    </TD>
                    <TD className="text-slate-600">{d.specialization}</TD>
                    <TD className="text-slate-600">{d.hospital}</TD>
                    <TD><span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{d.department}</span></TD>
                    <TD align="center" className="tnum text-slate-600">{d.consultations}</TD>
                    <TD><EntityStatusBadge status={d.status} /></TD>
                    <TD align="right">
                      <div className="inline-flex items-center gap-1">
                        <button title="View" className="rounded-md p-1.5 text-slate-500 hover:bg-primary-50 hover:text-primary-600 focus-ring" onClick={() => alert('View is disabled in the UI prototype.')}><Eye className="h-4 w-4" /></button>
                        <button title="Edit" className="rounded-md p-1.5 text-slate-500 hover:bg-primary-50 hover:text-primary-600 focus-ring" onClick={() => alert('Edit is disabled in the UI prototype.')}><Pencil className="h-4 w-4" /></button>
                        <button
                          title={d.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                          className="rounded-md p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600 focus-ring"
                          onClick={() => (d.status === 'ACTIVE' ? setConfirm(d) : toggleActive(d))}
                        >
                          <Power className="h-4 w-4" />
                        </button>
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

      <Modal
        open={!!confirm}
        onClose={() => setConfirm(null)}
        tone="danger"
        title="Deactivate doctor"
        description={`Deactivate ${confirm?.name}? They will lose access to new consultations until reactivated.`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirm(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => confirm && toggleActive(confirm)}>
              <Power className="h-4 w-4" /> Deactivate
            </Button>
          </>
        }
      />

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  )
}
