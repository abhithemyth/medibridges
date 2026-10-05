import type {
  Patient,
  Hospital,
  Doctor,
  Consultation,
  DocumentRecord,
  AIAnalysis,
  AIErrorLog,
  Notification,
  AuditLog,
  AdminUser,
  ActivityItem,
  ConsultationStatus,
  AIStatus,
} from '@/types'

export const kpis = {
  totalPatients: 1250,
  totalHospitals: 24,
  totalDoctors: 186,
  totalConsultations: 3420,
  patientsTrend: '+8.2%',
  hospitalsTrend: '+2',
  doctorsTrend: '+11',
  consultationsTrend: '+14.6%',
}

export const consultationOverview = {
  New: 142,
  Pending: 318,
  Accepted: 507,
  Rejected: 96,
  Completed: 2357,
}

export const consultationTrend = [
  { day: 'Mon', New: 24, Accepted: 38, Completed: 51 },
  { day: 'Tue', New: 31, Accepted: 42, Completed: 47 },
  { day: 'Wed', New: 18, Accepted: 35, Completed: 60 },
  { day: 'Thu', New: 27, Accepted: 48, Completed: 55 },
  { day: 'Fri', New: 22, Accepted: 31, Completed: 44 },
  { day: 'Sat', New: 12, Accepted: 19, Completed: 28 },
  { day: 'Sun', New: 8, Accepted: 14, Completed: 22 },
]

export const aiMonitoring = {
  successful: 2840,
  processing: 8,
  failed: 120,
  avgTime: '4.2s',
}

export const aiTrend = [
  { hour: '06h', success: 180, failed: 6 },
  { hour: '09h', success: 320, failed: 14 },
  { hour: '12h', success: 410, failed: 22 },
  { hour: '15h', success: 380, failed: 18 },
  { hour: '18h', success: 260, failed: 9 },
  { hour: '21h', success: 140, failed: 5 },
]

export const patients: Patient[] = [
  { id: 'P-1001', name: 'John Smith', email: 'john.smith@email.com', phone: '+1 202 555 0141', age: 54, gender: 'Male', consultations: 6, status: 'ACTIVE', registered: '2026-01-14', city: 'Boston' },
  { id: 'P-1002', name: 'Sarah Wilson', email: 'sarah.wilson@email.com', phone: '+1 202 555 0182', age: 37, gender: 'Female', consultations: 4, status: 'ACTIVE', registered: '2026-02-02', city: 'Chicago' },
  { id: 'P-1003', name: 'Michael Brown', email: 'michael.brown@email.com', phone: '+1 202 555 0119', age: 61, gender: 'Male', consultations: 9, status: 'ACTIVE', registered: '2025-11-23', city: 'Houston' },
  { id: 'P-1004', name: 'Emily Davis', email: 'emily.davis@email.com', phone: '+1 202 555 0173', age: 29, gender: 'Female', consultations: 2, status: 'ACTIVE', registered: '2026-03-08', city: 'Seattle' },
  { id: 'P-1005', name: 'David Martinez', email: 'david.martinez@email.com', phone: '+1 202 555 0155', age: 45, gender: 'Male', consultations: 5, status: 'INACTIVE', registered: '2025-09-17', city: 'Phoenix' },
  { id: 'P-1006', name: 'Jennifer Garcia', email: 'jennifer.garcia@email.com', phone: '+1 202 555 0198', age: 33, gender: 'Female', consultations: 3, status: 'ACTIVE', registered: '2026-01-30', city: 'Denver' },
  { id: 'P-1007', name: 'Robert Anderson', email: 'robert.anderson@email.com', phone: '+1 202 555 0126', age: 68, gender: 'Male', consultations: 11, status: 'ACTIVE', registered: '2025-08-05', city: 'Miami' },
  { id: 'P-1008', name: 'Linda Thomas', email: 'linda.thomas@email.com', phone: '+1 202 555 0164', age: 51, gender: 'Female', consultations: 7, status: 'SUSPENDED', registered: '2025-12-11', city: 'Atlanta' },
  { id: 'P-1009', name: 'James Jackson', email: 'james.jackson@email.com', phone: '+1 202 555 0137', age: 42, gender: 'Male', consultations: 4, status: 'ACTIVE', registered: '2026-02-19', city: 'Dallas' },
  { id: 'P-1010', name: 'Patricia White', email: 'patricia.white@email.com', phone: '+1 202 555 0110', age: 39, gender: 'Female', consultations: 2, status: 'ACTIVE', registered: '2026-03-25', city: 'Portland' },
  { id: 'P-1011', name: 'William Harris', email: 'william.harris@email.com', phone: '+1 202 555 0143', age: 57, gender: 'Male', consultations: 8, status: 'ACTIVE', registered: '2025-10-02', city: 'Detroit' },
  { id: 'P-1012', name: 'Elizabeth Martin', email: 'elizabeth.martin@email.com', phone: '+1 202 555 0188', age: 35, gender: 'Female', consultations: 3, status: 'PENDING', registered: '2026-04-01', city: 'Austin' },
]

