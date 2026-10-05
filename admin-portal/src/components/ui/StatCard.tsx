import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: string
  trendDir?: 'up' | 'down' | 'flat'
  tone?: 'blue' | 'teal' | 'indigo' | 'emerald'
  hint?: string
}

const tones = {
  blue: 'bg-primary-50 text-primary-600',
  teal: 'bg-accent-50 text-accent-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  emerald: 'bg-emerald-50 text-emerald-600',
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendDir = 'up',
  tone = 'blue',
  hint,
}: StatCardProps) {
  return (
    <div className="card card-hover p-5">
      <div className="flex items-start justify-between">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', tones[tone])}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium tnum',
              trendDir === 'up' && 'bg-emerald-50 text-emerald-700',
              trendDir === 'down' && 'bg-rose-50 text-rose-700',
              trendDir === 'flat' && 'bg-slate-100 text-slate-600'
            )}
          >
            {trendDir === 'up' && <TrendingUp className="h-3 w-3" />}
            {trendDir === 'down' && <TrendingDown className="h-3 w-3" />}
            {trend}
          </span>
        )}
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 tnum">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
      {hint && <p className="mt-2 text-xs text-slate-400">{hint}</p>}
    </div>
  )
}
