import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

interface Tab {
  id: string
  label: string
  count?: number
}

export function Tabs({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
  className?: string
}) {
  return (
    <div className={cn('flex gap-1 overflow-x-auto border-b border-slate-200 scroll-thin', className)}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            'relative whitespace-nowrap px-3.5 py-2.5 text-sm font-medium transition-colors focus-ring',
            active === t.id
              ? 'text-primary-700'
              : 'text-slate-500 hover:text-slate-800'
          )}
        >
          <span className="inline-flex items-center gap-1.5">
            {t.label}
            {t.count !== undefined && (
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-semibold tnum',
                  active === t.id ? 'bg-primary-100 text-primary-700' : 'bg-slate-100 text-slate-500'
                )}
              >
                {t.count}
              </span>
            )}
          </span>
          {active === t.id && (
            <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary-600" />
          )}
        </button>
      ))}
    </div>
  )
}
