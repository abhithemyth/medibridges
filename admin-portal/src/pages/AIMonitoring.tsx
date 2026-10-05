import { Activity, CheckCircle2, Loader2, XCircle, Timer, Info } from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
} from 'recharts'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { TableWrap, THead, TH, TBody, TR, TD } from '@/components/ui/Table'
import { AIStatusBadge } from '@/components/ui/StatusBadges'
import { Badge } from '@/components/ui/Badge'
import { LoadingRows } from '@/components/ui/States'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'
import { aiMonitoring, aiTrend, aiAnalyses } from '@/data/mockData'
import { formatNumber } from '@/lib/utils'

const total = aiMonitoring.successful + aiMonitoring.processing + aiMonitoring.failed
const pieData = [
  { name: 'Successful', value: aiMonitoring.successful, color: '#10b981' },
  { name: 'Processing', value: aiMonitoring.processing, color: '#0ea5e9' },
  { name: 'Failed', value: aiMonitoring.failed, color: '#f43f5e' },
]

function Tooltip2({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-md">
      {label && <p className="mb-1 text-xs font-semibold text-slate-700">{label}</p>}
      {payload.map((p: any) => (
        <p key={p.name} className="text-xs text-slate-500 tnum">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ background: p.color || p.fill }} />
          {p.name}: <span className="font-medium text-slate-700">{formatNumber(p.value)}</span>
        </p>
      ))}
    </div>
  )
}

export function AIMonitoring() {
  const loading = useSimulatedLoading(500)
  const successRate = ((aiMonitoring.successful / total) * 100).toFixed(1)

  return (
    <div>
      <PageHeader title="AI Monitoring" subtitle="Track analysis throughput, model health, and processing performance." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Analyses" value={formatNumber(total)} icon={Activity} tone="indigo" hint={`${successRate}% success rate`} />
        <StatCard label="Successful" value={formatNumber(aiMonitoring.successful)} icon={CheckCircle2} tone="emerald" />
        <StatCard label="Processing" value={aiMonitoring.processing} icon={Loader2} tone="blue" hint="currently in flight" />
        <StatCard label="Failed" value={aiMonitoring.failed} icon={XCircle} tone="teal" trend="-3.1%" trendDir="down" hint="after retries" />
        <StatCard label="Avg. Processing Time" value={aiMonitoring.avgTime} icon={Timer} tone="blue" hint="per analysis" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Throughput (last 24h)" subtitle="Successful vs failed analyses over time" />
          <CardBody>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={aiTrend} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="aiSuccess" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="aiFailed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.22} />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<Tooltip2 />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                  <Area type="monotone" dataKey="success" name="Successful" stroke="#10b981" strokeWidth={2} fill="url(#aiSuccess)" />
                  <Area type="monotone" dataKey="failed" name="Failed" stroke="#f43f5e" strokeWidth={2} fill="url(#aiFailed)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Status Breakdown" subtitle="Final analysis outcomes" />
          <CardBody>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={78} paddingAngle={2} stroke="none">
                    {pieData.map((d) => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                  <Tooltip content={<Tooltip2 />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-1.5">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} />{d.name}
                  </span>
                  <span className="font-semibold text-slate-800 tnum">{formatNumber(d.value)}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-sky-100 bg-sky-50/60 px-4 py-3 text-sm text-sky-800">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
        <p>
          A <strong>final analysis status</strong> reflects the overall outcome after all provider attempts. Individual provider errors (e.g. a 503 on attempt 1) are recorded separately in <strong>AI Error Logs</strong> — an analysis can show <Badge tone="green" className="mx-0.5">Success</Badge> even after a failed first attempt.
        </p>
      </div>

      <Card className="mt-5">
        <CardHeader title="Recent AI Analyses" subtitle="Latest analyses with model, status, and duration" />
        {loading ? (
          <LoadingRows rows={8} cols={7} />
        ) : (
          <TableWrap>
            <THead>
              <TR>
                <TH>Analysis ID</TH>
                <TH>Patient</TH>
                <TH>Consultation</TH>
                <TH>Model</TH>
                <TH>Status</TH>
                <TH align="center">Attempts</TH>
                <TH>Duration</TH>
                <TH>Created</TH>
              </TR>
            </THead>
            <TBody>
              {aiAnalyses.map((a) => (
                <TR key={a.id}>
                  <TD className="font-medium text-slate-700 tnum">{a.analysisId}</TD>
                  <TD className="text-slate-600">{a.patient}</TD>
                  <TD className="text-slate-500 tnum">{a.consultation}</TD>
                  <TD><span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{a.model}</span></TD>
                  <TD><AIStatusBadge status={a.status} /></TD>
                  <TD align="center">
                    <span className={a.attempts > 1 ? 'font-medium text-amber-600 tnum' : 'text-slate-500 tnum'}>{a.attempts}</span>
                  </TD>
                  <TD className="text-slate-500 tnum">{a.duration}</TD>
                  <TD className="whitespace-nowrap text-slate-500">{a.created}</TD>
                </TR>
              ))}
            </TBody>
          </TableWrap>
        )}
      </Card>
    </div>
  )
}