export const hospitals: Hospital[] = [
  { id: 'H-201', name: 'MedCare Hospital', location: 'Boston, MA', doctors: 34, departments: 12, consultations: 812, status: 'ACTIVE', verified: true, since: '2024-06-10' },
  { id: 'H-202', name: 'City Medical Center', location: 'Chicago, IL', doctors: 28, departments: 10, consultations: 640, status: 'ACTIVE', verified: true, since: '2024-08-22' },
  { id: "H-203", name: "St. Mary's Hospital", location: 'Houston, TX', doctors: 41, departments: 15, consultations: 934, status: 'ACTIVE', verified: true, since: '2024-03-15' },
  { id: 'H-204', name: 'Riverside Health', location: 'Seattle, WA', doctors: 19, departments: 8, consultations: 388, status: 'ACTIVE', verified: false, since: '2025-01-09' },
  { id: 'H-205', name: 'Lakeview Medical', location: 'Denver, CO', doctors: 22, departments: 9, consultations: 402, status: 'PENDING', verified: false, since: '2026-02-14' },
  { id: 'H-206', name: 'Sunrise Clinic Network', location: 'Phoenix, AZ', doctors: 15, departments: 6, consultations: 231, status: 'INACTIVE', verified: true, since: '2024-11-30' },
  { id: 'H-207', name: 'Bayfront Medical', location: 'Miami, FL', doctors: 27, departments: 11, consultations: 573, status: 'ACTIVE', verified: true, since: '2024-09-18' },
]

export const doctors: Doctor[] = [
  { id: 'D-301', name: 'Dr. Alan Reeves', specialization: 'Interventional Cardiologist', hospital: 'MedCare Hospital', department: 'Cardiology', consultations: 148, status: 'ACTIVE', experience: 14 },
  { id: 'D-302', name: 'Dr. Priya Nair', specialization: 'Neurologist', hospital: 'City Medical Center', department: 'Neurology', consultations: 132, status: 'ACTIVE', experience: 11 },
  { id: 'D-303', name: 'Dr. Marcus Lee', specialization: 'Orthopedic Surgeon', hospital: "St. Mary's Hospital", department: 'Orthopedics', consultations: 176, status: 'ACTIVE', experience: 18 },
  { id: 'D-304', name: 'Dr. Elena Rodriguez', specialization: 'Medical Oncologist', hospital: 'MedCare Hospital', department: 'Oncology', consultations: 121, status: 'ACTIVE', experience: 12 },
  { id: 'D-305', name: 'Dr. Samuel Osei', specialization: 'Radiologist', hospital: 'Riverside Health', department: 'Radiology', consultations: 88, status: 'INACTIVE', experience: 9 },
  { id: 'D-306', name: 'Dr. Hannah Kim', specialization: 'Pediatrician', hospital: 'Bayfront Medical', department: 'Pediatrics', consultations: 205, status: 'ACTIVE', experience: 16 },
  { id: 'D-307', name: 'Dr. Victor Alvarez', specialization: 'Cardiologist', hospital: 'Lakeview Medical', department: 'Cardiology', consultations: 64, status: 'PENDING', experience: 7 },
  { id: 'D-308', name: 'Dr. Grace Chen', specialization: 'Neurosurgeon', hospital: "St. Mary's Hospital", department: 'Neurology', consultations: 143, status: 'ACTIVE', experience: 20 },
]

