import { cn, initials as getInitials } from '@/lib/utils'

const palette = [
  'bg-primary-100 text-primary-700',
  'bg-accent-100 text-accent-700',
  'bg-indigo-100 text-indigo-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-emerald-100 text-emerald-700',
  'bg-sky-100 text-sky-700',
]

function hash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h % palette.length
}

export function Avatar({
  name,
  size = 'md',
  className,
}: {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizes = {
    sm: 'h-7 w-7 text-[10px]',
    md: 'h-9 w-9 text-xs',
    lg: 'h-14 w-14 text-base',
  }
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full font-semibold ring-1 ring-inset ring-black/5',
        sizes[size],
        palette[hash(name)],
        className
      )}
      title={name}
    >
      {getInitials(name)}
    </div>
  )
}
