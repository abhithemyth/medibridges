import {
  LayoutDashboard,
  Users,
  Building2,
  Stethoscope,
  ClipboardList,
  FileText,
  Activity,
  AlertOctagon,
  Bell,
  ScrollText,
  ShieldCheck,
  Settings,
  LogOut,
  UserCircle,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { currentAdmin } from '@/data/mockData'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  badge?: number
}

interface NavGroup {
  title?: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    items: [{ to: '/', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'Management',
    items: [
      { to: '/patients', label: 'Patients', icon: Users },
      { to: '/hospitals', label: 'Hospitals', icon: Building2 },
      { to: '/doctors', label: 'Doctors', icon: Stethoscope },
      { to: '/consultations', label: 'Consultations', icon: ClipboardList },
      { to: '/documents', label: 'Documents', icon: FileText },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { to: '/ai-monitoring', label: 'AI Monitoring', icon: Activity },
      { to: '/ai-errors', label: 'AI Error Logs', icon: AlertOctagon, badge: 3 },
    ],
  },
  {
    title: 'System',
    items: [
      { to: '/notifications', label: 'Notifications', icon: Bell, badge: 3 },
      { to: '/audit-logs', label: 'Audit Logs', icon: ScrollText },
      { to: '/admin-users', label: 'Admin Users', icon: ShieldCheck },
      { to: '/settings', label: 'Settings', icon: Settings },
    ],
  },
]

function NavListItem({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const Icon = item.icon
  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-ring',
          isActive
            ? 'bg-primary-50 text-primary-700'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-primary-600" />
          )}
          <Icon className={cn('h-[18px] w-[18px] shrink-0', isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600')} />
          <span className="truncate">{item.label}</span>
          {item.badge ? (
            <span className="ml-auto rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-semibold text-white tnum">
              {item.badge}
            </span>
          ) : null}
        </>
      )}
    </NavLink>
  )
}

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-200/70 px-5">
        <img src="/logo.svg" alt="MedBridges" className="h-8 w-8" />
        <div className="leading-tight">
          <p className="text-[15px] font-bold tracking-tight text-slate-900">MedBridges</p>
          <p className="text-[11px] font-medium text-slate-400">Admin Console</p>
        </div>
        {onNavigate && (
          <button
            onClick={onNavigate}
            className="ml-auto rounded-md p-1 text-slate-400 hover:bg-slate-100 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4 scroll-thin">
        {navGroups.map((group, i) => (
          <div key={i}>
            {group.title && (
              <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {group.title}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavListItem key={item.to} item={item} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Profile / Logout */}
      <div className="border-t border-slate-200/70 p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-semibold text-white">
            {currentAdmin.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-800">{currentAdmin.name}</p>
            <p className="truncate text-xs text-slate-400">{currentAdmin.role}</p>
          </div>
        </div>
        <div className="mt-1 grid grid-cols-2 gap-1">
          <NavLink
            to="/settings"
            onClick={onNavigate}
            className="flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 focus-ring"
          >
            <UserCircle className="h-4 w-4" /> Profile
          </NavLink>
          <button
            className="flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 focus-ring"
            onClick={() => alert('Logout is disabled in the UI prototype.')}
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="sticky top-0 h-screen">
        <SidebarContent />
      </div>
    </aside>
  )
}

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-slate-900/40 transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
        aria-hidden
      />
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transition-transform duration-200 lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent onNavigate={onClose} />
      </div>
    </>
  )
}
