import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, BadgeCheck, Calendar, Stethoscope, Layers, ClipboardList } from 'lucide-react'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/PageHeader'
import { EntityStatusBadge, ConsultationStatusBadge } from '@/components/ui/StatusBadges'
import { Avatar } from '@/components/ui/Avatar'
import { TableWrap, THead, TH, TBody, TR, TD } from '@/components/ui/Table'
import { EmptyState } from '@/components/ui/States'
import { Badge } from '@/components/ui/Badge'
import { hospitals, doctors, consultations, departments } from '@/data/mockData'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'departments', label: 'Departments' },
  { id: 'doctors', label: 'Doctors' },
  { id: 'consultations', label: 'Consultations' },
  { id: 'activity', label: 'Activity' },
]

export function HospitalDetails() {
  const { id } = useParams()
  const [tab, setTab] = useState('overview')
  const hospital = hospitals.find((h) => h.id === id) ?? hospitals[0]

  const myDoctors = doctors.filter((d) => d.hospital === hospital.name)
  const myConsultations = consultations.filter((c) => c.hospitalId === hospital.id)

  return (
    <div>
      <Link to="/hospitals" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary-600">
        <ArrowLeft className="h-4 w-4" /> Back to Hospitals
      </Link>

      <Card className="mb-5">
        <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar name={hospital.name} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl font-semibold text-slate-900">{hospital.name}</h1>
              {hospital.verified && <Badge tone="blue"><BadgeCheck className="h-3.5 w-3.5" /> Verified</Badge>}
              <EntityStatusBadge status={hospital.status} />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-slate-400" />{hospital.location}</span>
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 text-slate-400" />Partner since {hospital.since}</span>
              <span className="text-slate-400">ID: {hospital.id}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => alert('Edit is disabled in the UI prototype.')}>Edit</Button>
            <Button variant="danger" onClick={() => alert('Deactivate requires confirmation — disabled in prototype.')}>Deactivate</Button>
          </div>
        </CardBody>
      </Card>

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: 'Doctors', value: hospital.doctors, icon: Stethoscope, tone: 'bg-primary-50 text-primary-600' },
          { label: 'Departments', value: hospital.departments, icon: Layers, tone: 'bg-accent-50 text-accent-600' },
          { label: 'Consultations', value: hospital.consultations, icon: ClipboardList, tone: 'bg-indigo-50 text-indigo-600' },
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
          <Tabs tabs={tabs.map((t) => ({ ...t, count: t.id === 'doctors' ? myDoctors.length : t.id === 'consultations' ? myConsultations.length : undefined }))} active={tab} onChange={setTab} />
        </div>

        {tab === 'overview' && (
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-800">Hospital information</h3>
              <dl className="space-y-2.5 text-sm">
                {[
                  ['Name', hospital.name],
                  ['Location', hospital.location],
                  ['Status', hospital.status],
                  ['Verified', hospital.verified ? 'Yes' : 'Pending review'],
                  ['Partner since', hospital.since],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="text-slate-500">{k}</dt>
                    <dd className="font-medium text-slate-700">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-800">Capacity snapshot</h3>
              <div className="space-y-3">
                {[
                  ['Active doctors', hospital.doctors, 45],
                  ['Departments', hospital.departments, 16],
                  ['Monthly consultations', Math.round(hospital.consultations / 12), 90],
                ].map(([label, val, max]) => (
                  <div key={label as string}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-slate-500">{label}</span>
                      <span className="font-medium text-slate-700 tnum">{val}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-primary-500" style={{ width: `${Math.min(100, ((val as number) / (max as number)) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        )}

        {tab === 'departments' && (
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {departments.slice(0, hospital.departments).map((d) => (
                <span key={d} className="rounded-lg border border-slate-200 bg-surface-50 px-3 py-2 text-sm font-medium text-slate-700">{d}</span>
              ))}
            </div>
          </CardBody>
        )}

        {tab === 'doctors' && (
          myDoctors.length === 0 ? (
            <EmptyState title="No doctors" message="No doctors are assigned to this hospital in the prototype dataset." />
          ) : (
            <TableWrap>
              <THead><TR><TH>Doctor</TH><TH>Specialization</TH><TH>Department</TH><TH align="center">Consultations</TH><TH>Status</TH></TR></THead>
              <TBody>
                {myDoctors.map((d) => (
                  <TR key={d.id}>
                    <TD>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={d.name} size="sm" />
                        <div className="leading-tight"><p className="font-medium text-slate-800">{d.name}</p><p className="text-xs text-slate-400">{d.id}</p></div>
                      </div>
                    </TD>
                    <TD className="text-slate-600">{d.specialization}</TD>
                    <TD className="text-slate-600">{d.department}</TD>
                    <TD align="center" className="tnum text-slate-600">{d.consultations}</TD>
                    <TD><EntityStatusBadge status={d.status} /></TD>
                  </TR>
                ))}
              </TBody>
            </TableWrap>
          )
        )}

        {tab === 'consultations' && (
          myConsultations.length === 0 ? (
            <EmptyState title="No consultations" message="This hospital has no consultations in the prototype dataset." />
          ) : (
            <TableWrap>
              <THead><TR><TH>Case ID</TH><TH>Patient</TH><TH>Department</TH><TH>Submitted</TH><TH>Status</TH><TH align="right">Action</TH></TR></THead>
              <TBody>
                {myConsultations.map((c) => (
                  <TR key={c.id}>
                    <TD className="font-medium text-slate-700">{c.caseId}</TD>
                    <TD className="text-slate-600">{c.patient}</TD>
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

        {tab === 'activity' && (
          <CardBody>
            <ul className="space-y-3">
              {[
                ['Hospital profile verified', hospital.since],
                ['New doctor added', '3 days ago'],
                ['Consultation accepted', 'Today'],
                ['Department capacity updated', 'Yesterday'],
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
