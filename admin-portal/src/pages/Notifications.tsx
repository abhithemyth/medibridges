import { useState } from 'react'
import { Bell, Sparkles, ClipboardList, UserPlus, ShieldAlert, Settings2, CheckCheck, MailOpen } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/States'
import { cn } from '@/lib/utils'
import { notifications as seed } from '@/data/mockData'
import type { Notification, NotificationType } from '@/types'

const typeMeta: Record<NotificationType, { icon: typeof Bell; tone: string; label: string }> = {
  CONSULTATION: { icon: ClipboardList, tone: 'bg-primary-50 text-primary-600', label: 'Consultation' },
  AI: { icon: Sparkles, tone: 'bg-violet-50 text-violet-600', label: 'AI' },
  REGISTRATION: { icon: UserPlus, tone: 'bg-sky-50 text-sky-600', label: 'Registration' },
  SECURITY: { icon: ShieldAlert, tone: 'bg-rose-50 text-rose-600', label: 'Security' },
  SYSTEM: { icon: Settings2, tone: 'bg-slate-100 text-slate-600', label: 'System' },
}

const filters: { id: string; label: string }[] = [
  { id: 'ALL', label: 'All' },
  { id: 'UNREAD', label: 'Unread' },
  { id: 'CONSULTATION', label: 'Consultation' },
  { id: 'AI', label: 'AI' },
  { id: 'REGISTRATION', label: 'Registration' },
  { id: 'SECURITY', label: 'Security' },
  { id: 'SYSTEM', label: 'System' },
]

export function Notifications() {
  const [items, setItems] = useState<Notification[]>(seed)
  const [filter, setFilter] = useState('ALL')

  const unread = items.filter((n) => !n.read).length
  const shown = items.filter((n) =>
    filter === 'ALL' ? true : filter === 'UNREAD' ? !n.read : n.type === filter
  )

  function markRead(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }
  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="Platform alerts and activity notifications for administrators."
        actions={
          <Button variant="secondary" onClick={markAllRead} disabled={unread === 0}>
            <CheckCheck className="h-4 w-4" /> Mark all read
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {filters.map((f) => {
          const n = f.id === 'ALL' ? items.length : f.id === 'UNREAD' ? unread : items.filter((x) => x.type === f.id).length
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors focus-ring',
                filter === f.id
                  ? 'border-primary-300 bg-primary-50 text-primary-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              )}
            >
              {f.label} <span className="tnum text-slate-400">{n}</span>
            </button>
          )
        })}
        {unread > 0 && (
          <Badge tone="blue" className="ml-auto" dot>{unread} unread</Badge>
        )}
      </div>

      <Card>
        {shown.length === 0 ? (
          <EmptyState icon={<Bell className="h-6 w-6" />} title="No notifications" message="You're all caught up in this view." />
        ) : (
          <ul className="divide-y divide-slate-100">
            {shown.map((n) => {
              const meta = typeMeta[n.type]
              const Icon = meta.icon
              return (
                <li
                  key={n.id}
                  className={cn('flex items-start gap-3.5 px-4 py-3.5 transition-colors hover:bg-surface-50', !n.read && 'bg-primary-50/30')}
                >
                  <span className={cn('mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', meta.tone)}>
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                          {n.title}
                          {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary-500" />}
                        </p>
                        <p className="mt-0.5 text-sm text-slate-600">{n.message}</p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                          <Badge tone="neutral">{meta.label}</Badge>
                          <span className="font-mono">{n.entity}</span>
                          <span>· {n.time}</span>
                        </div>
                      </div>
                      {!n.read && (
                        <Button variant="ghost" size="sm" className="shrink-0" onClick={() => markRead(n.id)}>
                          <MailOpen className="h-3.5 w-3.5" /> Mark read
                        </Button>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </Card>
    </div>
  )
}