export const consultations: Consultation[] = [
  { id: '1', caseId: 'C-9042', patient: 'John Smith', patientId: 'P-1001', hospital: 'MedCare Hospital', hospitalId: 'H-201', department: 'Cardiology', doctor: 'Dr. Alan Reeves', submitted: 'Today, 09:24', status: 'PENDING', aiStatus: 'SUCCESS', description: 'Recurring chest discomfort and shortness of breath during exertion. Prior ECG shows borderline ST changes. Requesting cardiology evaluation and possible stress test.', hospitalResponse: 'Case received. Scheduling stress echocardiogram; cardiology to review within 24h.' },
  { id: '2', caseId: 'C-9041', patient: 'Sarah Wilson', patientId: 'P-1002', hospital: 'City Medical Center', hospitalId: 'H-202', department: 'Neurology', doctor: 'Dr. Priya Nair', submitted: 'Today, 08:51', status: 'ACCEPTED', aiStatus: 'SUCCESS', description: 'Episodic migraines with visual aura, increasing frequency over six weeks. Neurological exam requested.', hospitalResponse: 'Accepted. Neurology consult booked; MRI brain scheduled.' },
  { id: '3', caseId: 'C-9040', patient: 'Michael Brown', patientId: 'P-1003', hospital: "St. Mary's Hospital", hospitalId: 'H-203', department: 'Orthopedics', doctor: 'Dr. Marcus Lee', submitted: 'Today, 08:15', status: 'NEW', aiStatus: 'PROCESSING', description: 'Chronic lower back pain radiating to left leg. MRI suggests L4-L5 disc involvement.' },
  { id: '4', caseId: 'C-9039', patient: 'Emily Davis', patientId: 'P-1004', hospital: 'Riverside Health', hospitalId: 'H-204', department: 'Oncology', submitted: 'Yesterday, 17:40', status: 'PENDING', aiStatus: 'FAILED', description: 'Follow-up on breast lump evaluation. Requesting oncology opinion on biopsy results.' },
  { id: '5', caseId: 'C-9038', patient: 'Robert Anderson', patientId: 'P-1007', hospital: 'Bayfront Medical', hospitalId: 'H-207', department: 'Cardiology', doctor: 'Dr. Alan Reeves', submitted: 'Yesterday, 15:02', status: 'COMPLETED', aiStatus: 'SUCCESS', description: 'Post-operative review after angioplasty. Recovery progressing well.', hospitalResponse: 'Consultation complete. Patient advised on cardiac rehab and follow-up in 3 months.' },
  { id: '6', caseId: 'C-9037', patient: 'Jennifer Garcia', patientId: 'P-1006', hospital: 'MedCare Hospital', hospitalId: 'H-201', department: 'Neurology', doctor: 'Dr. Grace Chen', submitted: 'Yesterday, 13:18', status: 'ACCEPTED', aiStatus: 'SUCCESS', description: 'Persistent numbness in hands, possible neuropathy. Requesting neurological workup.' },
  { id: '7', caseId: 'C-9036', patient: 'William Harris', patientId: 'P-1011', hospital: 'City Medical Center', hospitalId: 'H-202', department: 'Oncology', submitted: '2 days ago', status: 'REJECTED', aiStatus: 'SUCCESS', description: 'Second opinion request on prostate cancer staging.', hospitalResponse: 'Rejected: case requires subspecialty not available; referred to partner network.' },
  { id: '8', caseId: 'C-9035', patient: 'Linda Thomas', patientId: 'P-1008', hospital: "St. Mary's Hospital", hospitalId: 'H-203', department: 'Pediatrics', doctor: 'Dr. Hannah Kim', submitted: '2 days ago', status: 'CANCELLED', aiStatus: 'PENDING', description: 'Pediatric allergy consultation. Cancelled by patient.' },
  { id: '9', caseId: 'C-9034', patient: 'James Jackson', patientId: 'P-1009', hospital: 'Bayfront Medical', hospitalId: 'H-207', department: 'Orthopedics', submitted: '3 days ago', status: 'COMPLETED', aiStatus: 'SUCCESS', description: 'Knee pain evaluation post-injury. X-ray reviewed.' },
  { id: '10', caseId: 'C-9033', patient: 'Patricia White', patientId: 'P-1010', hospital: 'Lakeview Medical', hospitalId: 'H-205', department: 'Cardiology', submitted: '3 days ago', status: 'NEW', aiStatus: 'PROCESSING', description: 'Routine cardiology screening with elevated blood pressure readings.' },
]

