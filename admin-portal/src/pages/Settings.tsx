import { useState } from 'react'
import { Building2, ClipboardList, FileText, Sparkles, Bell, Lock, UserCircle, Save } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Select, Field } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

const sections = [
  { id: 'platform', label: 'Platform', icon: Building2 },
  { id: 'consultations', label: 'Consultations', icon: ClipboardList },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'ai', label: 'AI', icon: Sparkles },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'profile', label: 'Profile', icon: UserCircle },
]

function Toggle({ on, onChange, label, desc }: { on: boolean; onChange: (v: boolean) => void; label: string; desc?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3 last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-800">{label}</p>
        {desc && <p className="mt-0.5 text-xs text-slate-500">{desc}</p>}
      </div>
      <button
        role="switch"
        aria-checked={on}
        onClick={() => onChange(!on)}
        className={cn('relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors focus-ring', on ? 'bg-primary-600' : 'bg-slate-300')}
      >
        <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform', on ? 'translate-x-5' : 'translate-x-0.5')} />
      </button>
    </div>
  )
}

export function Settings() {
  const [active, setActive] = useState('platform')
  const [saved, setSaved] = useState(false)
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    autoVerify: false,
    allowRegistration: true,
    autoAssign: true,
    requireApproval: true,
    aiEnabled: true,
    aiRetry: true,
    notifyConsult: true,
    notifyAI: true,
    notifySecurity: true,
    twoFactor: true,
    sessionTimeout: true,
    auditVerbose: false,
  })

  function set(key: string, v: boolean) {
    setToggles((p) => ({ ...p, [key]: v }))
  }

  function onSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Configure platform behavior, AI, notifications, and security."
        actions={
          <Button variant="primary" onClick={onSave}>
            <Save className="h-4 w-4" /> {saved ? 'Saved' : 'Save changes'}
          </Button>
        }
      />

      {saved && (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 animate-fade-in">
          Settings saved successfully (prototype — not persisted).
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        {/* Settings nav */}
        <Card className="h-fit lg:col-span-1">
          <CardBody className="p-2">
            <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible scroll-thin">
              {sections.map((s) => {
                const Icon = s.icon
                return (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className={cn(
                      'flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-ring lg:w-full',
                      active === s.id ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-100'
                    )}
                  >
                    <Icon className={cn('h-4 w-4', active === s.id ? 'text-primary-600' : 'text-slate-400')} />
                    {s.label}
                  </button>
                )
              })}
            </nav>
          </CardBody>
        </Card>

        {/* Section content */}
        <Card className="lg:col-span-3">
          <CardBody>
            {active === 'platform' && (
              <Section title="Platform" desc="General platform configuration and registration policy.">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Platform name"><Input defaultValue="MedBridges" /></Field>
                  <Field label="Support email"><Input defaultValue="support@medbridges.com" type="email" /></Field>
                  <Field label="Default timezone"><Select defaultValue="UTC"><option>UTC</option><option>America/New_York</option><option>Europe/London</option><option>Asia/Kolkata</option></Select></Field>
                  <Field label="Default region"><Select defaultValue="us-east"><option value="us-east">US East</option><option value="us-west">US West</option><option value="eu-central">EU Central</option></Select></Field>
                </div>
                <div className="mt-4">
                  <Toggle on={toggles.allowRegistration} onChange={(v) => set('allowRegistration', v)} label="Allow new registrations" desc="Patients and hospitals can create new accounts." />
                  <Toggle on={toggles.autoVerify} onChange={(v) => set('autoVerify', v)} label="Auto-verify hospitals" desc="Skip manual verification for new hospital signups." />
                </div>
              </Section>
            )}

            {active === 'consultations' && (
              <Section title="Consultations" desc="Control case routing and hospital workflows.">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Max active cases per patient"><Input defaultValue="5" type="number" /></Field>
                  <Field label="Auto-close after (days)"><Input defaultValue="30" type="number" /></Field>
                </div>
                <div className="mt-4">
                  <Toggle on={toggles.autoAssign} onChange={(v) => set('autoAssign', v)} label="Auto-assign doctors" desc="Automatically suggest a doctor based on department." />
                  <Toggle on={toggles.requireApproval} onChange={(v) => set('requireApproval', v)} label="Require hospital approval" desc="Hospitals must accept a case before it proceeds." />
                </div>
              </Section>
            )}

            {active === 'documents' && (
              <Section title="Documents" desc="Upload limits and processing rules for medical documents.">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Max file size (MB)"><Input defaultValue="25" type="number" /></Field>
                  <Field label="Allowed formats"><Input defaultValue="PDF, DICOM, PNG, JPEG" /></Field>
                  <Field label="Retention (days)"><Input defaultValue="365" type="number" /></Field>
                  <Field label="Virus scanning"><Select defaultValue="enabled"><option value="enabled">Enabled</option><option value="disabled">Disabled</option></Select></Field>
                </div>
              </Section>
            )}

            {active === 'ai' && (
              <Section title="AI" desc="Model selection, retries, and processing behavior.">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Primary model"><Select defaultValue="MedVision-2"><option>MedVision-2</option><option>Nemotron</option></Select></Field>
                  <Field label="Fallback model"><Select defaultValue="Nemotron"><option>Nemotron</option><option>MedVision-2</option><option value="none">None</option></Select></Field>
                  <Field label="Max retries"><Input defaultValue="3" type="number" /></Field>
                  <Field label="Timeout (seconds)"><Input defaultValue="12" type="number" /></Field>
                </div>
                <div className="mt-4">
                  <Toggle on={toggles.aiEnabled} onChange={(v) => set('aiEnabled', v)} label="Enable AI analysis" desc="Run AI-assisted analysis on incoming cases." />
                  <Toggle on={toggles.aiRetry} onChange={(v) => set('aiRetry', v)} label="Retry on provider errors" desc="Automatically retry when a provider is overloaded or times out." />
                </div>
              </Section>
            )}

            {active === 'notifications' && (
              <Section title="Notifications" desc="Choose which alerts reach administrators.">
                <Toggle on={toggles.notifyConsult} onChange={(v) => set('notifyConsult', v)} label="Consultation events" desc="New, accepted, and completed consultations." />
                <Toggle on={toggles.notifyAI} onChange={(v) => set('notifyAI', v)} label="AI failures" desc="Alert when analyses fail after all retries." />
                <Toggle on={toggles.notifySecurity} onChange={(v) => set('notifySecurity', v)} label="Security alerts" desc="New-device logins and permission changes." />
              </Section>
            )}

            {active === 'security' && (
              <Section title="Security" desc="Authentication and session security for the console.">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Session timeout (minutes)"><Input defaultValue="30" type="number" /></Field>
                  <Field label="Password policy"><Select defaultValue="strong"><option value="strong">Strong</option><option value="moderate">Moderate</option></Select></Field>
                </div>
                <div className="mt-4">
                  <Toggle on={toggles.twoFactor} onChange={(v) => set('twoFactor', v)} label="Require two-factor authentication" desc="Enforce 2FA for all admin accounts." />
                  <Toggle on={toggles.sessionTimeout} onChange={(v) => set('sessionTimeout', v)} label="Auto-logout on inactivity" desc="Sign out admins after the session timeout." />
                  <Toggle on={toggles.auditVerbose} onChange={(v) => set('auditVerbose', v)} label="Verbose audit logging" desc="Record read-only actions in the audit trail." />
                </div>
              </Section>
            )}

            {active === 'profile' && (
              <Section title="Profile" desc="Your administrator profile.">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Full name"><Input defaultValue="Aarav Mehta" /></Field>
                  <Field label="Email"><Input defaultValue="aarav.mehta@medbridges.com" type="email" /></Field>
                  <Field label="Role"><Input defaultValue="Super Admin" disabled /></Field>
                  <Field label="Phone"><Input defaultValue="+1 202 555 0100" /></Field>
                </div>
              </Section>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <p className="mt-0.5 text-sm text-slate-500">{desc}</p>
      </div>
      {children}
    </div>
  )
}
