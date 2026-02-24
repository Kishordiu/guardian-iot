import { SectionHeader } from '@/components/SecurityWidgets';

const flowSteps = [
  { label: 'Power ON', sub: 'Device boot initiated', color: 'primary', icon: '⚡' },
  { label: 'Secure Boot', sub: 'Firmware signature verified', color: 'primary', icon: '🔐' },
  { label: 'Firmware Hash Check', sub: 'SHA-256 integrity validation', color: 'primary', icon: '🔍' },
  { label: 'Authenticate with Server', sub: 'Challenge-response protocol', color: 'success', icon: '🤝' },
  { label: 'Normal Operation', sub: 'Telemetry & monitoring active', color: 'success', icon: '✅' },
  { label: 'Continuous Tamper Monitoring', sub: 'Physical & firmware sensors active', color: 'warning', icon: '👁️' },
];

const tamperResponse = [
  { label: 'Erase Private Keys', sub: 'Secure element wiped', icon: '🗑️' },
  { label: 'Disable Network', sub: 'WiFi & BLE disabled', icon: '📡' },
  { label: 'Enter Lockdown Mode', sub: 'All operations halted', icon: '🔒' },
  { label: 'Send Compromised Alert', sub: 'Server notified immediately', icon: '🚨' },
];

const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  primary: {
    border: 'border-primary/50',
    bg: 'bg-primary/10',
    text: 'text-primary',
    glow: 'shadow-[0_0_15px_hsl(192,91%,50%,0.15)]',
  },
  success: {
    border: 'border-success/50',
    bg: 'bg-success/10',
    text: 'text-success',
    glow: 'shadow-[0_0_15px_hsl(152,69%,41%,0.15)]',
  },
  warning: {
    border: 'border-warning/50',
    bg: 'bg-warning/10',
    text: 'text-warning',
    glow: 'shadow-[0_0_15px_hsl(38,92%,50%,0.15)]',
  },
};

export default function SecurityFlowPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SectionHeader title="Security Architecture Flow" subtitle="Complete boot-to-lockdown security lifecycle visualization" />

      {/* Normal Flow */}
      <div className="relative">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">Normal Operation Flow</h3>
        <div className="space-y-0">
          {flowSteps.map((step, i) => {
            const c = colorMap[step.color];
            return (
              <div key={i} className="flex items-stretch">
                {/* Timeline line */}
                <div className="flex flex-col items-center mr-4 w-8">
                  <div className={`w-3 h-3 rounded-full ${c.bg} border-2 ${c.border} ${c.glow} z-10`} />
                  {i < flowSteps.length - 1 && <div className="w-0.5 flex-1 bg-border" />}
                </div>
                {/* Content */}
                <div className={`card-cyber ${c.border} mb-3 flex-1 flex items-center gap-3 animate-fade-in`} style={{ animationDelay: `${i * 80}ms` }}>
                  <span className="text-2xl">{step.icon}</span>
                  <div>
                    <p className={`text-sm font-semibold ${c.text}`}>{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.sub}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tamper Branch */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-xs font-bold text-destructive uppercase tracking-widest">If Tamper Detected</h3>
          <div className="flex-1 h-px bg-destructive/30" />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {tamperResponse.map((step, i) => (
            <div
              key={i}
              className="card-cyber border-destructive/30 bg-destructive/5 flex items-center gap-3 animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-2xl">{step.icon}</span>
              <div>
                <p className="text-sm font-semibold text-destructive">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="card-cyber">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Color Legend</h3>
        <div className="flex flex-wrap gap-4">
          {[
            { color: 'bg-primary', label: 'Boot Sequence' },
            { color: 'bg-success', label: 'Normal Operation' },
            { color: 'bg-warning', label: 'Active Monitoring' },
            { color: 'bg-destructive', label: 'Lockdown Response' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm ${l.color}`} />
              <span className="text-xs text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
