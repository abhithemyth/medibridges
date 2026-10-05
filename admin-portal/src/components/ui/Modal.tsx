import type { ReactNode } from 'react'
import { X, AlertTriangle } from 'lucide-react'
import { Button } from './Button'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
  tone?: 'default' | 'danger'
}

export function Modal({ open, onClose, title, description, children, footer, tone = 'default' }: ModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] animate-fade-in"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-xl animate-fade-in"
      >
        <div className="flex items-start gap-3 px-5 py-4">
          {tone === 'danger' && (
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus-ring" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children && <div className="px-5 pb-2 text-sm text-slate-600">{children}</div>}
        <div className={cn('flex justify-end gap-2 px-5 py-4', children ? 'pt-2' : '')}>
          {footer ?? (
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
