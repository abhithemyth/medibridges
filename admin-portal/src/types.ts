export type ConsultationStatus =
  | 'NEW'
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'COMPLETED'
  | 'CANCELLED'

export type AIStatus = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED'

export type EntityStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'SUSPENDED'

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN'

export type AIErrorCode =
  | 'AI_RATE_LIMITED'
  | 'AI_UNAVAILABLE'
  | 'AI_TIMEOUT'
  | 'AI_INVALID_RESPONSE'
  | 'AI_AUTH_ERROR'
  | 'AI_NOT_CONFIGURED'
  | 'DOCUMENT_PROCESSING_FAILED'

export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  consultations: number
  status: EntityStatus
  registered: string
  city: string
}

export interface Hospital {
  id: string
  name: string
  location: string
  doctors: number
  departments: number
  consultations: number
  status: EntityStatus
  verified: boolean
  since: string
}

export interface Doctor {
  id: string
  name: string
  specialization: string
  hospital: string
  department: string
  consultations: number
  status: EntityStatus
  experience: number
}

export interface Consultation {
  id: string
  caseId: string
  patient: string
  patientId: string
  hospital: string
  hospitalId: string
  department: string
  doctor?: string
  submitted: string
  status: ConsultationStatus
  aiStatus: AIStatus
  description: string
  hospitalResponse?: string
}

export interface DocumentRecord {
  id: string
  name: string
  patient: string
  consultation: string
  type: string
  uploaded: string
  processingStatus: 'PROCESSED' | 'PROCESSING' | 'FAILED' | 'QUEUED'
  aiStatus: AIStatus
  sizeKb: number
  sensitive: boolean
}

export interface AIAnalysis {
  id: string
  analysisId: string
  patient: string
  consultation: string
  model: string
  status: AIStatus
  duration: string
  created: string
  attempts: number
}

export interface AIErrorLog {
  id: string
  analysisId: string
  attempt: number
  model: string
  provider: string
  httpStatus: number
  errorCode: AIErrorCode
  timestamp: string
  resolution: 'RESOLVED' | 'RETRYING' | 'ESCALATED' | 'IGNORED'
}

export type NotificationType =
  | 'CONSULTATION'
  | 'AI'
  | 'REGISTRATION'
  | 'SYSTEM'
  | 'SECURITY'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  entity: string
  time: string
  read: boolean
}

export interface AuditLog {
  id: string
  admin: string
  action: string
  target: string
  timestamp: string
  result: 'SUCCESS' | 'FAILURE'
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: AdminRole
  status: EntityStatus
  lastLogin: string
  created: string
}

export interface ActivityItem {
  id: string
  icon: 'patient' | 'hospital' | 'doctor' | 'consultation' | 'ai'
  activity: string
  entity: string
  time: string
}
