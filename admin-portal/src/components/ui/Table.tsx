import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function TableWrap({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('w-full overflow-x-auto scroll-thin', className)}>
      <table className="w-full min-w-full border-collapse text-sm">{children}</table>
    </div>
  )
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className="bg-surface-50">{children}</thead>
}

export function TH({
  children,
  className,
  align = 'left',
  sortable,
  active,
  dir,
  onClick,
}: {
  children?: ReactNode
  className?: string
  align?: 'left' | 'right' | 'center'
  sortable?: boolean
  active?: boolean
  dir?: 'asc' | 'desc'
  onClick?: () => void
}) {
  return (
    <th
      onClick={onClick}
      className={cn(
        'whitespace-nowrap border-b border-slate-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
        sortable && 'cursor-pointer select-none hover:text-slate-700',
        active && 'text-primary-700',
        className
      )}
    >
      <span className={cn('inline-flex items-center gap-1', align === 'right' && 'flex-row-reverse')}>
        {children}
        {sortable && (
          <span className={cn('text-[10px]', !active && 'text-slate-300')}>
            {active ? (dir === 'asc' ? '▲' : '▼') : '↕'}
          </span>
        )}
      </span>
    </th>
  )
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-slate-100">{children}</tbody>
}

export function TR({
  children,
  className,
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <tr
      onClick={onClick}
      className={cn('transition-colors hover:bg-surface-50', onClick && 'cursor-pointer', className)}
    >
      {children}
    </tr>
  )
}

export function TD({
  children,
  className,
  align = 'left',
}: {
  children?: ReactNode
  className?: string
  align?: 'left' | 'right' | 'center'
}) {
  return (
    <td
      className={cn(
        'px-4 py-3 text-slate-700',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        className
      )}
    >
      {children}
    </td>
  )
}
