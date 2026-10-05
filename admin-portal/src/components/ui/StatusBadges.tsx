import { Badge } from './Badge'
import type { ConsultationStatus, AIStatus, EntityStatus, AdminRole } from '@/types'

const consultationTone: Record<ConsultationStatus, 'blue' | 'amber' | 'green' | 'rose' | 'slate' | 'neutral'> = {
  NEW: 'blue',
  PENDING: 'amber',
  ACCEPTED: 'green',
  REJECTED: 'rose',
  COMPLETED: 'green',
  CANCELLED: 'slate',
}

const label: Record<ConsultationStatus, string> = {
  NEW: 'New',
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
}

export function ConsultationStatusBadge({ status }: { status: ConsultationStatus }) {
  return (
    <Badge tone={consultationTone[status]} dot>
      {label[status]}
    </Badge>
  )
}

const aiTone: Record<AIStatus, 'slate' | 'blue' | 'green' | 'rose'> = {
  PENDING: 'slate',
  PROCESSING: 'blue',
  SUCCESS: 'green',
  FAILED: 'rose',
}

const aiLabel: Record<AIStatus, string> = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SUCCESS: 'Success',
  FAILED: 'Failed',
}

export function AIStatusBadge({ status }: { status: AIStatus }) {
  return (
    <Badge tone={aiTone[status]} dot>
      {aiLabel[status]}
    </Badge>
  )
}

const entityTone: Record<EntityStatus, 'green' | 'slate' | 'amber' | 'rose'> = {
  ACTIVE: 'green',
  INACTIVE: 'slate',
  PENDING: 'amber',
  SUSPENDED: 'rose',
}

const entityLabel: Record<EntityStatus, string> = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  PENDING: 'Pending',
  SUSPENDED: 'Suspended',
}

export function EntityStatusBadge({ status }: { status: EntityStatus }) {
  return (
    <Badge tone={entityTone[status]} dot>
      {entityLabel[status]}
    </Badge>
  )
}

export function RoleBadge({ role }: { role: AdminRole }) {
  return (
    <Badge tone={role === 'SUPER_ADMIN' ? 'teal' : 'blue'}>
      {role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
    </Badge>
  )
}

const docTone = {
  PROCESSED: 'green',
  PROCESSING: 'blue',
  FAILED: 'rose',
  QUEUED: 'slate',
} as const

export function DocStatusBadge({ status }: { status: keyof typeof docTone }) {
  const lbl = status.charAt(0) + status.slice(1).toLowerCase()
  return (
    <Badge tone={docTone[status]} dot>
      {lbl}
    </Badge>
  )
}

export function ResultBadge({ result }: { result: 'SUCCESS' | 'FAILURE' }) {
  return (
    <Badge tone={result === 'SUCCESS' ? 'green' : 'rose'} dot>
      {result === 'SUCCESS' ? 'Success' : 'Failure'}
    </Badge>
  )
}

export function ResolutionBadge({ resolution }: { resolution: string }) {
  const tone =
    resolution === 'RESOLVED'
      ? 'green'
      : resolution === 'RETRYING'
      ? 'blue'
      : resolution === 'ESCALATED'
      ? 'amber'
      : 'slate'
  const lbl = resolution.charAt(0) + resolution.slice(1).toLowerCase()
  return <Badge tone={tone as 'green'}>{lbl}</Badge>
}
