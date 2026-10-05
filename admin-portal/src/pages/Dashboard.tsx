import {
  Users,
  Building2,
  Stethoscope,
  ClipboardList,
  UserPlus,
  Building,
  Stethoscope as Steth,
  FilePlus2,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  Legend,
} from 'recharts'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { TableWrap, THead, TH, TBody, TR, TD } from '@/components/ui/Table'
import { ConsultationStatusBadge, ResolutionBadge } from '@/components/ui/StatusBadges'
import { Avatar } from '@/components/ui/Avatar'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'
import { LoadingRows } from '@/components/ui/States'
import {
  kpis,
  consultationOverview,
  aiMonitoring,
  aiTrend,
  consultations,
  activity,
  aiErrorLogs,
} from '@/data/mockData'
import { formatNumber } from '@/lib/utils'

const overviewData = Object.entries(consultationOverview).map(([name, value]) => ({ name, value }))
const overviewColors: Record<string, string> = {
  New: '#0ea5e9',
  Pending: '#f59e0b',
  Accepted: '#2563eb',
  Rejected: '#f43f5e',
  Completed: '#10b981',
}

const activityIcon = {
  patient: UserPlus,
  hospital: Building,
  doctor: Steth,
  consultation: FilePlus2,
  ai: Sparkles,
}

