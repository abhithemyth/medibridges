import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, User, Building2, Stethoscope, Calendar, FileText, MessageSquare, CheckCircle2, Send, ClipboardList, Sparkles } from 'lucide-react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { ConsultationStatusBadge, AIStatusBadge, DocStatusBadge } from '@/components/ui/StatusBadges'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { consultations, documents } from '@/data/mockData'

const timeline = [
  { icon: Send, label: 'Consultation submitted', detail: 'Patient submitted the case with 2 documents', time: 'Today, 09:24', tone: 'bg-primary-50 text-primary-600', done: true },
  { icon: Building2, label: 'Hospital received case', detail: 'MedCare Hospital intake queue', time: 'Today, 09:25', tone: 'bg-indigo-50 text-indigo-600', done: true },
  { icon: Sparkles, label: 'AI analysis completed', detail: 'MedVision-2 returned preliminary findings', time: 'Today, 09:26', tone: 'bg-violet-50 text-violet-600', done: true },
  { icon: Stethoscope, label: 'Doctor assigned', detail: 'Dr. Alan Reeves (Cardiology)', time: 'Today, 09:40', tone: 'bg-accent-50 text-accent-600', done: true },
  { icon: MessageSquare, label: 'Hospital responded', detail: 'Scheduling stress echocardiogram', time: 'Today, 10:02', tone: 'bg-sky-50 text-sky-600', done: true },
  { icon: CheckCircle2, label: 'Awaiting completion', detail: 'Case pending final consultation outcome', time: 'Pending', tone: 'bg-slate-100 text-slate-400', done: false },
]

export function ConsultationDetails() {
  const { id } = useParams()
  const c = consultations.find((x) => x.id === id) ?? consultations[0]
  const docs = documents.filter((d) => d.consultation === c.caseId)

  return (
    <div>
      <Link to="/consultations" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary-600">
        <ArrowLeft className="h-4 w-4" /> Back to Consultations
      </Link>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-semibold text-slate-900">Case {c.caseId}</h1>
            <ConsultationStatusBadge status={c.status} />
          </div>
          <p className="mt-1 text-sm text-slate-500">{c.department} consultation · submitted {c.submitted}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => alert('Reassign is disabled in the UI prototype.')}>Reassign</Button>
          <Button variant="primary" onClick={() => alert('Actions are disabled in the UI prototype.')}>Update status</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <CardHeader title="Patient Information" />
            <CardBody className="flex items-center gap-4">
              <Avatar name={c.patient} size="lg" />
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">{c.patient}</p>
                <p className="text-sm text-slate-500">Patient ID: {c.patientId}</p>
                <Link to={`/patients/${c.patientId}`} className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:underline">
                  <User className="h-3.5 w-3.5" /> View patient profile
                </Link>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Case Description" subtitle="Reason for consultation as submitted by the patient" />
            <CardBody>
              <p className="text-sm leading-relaxed text-slate-600">{c.description}</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Documents" subtitle={`${docs.length} file(s) attached to this case`} />
            {docs.length === 0 ? (
              <CardBody><p className="text-sm text-slate-500">No documents attached.</p></CardBody>
            ) : (
              <CardBody className="space-y-2">
                {docs.map((d) => (
                  <div key={d.id} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-surface-50 px-3 py-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-500 ring-1 ring-slate-200"><FileText className="h-4 w-4" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-800">{d.name}</p>
                      <p className="text-xs text-slate-500">{d.type} · {(d.sizeKb / 1024).toFixed(1)} MB</p>
                    </div>
                    <DocStatusBadge status={d.processingStatus} />
                  </div>
                ))}
              </CardBody>
            )}
          </Card>

          {c.hospitalResponse && (
            <Card>
              <CardHeader title="Hospital Response" />
              <CardBody>
                <div className="rounded-lg border-l-2 border-primary-400 bg-primary-50/40 px-4 py-3 text-sm text-slate-700">
                  {c.hospitalResponse}
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        {/* Right rail */}
        <div className="space-y-5">
          <Card>
            <CardHeader title="Case Summary" />
            <CardBody className="space-y-3.5">
              <SummaryRow icon={<ConsultationStatusBadge status={c.status} />} label="Status" />
              <SummaryRow icon={<Building2 className="h-4 w-4 text-slate-400" />} label="Hospital" value={c.hospital} link={`/hospitals/${c.hospitalId}`} />
              <SummaryRow icon={<Stethoscope className="h-4 w-4 text-slate-400" />} label="Doctor" value={c.doctor ?? 'Unassigned'} />
              <SummaryRow icon={<ClipboardList className="h-4 w-4 text-slate-400" />} label="Department" value={c.department} />
              <SummaryRow icon={<Calendar className="h-4 w-4 text-slate-400" />} label="Submitted" value={c.submitted} />
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-sm text-slate-500">AI analysis</span>
                <AIStatusBadge status={c.aiStatus} />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Activity Timeline" />
            <CardBody className="py-4">
              <ol className="relative space-y-5">
                <span className="absolute left-[15px] top-2 bottom-2 w-px bg-slate-200" aria-hidden />
                {timeline.map((t, i) => {
                  const Icon = t.icon
                  return (
                    <li key={i} className="relative flex gap-3">
                      <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-white ${t.tone}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <p className={`text-sm font-medium ${t.done ? 'text-slate-800' : 'text-slate-400'}`}>{t.label}</p>
                        <p className="text-xs text-slate-500">{t.detail}</p>
                        <p className="mt-0.5 text-xs text-slate-400 tnum">{t.time}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ icon, label, value, link }: { icon: React.ReactNode; label: string; value?: string; link?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-sm text-slate-500">{icon}{label}</span>
      {value ? (
        link ? (
          <Link to={link} className="text-right text-sm font-medium text-primary-600 hover:underline">{value}</Link>
        ) : (
          <span className="text-right text-sm font-medium text-slate-700">{value}</span>
        )
      ) : null}
    </div>
  )
}
