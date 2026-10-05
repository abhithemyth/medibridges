import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { Dashboard } from '@/pages/Dashboard'
import { Patients } from '@/pages/Patients'
import { PatientDetails } from '@/pages/PatientDetails'
import { Hospitals } from '@/pages/Hospitals'
import { HospitalDetails } from '@/pages/HospitalDetails'
import { Doctors } from '@/pages/Doctors'
import { Consultations } from '@/pages/Consultations'
import { ConsultationDetails } from '@/pages/ConsultationDetails'
import { Documents } from '@/pages/Documents'
import { AIMonitoring } from '@/pages/AIMonitoring'
import { AIErrorLogs } from '@/pages/AIErrorLogs'
import { Notifications } from '@/pages/Notifications'
import { AuditLogs } from '@/pages/AuditLogs'
import { AdminUsers } from '@/pages/AdminUsers'
import { Settings } from '@/pages/Settings'
import { NotFound } from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/hospitals/:id" element={<HospitalDetails />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/consultations" element={<Consultations />} />
        <Route path="/consultations/:id" element={<ConsultationDetails />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/ai-monitoring" element={<AIMonitoring />} />
        <Route path="/ai-errors" element={<AIErrorLogs />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/audit-logs" element={<AuditLogs />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  )
}