const activityTone = {
  patient: 'bg-sky-50 text-sky-600',
  hospital: 'bg-indigo-50 text-indigo-600',
  doctor: 'bg-accent-50 text-accent-600',
  consultation: 'bg-primary-50 text-primary-600',
  ai: 'bg-violet-50 text-violet-600',
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-md">
      <p className="mb-1 text-xs font-semibold text-slate-700">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-xs text-slate-500 tnum">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ background: p.color || p.fill }} />
          {p.name}: <span className="font-medium text-slate-700">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

export function Dashboard() {
  const loading = useSimulatedLoading(500)
  const recent = consultations.slice(0, 6)
  const recentErrors = aiErrorLogs.slice(0, 4)

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Good morning, Admin. Here's what's happening across MedBridges today."
        actions={
          <Link
            to="/consultations"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus-ring"
          >
            View consultations <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Patients" value={formatNumber(kpis.totalPatients)} icon={Users} trend={kpis.patientsTrend} trendDir="up" tone="blue" hint="vs last month" />
        <StatCard label="Total Hospitals" value={kpis.totalHospitals} icon={Building2} trend={kpis.hospitalsTrend} trendDir="up" tone="indigo" hint="2 pending verification" />
        <StatCard label="Total Doctors" value={kpis.totalDoctors} icon={Stethoscope} trend={kpis.doctorsTrend} trendDir="up" tone="teal" hint="across all departments" />
        <StatCard label="Total Consultations" value={formatNumber(kpis.totalConsultations)} icon={ClipboardList} trend={kpis.consultationsTrend} trendDir="up" tone="emerald" hint="vs last month" />
      </div>

      {/* Consultation overview + AI monitoring */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader
            title="Consultation Overview"
            subtitle="Distribution across all case statuses"
            action={<Link to="/consultations" className="text-xs font-medium text-primary-600 hover:text-primary-700">View all</Link>}
          />
          <CardBody>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={overviewData} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
                    <Bar dataKey="value" name="Cases" radius={[4, 4, 0, 0]}>
                      {overviewData.map((d) => (
                        <Cell key={d.name} fill={overviewColors[d.name]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col justify-center gap-2">
                {overviewData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-surface-50">
                    <span className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: overviewColors[d.name] }} />
                      {d.name}
                    </span>
                    <span className="text-sm font-semibold text-slate-800 tnum">{formatNumber(d.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="AI Monitoring"
            subtitle="Analysis throughput and health"
            action={<Link to="/ai-monitoring" className="text-xs font-medium text-primary-600 hover:text-primary-700">Details</Link>}
          />
          <CardBody>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Successful', value: formatNumber(aiMonitoring.successful), tone: 'text-emerald-600' },
                { label: 'Processing', value: aiMonitoring.processing, tone: 'text-sky-600' },
                { label: 'Failed', value: aiMonitoring.failed, tone: 'text-rose-600' },
                { label: 'Avg. Time', value: aiMonitoring.avgTime, tone: 'text-slate-800' },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-slate-100 bg-surface-50 px-3 py-2.5">
                  <p className={`text-xl font-semibold tnum ${s.tone}`}>{s.value}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={aiTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gSuccess" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gFailed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
                  <Area type="monotone" dataKey="success" name="Success" stroke="#10b981" strokeWidth={2} fill="url(#gSuccess)" />
                  <Area type="monotone" dataKey="failed" name="Failed" stroke="#f43f5e" strokeWidth={2} fill="url(#gFailed)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent consultations */}
      <Card className="mt-5">
        <CardHeader
          title="Recent Consultations"
          subtitle="Latest cases submitted across the platform"
          action={<Link to="/consultations" className="text-xs font-medium text-primary-600 hover:text-primary-700">View all</Link>}
        />
        {loading ? (
          <LoadingRows rows={6} cols={6} />
        ) : (
          <TableWrap>
            <THead>
              <TR>
                <TH>Patient</TH>
                <TH>Hospital</TH>
                <TH>Department</TH>
                <TH>Submitted</TH>
                <TH>Status</TH>
                <TH align="right">Action</TH>
              </TR>
            </THead>
            <TBody>
              {recent.map((c) => (
                <TR key={c.id}>
                  <TD>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={c.patient} size="sm" />
                      <div className="leading-tight">
                        <p className="font-medium text-slate-800">{c.patient}</p>
                        <p className="text-xs text-slate-400">{c.caseId}</p>
                      </div>
                    </div>
                  </TD>
                  <TD className="text-slate-600">{c.hospital}</TD>
                  <TD className="text-slate-600">{c.department}</TD>
                  <TD className="whitespace-nowrap text-slate-500">{c.submitted}</TD>
                  <TD><ConsultationStatusBadge status={c.status} /></TD>
                  <TD align="right">
                    <Link
                      to={`/consultations/${c.id}`}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      View
                    </Link>
                  </TD>
                </TR>
              ))}
            </TBody>
          </TableWrap>
        )}
      </Card>

      {/* Activity + recent AI errors */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-5">
        <Card className="xl:col-span-2">
          <CardHeader title="Recent Platform Activity" subtitle="Live feed of platform events" />
          <CardBody className="py-2">
            <ul className="divide-y divide-slate-100">
              {activity.map((a) => {
                const Icon = activityIcon[a.icon]
                return (
                  <li key={a.id} className="flex items-start gap-3 py-2.5">
                    <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${activityTone[a.icon]}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-800">{a.activity}</p>
                      <p className="truncate text-xs text-slate-500">{a.entity}</p>
                    </div>
                    <span className="shrink-0 text-xs text-slate-400 tnum">{a.time}</span>
                  </li>
                )
              })}
            </ul>
          </CardBody>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader
            title="Recent AI Errors"
            subtitle="Provider-level errors (final analysis status may still be success)"
            action={<Link to="/ai-errors" className="text-xs font-medium text-primary-600 hover:text-primary-700">All logs</Link>}
          />
          <TableWrap>
            <THead>
              <TR>
                <TH>Analysis ID</TH>
                <TH>Model</TH>
                <TH>Error</TH>
                <TH>Time</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {recentErrors.map((e) => (
                <TR key={e.id}>
                  <TD className="font-medium text-slate-700">{e.analysisId}</TD>
                  <TD className="text-slate-600">{e.model}</TD>
                  <TD>
                    <span className="text-slate-600">{e.errorCode.replace(/_/g, ' ').toLowerCase()}</span>
                    <span className="ml-1.5 text-xs text-slate-400 tnum">({e.httpStatus})</span>
                  </TD>
                  <TD className="whitespace-nowrap text-slate-500">{e.timestamp}</TD>
                  <TD><ResolutionBadge resolution={e.resolution} /></TD>
                </TR>
              ))}
            </TBody>
          </TableWrap>
        </Card>
      </div>
    </div>
  )
}