export const documents: DocumentRecord[] = [
  { id: 'DOC-501', name: 'chest_xray_2026.pdf', patient: 'John Smith', consultation: 'C-9042', type: 'Radiology', uploaded: 'Today, 09:20', processingStatus: 'PROCESSED', aiStatus: 'SUCCESS', sizeKb: 2480, sensitive: true },
  { id: 'DOC-502', name: 'ecg_report.pdf', patient: 'John Smith', consultation: 'C-9042', type: 'Report', uploaded: 'Today, 09:21', processingStatus: 'PROCESSED', aiStatus: 'SUCCESS', sizeKb: 640, sensitive: true },
  { id: 'DOC-503', name: 'mri_brain_scan.dcm', patient: 'Sarah Wilson', consultation: 'C-9041', type: 'Radiology', uploaded: 'Today, 08:44', processingStatus: 'PROCESSING', aiStatus: 'PROCESSING', sizeKb: 18400, sensitive: true },
  { id: 'DOC-504', name: 'blood_panel_results.pdf', patient: 'Michael Brown', consultation: 'C-9040', type: 'Lab', uploaded: 'Today, 08:10', processingStatus: 'PROCESSED', aiStatus: 'SUCCESS', sizeKb: 320, sensitive: true },
  { id: 'DOC-505', name: 'biopsy_result.pdf', patient: 'Emily Davis', consultation: 'C-9039', type: 'Pathology', uploaded: 'Yesterday, 17:32', processingStatus: 'FAILED', aiStatus: 'FAILED', sizeKb: 1240, sensitive: true },
  { id: 'DOC-506', name: 'discharge_summary.pdf', patient: 'Robert Anderson', consultation: 'C-9038', type: 'Report', uploaded: 'Yesterday, 15:00', processingStatus: 'PROCESSED', aiStatus: 'SUCCESS', sizeKb: 480, sensitive: true },
  { id: 'DOC-507', name: 'nerve_conduction.pdf', patient: 'Jennifer Garcia', consultation: 'C-9037', type: 'Lab', uploaded: 'Yesterday, 13:10', processingStatus: 'QUEUED', aiStatus: 'PENDING', sizeKb: 760, sensitive: true },
  { id: 'DOC-508', name: 'insurance_note.pdf', patient: 'William Harris', consultation: 'C-9036', type: 'Administrative', uploaded: '2 days ago', processingStatus: 'PROCESSED', aiStatus: 'SUCCESS', sizeKb: 210, sensitive: false },
]

export const aiAnalyses: AIAnalysis[] = [
  { id: '1', analysisId: 'A-1030', patient: 'John Smith', consultation: 'C-9042', model: 'MedVision-2', status: 'SUCCESS', duration: '3.8s', created: 'Today, 09:26', attempts: 1 },
  { id: '2', analysisId: 'A-1029', patient: 'Sarah Wilson', consultation: 'C-9041', model: 'Nemotron', status: 'SUCCESS', duration: '5.1s', created: 'Today, 08:53', attempts: 2 },
  { id: '3', analysisId: 'A-1028', patient: 'Michael Brown', consultation: 'C-9040', model: 'MedVision-2', status: 'PROCESSING', duration: '—', created: 'Today, 08:16', attempts: 1 },
  { id: '4', analysisId: 'A-1027', patient: 'Emily Davis', consultation: 'C-9039', model: 'Nemotron', status: 'FAILED', duration: '12.0s', created: 'Yesterday, 17:41', attempts: 3 },
  { id: '5', analysisId: 'A-1026', patient: 'Robert Anderson', consultation: 'C-9038', model: 'MedVision-2', status: 'SUCCESS', duration: '4.4s', created: 'Yesterday, 15:04', attempts: 1 },
  { id: '6', analysisId: 'A-1025', patient: 'Jennifer Garcia', consultation: 'C-9037', model: 'Nemotron', status: 'SUCCESS', duration: '4.9s', created: 'Yesterday, 13:20', attempts: 2 },
  { id: '7', analysisId: 'A-1024', patient: 'William Harris', consultation: 'C-9036', model: 'MedVision-2', status: 'SUCCESS', duration: '3.6s', created: '2 days ago', attempts: 1 },
  { id: '8', analysisId: 'A-1023', patient: 'Patricia White', consultation: 'C-9033', model: 'Nemotron', status: 'PENDING', duration: '—', created: '3 days ago', attempts: 0 },
]

