import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, MapPin, Calendar, ClipboardList, FileText, Sparkles, ShieldAlert } from 'lucide-react'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/PageHeader'
import { EntityStatusBadge, ConsultationStatusBadge, AIStatusBadge, DocStatusBadge } from '@/components/ui/StatusBadges'
import { Avatar } from '@/components/ui/Avatar'
import { TableWrap, THead, TH, TBody, TR, TD } from '@/components/ui/Table'
import { EmptyState } from '@/components/ui/States'
import { patients, consultations, documents, aiAnalyses } from '@/data/mockData'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'consultations', label: 'Consultations' },
  { id: 'documents', label: 'Documents' },
  { id: 'ai', label: 'AI Analysis' },
  { id: 'activity', label: 'Activity' },
]

export function PatientDetails() {
  const { id } = useParams()
  const [tab, setTab] = useState('overview')
  const patient = patients.find((p) => p.id === id) ?? patients[0]

  const myConsultations = consultations.filter((c) => c.patientId === patient.id)
  const myDocs = documents.filter((d) => d.patient === patient.name)
  const myAI = aiAnalyses.filter((a) => a.patient === patient.name)

  const counts = {
    consultations: myConsultations.length || patient.consultations,
    documents: myDocs.length,
    ai: myAI.length,
  }

  return (
    <div>
      <Link to="/patients" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary-600">
        <ArrowLeft className="h-4 w-4" /> Back to Patients
      </Link>

      {/* Profile header */}
      <Card className="mb-5">
        <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar name={patient.name} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl font-semibold text-slate-900">{patient.name}</h1>
              <EntityStatusBadge status={patient.status} />
            </div>
            <p className="mt-0.5 text-sm text-slate-500">Patient ID: <span className="font-medium text-slate-600">{patient.id}</span></p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5"><Mail className="h-4 w-4 text-slate-400" />{patient.email}</span>
              <span className="inline-flex items-center gap-1.5"><Phone className="h-4 w-4 text-slate-400" />{patient.phone}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-slate-400" />{patient.city}</span>
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 text-slate-400" />Registered {patient.registered}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => alert('Edit is disabled in the UI prototype.')}>Edit</Button>
          </div>
        </CardBody>
      </Card>

      {/* Stat cards */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: 'Consultations', value: counts.consultations, icon: ClipboardList, tone: 'bg-primary-50 text-primary-600' },
          { label: 'Documents', value: counts.documents, icon: FileText, tone: 'bg-accent-50 text-accent-600' },
          { label: 'AI Analyses', value: counts.ai, icon: Sparkles, tone: 'bg-violet-50 text-violet-600' },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.tone}`}><s.icon className="h-5 w-5" /></span>
              <div>
                <p className="text-2xl font-semibold text-slate-900 tnum">{s.value}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="px-4 pt-2">
          <Tabs tabs={tabs.map((t) => ({ ...t, count: t.id === 'consultations' ? counts.consultations : t.id === 'documents' ? counts.documents : t.id === 'ai' ? counts.ai : undefined }))} active={tab} onChange={setTab} />
        </div>

        {tab === 'overview' && (
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-800">Demographics</h3>
              <dl className="space-y-2.5 text-sm">
                {[
                  ['Age', `${patient.age} years`],
                  ['Gender', patient.gender],
                  ['City', patient.city],
                  ['Account status', patient.status],
                  ['Member since', patient.registered],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="text-slate-500">{k}</dt>
                    <dd className="font-medium text-slate-700">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                <ShieldAlert className="h-4 w-4 text-amber-500" /> Privacy notice
              </h3>
              <div className="rounded-lg border border-amber-100 bg-amber-50/60 p-3.5 text-sm text-amber-800">
                Sensitive medical details are intentionally hidden in the admin view. Clinical content is only accessible to the assigned care team, in line with platform privacy policy.
              </div>
            </div>
          </CardBody>
        )}

        {tab === 'consultations' && (
          myConsultations.length === 0 ? (
            <EmptyState title="No consultations" message="This patient has no consultations on record in the prototype dataset." />
          ) : (
            <TableWrap>
              <THead><TR><TH>Case ID</TH><TH>Hospital</TH><TH>Department</TH><TH>Submitted</TH><TH>Status</TH><TH align="right">Action</TH></TR></THead>
              <TBody>
                {myConsultations.map((c) => (
                  <TR key={c.id}>
                    <TD className="font-medium text-slate-700">{c.caseId}</TD>
                    <TD className="text-slate-600">{c.hospital}</TD>
                    <TD className="text-slate-600">{c.department}</TD>
                    <TD className="whitespace-nowrap text-slate-500">{c.submitted}</TD>
                    <TD><ConsultationStatusBadge status={c.status} /></TD>
                    <TD align="right"><Link to={`/consultations/${c.id}`} className="text-sm font-medium text-primary-600 hover:underline">View</Link></TD>
                  </TR>
                ))}
              </TBody>
            </TableWrap>
          )
        )}

        {tab === 'documents' && (
          myDocs.length === 0 ? (
            <EmptyState title="No documents" message="No documents have been uploaded for this patient in the prototype dataset." />
          ) : (
            <TableWrap>
              <THead><TR><TH>Document</TH><TH>Type</TH><TH>Consultation</TH><TH>Uploaded</TH><TH>Processing</TH></TR></THead>
              <TBody>
                {myDocs.map((d) => (
                  <TR key={d.id}>
                    <TD className="font-medium text-slate-700">{d.name}</TD>
                    <TD className="text-slate-600">{d.type}</TD>
                    <TD className="text-slate-500">{d.consultation}</TD>
                    <TD className="whitespace-nowrap text-slate-500">{d.uploaded}</TD>
                    <TD><DocStatusBadge status={d.processingStatus} /></TD>
                  </TR>
                ))}
              </TBody>
            </TableWrap>
          )
        )}

        {tab === 'ai' && (
          myAI.length === 0 ? (
            <EmptyState title="No AI analyses" message="No AI analyses have been run for this patient in the prototype dataset." />
          ) : (
            <TableWrap>
              <THead><TR><TH>Analysis ID</TH><TH>Consultation</TH><TH>Model</TH><TH>Duration</TH><TH>Status</TH></TR></THead>
              <TBody>
                {myAI.map((a) => (
                  <TR key={a.id}>
                    <TD className="font-medium text-slate-700">{a.analysisId}</TD>
                    <TD className="text-slate-500">{a.consultation}</TD>
                    <TD className="text-slate-600">{a.model}</TD>
                    <TD className="text-slate-500 tnum">{a.duration}</TD>
                    <TD><AIStatusBadge status={a.status} /></TD>
                  </TR>
                ))}
              </TBody>
            </TableWrap>
          )
        )}

        {tab === 'activity' && (
          <CardBody>
            <ul className="space-y-3">
              {[
                ['Account created', patient.registered],
                ['Profile information updated', '2 weeks ago'],
                ['Consultation submitted', 'Today'],
                ['Document uploaded', 'Today'],
              ].map(([label, time], i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="h-2 w-2 rounded-full bg-primary-400" />
                  <span className="flex-1 text-slate-700">{label}</span>
                  <span className="text-slate-400 tnum">{time}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        )}
      </Card>
    </div>
  )
}
