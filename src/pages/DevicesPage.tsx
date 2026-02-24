import { devices } from '@/data/mockData';
import { TrustBadge, SectionHeader, SignalBar } from '@/components/SecurityWidgets';
import { Link } from 'react-router-dom';
import { Lock, MapPin } from 'lucide-react';

export default function DevicesPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      <SectionHeader title="Device Registry" subtitle="Complete inventory of all registered IoT endpoints" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {devices.map((d) => (
          <div
            key={d.uid}
            className={`card-cyber transition-all ${
              d.trustState === 'compromised' ? 'border-destructive/40 glow-destructive' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-muted-foreground">{d.uid}</span>
              <TrustBadge state={d.trustState} />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{d.name}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
              <MapPin className="w-3 h-3" />
              {d.location}
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div>
                <span className="text-muted-foreground">Firmware</span>
                <p className={`font-medium ${d.firmwareIntegrity ? 'text-success' : 'text-destructive'}`}>
                  {d.firmwareVersion}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Signal</span>
                <div className="mt-1"><SignalBar strength={d.signalStrength} /></div>
              </div>
              <div>
                <span className="text-muted-foreground">Trust Score</span>
                <p className={`font-bold ${d.trustScore > 70 ? 'text-success' : d.trustScore > 0 ? 'text-warning' : 'text-destructive'}`}>
                  {d.trustScore}/100
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Last Seen</span>
                <p className="text-foreground">{new Date(d.lastSeen).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-border">
              {d.trustState === 'compromised' || d.trustState === 'revoked' ? (
                <div className="flex items-center gap-1.5 text-xs text-destructive font-medium">
                  <Lock className="w-3 h-3" /> Device Locked — Admin Recovery Required
                </div>
              ) : d.trustState === 'offline' ? (
                <span className="text-xs text-muted-foreground">Awaiting reconnection...</span>
              ) : (
                <Link to="/telemetry" className="text-xs text-primary hover:underline font-medium">
                  View Telemetry →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