export const aiErrorLogs: AIErrorLog[] = [
  { id: '1', analysisId: 'A-1029', attempt: 1, model: 'Nemotron', provider: 'nemotron-api', httpStatus: 503, errorCode: 'AI_UNAVAILABLE', timestamp: 'Today, 08:52', resolution: 'RESOLVED' },
  { id: '2', analysisId: 'A-1027', attempt: 3, model: 'Nemotron', provider: 'nemotron-api', httpStatus: 429, errorCode: 'AI_RATE_LIMITED', timestamp: 'Yesterday, 17:41', resolution: 'ESCALATED' },
  { id: '3', analysisId: 'A-1027', attempt: 2, model: 'Nemotron', provider: 'nemotron-api', httpStatus: 504, errorCode: 'AI_TIMEOUT', timestamp: 'Yesterday, 17:40', resolution: 'RETRYING' },
  { id: '4', analysisId: 'A-1027', attempt: 1, model: 'Nemotron', provider: 'nemotron-api', httpStatus: 503, errorCode: 'AI_UNAVAILABLE', timestamp: 'Yesterday, 17:39', resolution: 'RETRYING' },
  { id: '5', analysisId: 'A-1025', attempt: 1, model: 'Nemotron', provider: 'nemotron-api', httpStatus: 503, errorCode: 'AI_UNAVAILABLE', timestamp: 'Yesterday, 13:19', resolution: 'RESOLVED' },
  { id: '6', analysisId: 'A-1021', attempt: 1, model: 'MedVision-2', provider: 'medvision-api', httpStatus: 422, errorCode: 'AI_INVALID_RESPONSE', timestamp: '2 days ago', resolution: 'RESOLVED' },
  { id: '7', analysisId: 'A-1019', attempt: 1, model: 'Nemotron', provider: 'nemotron-api', httpStatus: 401, errorCode: 'AI_AUTH_ERROR', timestamp: '2 days ago', resolution: 'ESCALATED' },
  { id: '8', analysisId: 'A-1015', attempt: 1, model: 'DocParse', provider: 'internal', httpStatus: 500, errorCode: 'DOCUMENT_PROCESSING_FAILED', timestamp: '3 days ago', resolution: 'IGNORED' },
]

export const notifications: Notification[] = [
  { id: '1', type: 'AI', title: 'AI analysis failed', message: 'Analysis A-1027 failed after 3 attempts (rate limited).', entity: 'A-1027 · Nemotron', time: '12 min ago', read: false },
  { id: '2', type: 'CONSULTATION', title: 'New consultation submitted', message: 'John Smith submitted a cardiology case to MedCare Hospital.', entity: 'C-9042', time: '34 min ago', read: false },
  { id: '3', type: 'REGISTRATION', title: 'New hospital registered', message: 'Lakeview Medical submitted a verification request.', entity: 'H-205', time: '1 hr ago', read: false },
  { id: '4', type: 'SECURITY', title: 'Admin login from new device', message: 'A SUPER_ADMIN signed in from a new location.', entity: 'admin@medbridges', time: '3 hrs ago', read: true },
  { id: '5', type: 'CONSULTATION', title: 'Consultation accepted', message: 'City Medical Center accepted a neurology case.', entity: 'C-9041', time: '5 hrs ago', read: true },
  { id: '6', type: 'SYSTEM', title: 'Document processing backlog', message: 'Processing queue exceeded 200 items briefly.', entity: 'system', time: '8 hrs ago', read: true },
  { id: '7', type: 'REGISTRATION', title: 'New patient registered', message: 'Elizabeth Martin created a patient account.', entity: 'P-1012', time: '1 day ago', read: true },
]

