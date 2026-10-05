import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Bell, Search } from 'lucide-react'
import { currentAdmin, notifications } from '@/data/mockData'
import { cn } from '@/lib/utils'

export function Header({ onMenu }: { onMenu: () => void }) {
  const [openNotif, setOpenNotif] = useState(false)
  const unread = notifications.filter((n) => !n.read).length
  const recent = notifications.slice(0, 4)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onMenu}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus-ring lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Search patients, hospitals, consultations…"
          className="h-9.5 w-full rounded-lg border border-slate-200 bg-surface-50 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 transition-colors hover:border-slate-300 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/15"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setOpenNotif((v) => !v)}
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus-ring"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white tnum">
                {unread}
              </span>
            )}
          </button>

          {openNotif && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpenNotif(false)} aria-hidden />
              <div className="absolute right-0 z-20 mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-800">Notifications</p>
                  <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700 tnum">
                    {unread} new
                  </span>
                </div>
                <div className="max-h-80 divide-y divide-slate-50 overflow-y-auto scroll-thin">
                  {recent.map((n) => (
                    <div key={n.id} className={cn('px-4 py-3 hover:bg-surface-50', !n.read && 'bg-primary-50/40')}>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-slate-800">{n.title}</p>
                        {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary-500" />}
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">{n.message}</p>
                      <p className="mt-1 text-[11px] text-slate-400">{n.time}</p>
                    </div>
                  ))}
                </div>
                <Link
                  to="/notifications"
                  onClick={() => setOpenNotif(false)}
                  className="block border-t border-slate-100 px-4 py-2.5 text-center text-sm font-medium text-primary-600 hover:bg-surface-50"
                >
                  View all notifications
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Profile */}
        <div className="hidden items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-xs font-semibold text-white">
            {currentAdmin.initials}
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium text-slate-800">{currentAdmin.name}</p>
            <p className="text-xs text-slate-400">{currentAdmin.role}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
