import { useState } from 'react'
import { Plus, ShieldCheck, Power, Pencil, X } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SearchInput, Select } from '@/components/ui/Input'
import { TableWrap, THead, TH, TBody, TR, TD } from '@/components/ui/Table'
import { EntityStatusBadge, RoleBadge } from '@/components/ui/StatusBadges'
import { Avatar } from '@/components/ui/Avatar'
import { Modal } from '@/components/ui/Modal'
import { EmptyState } from '@/components/ui/States'
import { useTableState } from '@/lib/useTableState'
import { adminUsers as seed, currentAdmin } from '@/data/mockData'
import type { AdminUser, EntityStatus } from '@/types'

export function AdminUsers() {
  const [rows, setRows] = useState<AdminUser[]>(seed)
  const [role, setRole] = useState('ALL')
  const [status, setStatus] = useState('ALL')
  const [confirm, setConfirm] = useState<AdminUser | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const data = rows.filter(
    (u) => (role === 'ALL' || u.role === role) && (status === 'ALL' || u.status === status)
  )
  const table = useTableState<AdminUser>({
    data,
    pageSize: 8,
    searchKeys: ['name', 'email'],
  })

  const active = role !== 'ALL' || status !== 'ALL' || !!table.query

  function toggleActive(user: AdminUser) {
    const next: EntityStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    setRows((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: next } : u)))
    setConfirm(null)
    setToast(`${user.name} is now ${next === 'ACTIVE' ? 'active' : 'deactivated'}.`)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div>
      <PageHeader
        title="Admin Users"
        subtitle="Manage administrator accounts, roles, and platform access."
        actions={
          <Button variant="primary" onClick={() => alert('Add Admin is disabled in the UI prototype.')}>
            <Plus className="h-4 w-4" /> Add Admin
          </Button>
        }
      />

      <Card>
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
          <SearchInput value={table.query} onChange={table.setQuery} placeholder="Search admins…" className="lg:max-w-xs lg:flex-1" />
          <div className="flex flex-wrap items-center gap-2">
            <Select value={role} onChange={(e) => { setRole(e.target.value); table.setPage(1) }} className="w-44">
              <option value="ALL">All roles</option>
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="ADMIN">Admin</option>
            </Select>
            <Select value={status} onChange={(e) => { setStatus(e.target.value); table.setPage(1) }} className="w-36">
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </Select>
            {active && (
              <Button variant="ghost" size="sm" onClick={() => { setRole('ALL'); setStatus('ALL'); table.setQuery('') }}>
                <X className="h-3.5 w-3.5" /> Clear
              </Button>
            )}
          </div>
        </div>

        {table.rows.length === 0 ? (
          <EmptyState icon={<ShieldCheck className="h-6 w-6" />} title="No admin users" message="No administrators match your filters." action={<Button variant="secondary" onClick={() => { setRole('ALL'); setStatus('ALL'); table.setQuery('') }}>Clear filters</Button>} />
        ) : (
          <TableWrap>
            <THead>
              <TR>
                <TH>Admin</TH>
                <TH>Email</TH>
                <TH>Role</TH>
                <TH>Status</TH>
                <TH>Last Login</TH>
                <TH>Created</TH>
                <TH align="right">Actions</TH>
              </TR>
            </THead>
            <TBody>
              {table.rows.map((u) => {
                const isSelf = u.email === currentAdmin.email
                return (
                  <TR key={u.id}>
                    <TD>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={u.name} size="sm" />
                        <div className="leading-tight">
                          <p className="font-medium text-slate-800">{u.name}{isSelf && <span className="ml-1.5 text-xs font-normal text-slate-400">(you)</span>}</p>
                        </div>
                      </div>
                    </TD>
                    <TD className="text-slate-600">{u.email}</TD>
                    <TD><RoleBadge role={u.role} /></TD>
                    <TD><EntityStatusBadge status={u.status} /></TD>
                    <TD className="whitespace-nowrap text-slate-500">{u.lastLogin}</TD>
                    <TD className="whitespace-nowrap text-slate-500 tnum">{u.created}</TD>
                    <TD align="right">
                      <div className="inline-flex items-center gap-1">
                        <button title="Edit" className="rounded-md p-1.5 text-slate-500 hover:bg-primary-50 hover:text-primary-600 focus-ring disabled:opacity-40" disabled={isSelf} onClick={() => alert('Edit is disabled in the UI prototype.')}><Pencil className="h-4 w-4" /></button>
                        <button
                          title={u.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                          className="rounded-md p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600 focus-ring disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={isSelf}
                          onClick={() => (u.status === 'ACTIVE' ? setConfirm(u) : toggleActive(u))}
                        >
                          <Power className="h-4 w-4" />
                        </button>
                      </div>
                    </TD>
                  </TR>
                )
              })}
            </TBody>
          </TableWrap>
        )}
      </Card>

      <Modal
        open={!!confirm}
        onClose={() => setConfirm(null)}
        tone="danger"
        title="Deactivate admin"
        description={`Deactivate ${confirm?.name}? They will immediately lose access to the admin console.`}
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