export const auditLogs: AuditLog[] = [
  { id: '1', admin: 'Aarav Mehta', action: 'HOSPITAL_APPROVED', target: "St. Mary's Hospital (H-203)", timestamp: 'Today, 10:12', result: 'SUCCESS' },
  { id: '2', admin: 'Sofia Laurent', action: 'DOCTOR_UPDATED', target: 'Dr. Priya Nair (D-302)', timestamp: 'Today, 09:48', result: 'SUCCESS' },
  { id: '3', admin: 'Aarav Mehta', action: 'CONSULTATION_VIEWED', target: 'C-9042', timestamp: 'Today, 09:30', result: 'SUCCESS' },
  { id: '4', admin: 'Daniel Okafor', action: 'ACCOUNT_DEACTIVATED', target: 'Linda Thomas (P-1008)', timestamp: 'Today, 08:55', result: 'SUCCESS' },
  { id: '5', admin: 'Sofia Laurent', action: 'AI_ERROR_ESCALATED', target: 'A-1027', timestamp: 'Yesterday, 17:45', result: 'SUCCESS' },
  { id: '6', admin: 'Daniel Okafor', action: 'ADMIN_CREATED', target: 'support@medbridges', timestamp: 'Yesterday, 14:20', result: 'SUCCESS' },
  { id: '7', admin: 'Aarav Mehta', action: 'HOSPITAL_DEACTIVATED', target: 'Sunrise Clinic Network (H-206)', timestamp: '2 days ago', result: 'FAILURE' },
  { id: '8', admin: 'Sofia Laurent', action: 'DOCUMENT_REMOVED', target: 'DOC-505', timestamp: '2 days ago', result: 'SUCCESS' },
]

export const adminUsers: AdminUser[] = [
  { id: '1', name: 'Aarav Mehta', email: 'aarav.mehta@medbridges.com', role: 'SUPER_ADMIN', status: 'ACTIVE', lastLogin: 'Today, 08:02', created: '2024-01-10' },
  { id: '2', name: 'Sofia Laurent', email: 'sofia.laurent@medbridges.com', role: 'ADMIN', status: 'ACTIVE', lastLogin: 'Today, 07:44', created: '2024-05-19' },
  { id: '3', name: 'Daniel Okafor', email: 'daniel.okafor@medbridges.com', role: 'ADMIN', status: 'ACTIVE', lastLogin: 'Yesterday, 18:30', created: '2025-02-11' },
  { id: '4', name: 'Mei Tanaka', email: 'mei.tanaka@medbridges.com', role: 'ADMIN', status: 'INACTIVE', lastLogin: '2 weeks ago', created: '2025-06-01' },
]

export const activity: ActivityItem[] = [
  { id: '1', icon: 'consultation', activity: 'Consultation submitted', entity: 'John Smith → MedCare Hospital', time: '9:24 AM' },
  { id: '2', icon: 'ai', activity: 'AI analysis completed', entity: 'A-1030 · MedVision-2', time: '9:26 AM' },
  { id: '3', icon: 'patient', activity: 'New patient registered', entity: 'Elizabeth Martin', time: '8:58 AM' },
  { id: '4', icon: 'hospital', activity: 'New hospital registered', entity: 'Lakeview Medical', time: '8:40 AM' },
  { id: '5', icon: 'doctor', activity: 'Doctor added', entity: 'Dr. Victor Alvarez · Cardiology', time: '8:12 AM' },
  { id: '6', icon: 'consultation', activity: 'Consultation accepted', entity: 'City Medical Center', time: '7:55 AM' },
  { id: '7', icon: 'ai', activity: 'AI analysis retried', entity: 'A-1029 · Nemotron', time: '7:30 AM' },
]

export const currentAdmin = {
  name: 'Aarav Mehta',
  role: 'Super Admin',
  email: 'aarav.mehta@medbridges.com',
  initials: 'AM',
}

export const statusColorMap: Record<ConsultationStatus, string> = {
  NEW: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  PENDING: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  ACCEPTED: 'bg-primary-50 text-primary-700 ring-primary-600/20',
  REJECTED: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  COMPLETED: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  CANCELLED: 'bg-slate-100 text-slate-600 ring-slate-500/20',
}

export const aiStatusColorMap: Record<AIStatus, string> = {
  PENDING: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  PROCESSING: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  SUCCESS: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  FAILED: 'bg-rose-50 text-rose-700 ring-rose-600/20',
}

export const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Pediatrics', 'Radiology']
