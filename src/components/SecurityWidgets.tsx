import { TrustState } from '@/data/mockData';

export function TrustBadge({ state }: { state: TrustState }) {
  const config: Record<TrustState, { label: string; className: string }> = {
    trusted: { label: 'Trusted', className: 'bg-success/15 text-success border-success/30' },
    compromised: { label: 'Compromised', className: 'bg-destructive/15 text-destructive border-destructive/30' },
    revoked: { label: 'Revoked', className: 'bg-warning/15 text-warning border-warning/30' },
    offline: { label: 'Offline', className: 'bg-muted text-muted-foreground border-muted-foreground/30' },
  };
  const c = config[state];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${c.className}`}>
      {c.label}
    </span>
  );
}

export function StatCard({
  label,
  value,
  variant = 'default',
  icon,
}: {
  label: string;
  value: string | number;
  variant?: 'default' | 'success' | 'destructive' | 'muted' | 'warning';
  icon?: React.ReactNode;
}) {
  const borderClasses: Record<string, string> = {
    default: 'border-border',
    success: 'border-success/30 glow-success',
    destructive: 'border-destructive/30 glow-destructive',
    muted: 'border-muted-foreground/20',
    warning: 'border-warning/30',
  };

  const valueClasses: Record<string, string> = {
    default: 'text-foreground',
    success: 'text-success',
    destructive: 'text-destructive',
    muted: 'text-muted-foreground',
    warning: 'text-warning',
  };

  return (
    <div className={`card-cyber ${borderClasses[variant]} animate-fade-in`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <p className={`text-3xl font-bold ${valueClasses[variant]}`}>{value}</p>
    </div>
  );
}

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}

export function SignalBar({ strength }: { strength: number }) {
  const bars = 5;
  const filled = Math.round((strength / 100) * bars);
  return (
    <div className="flex items-end gap-0.5 h-4">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-sm ${
            i < filled ? 'bg-primary' : 'bg-muted'
          }`}
          style={{ height: `${((i + 1) / bars) * 100}%` }}
        />
      ))}
    </div>
  );
}
