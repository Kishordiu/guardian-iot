import { devices, getDeviceStats, tamperEvents } from '@/data/mockData';
import { StatCard, TrustBadge, SectionHeader, SignalBar } from '@/components/SecurityWidgets';
import { Shield, Cpu, AlertTriangle, WifiOff, Lock, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardOverview() {
  const stats = getDeviceStats();

  return (
    <div className="space-y-8 max-w-7xl">
      <SectionHeader
        title="System Overview"
        subtitle="Real-time status of all connected IoT devices across the secure network"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="Total Devices" value={stats.total} icon={<Cpu className="w-4 h-4" />} />
        <StatCard label="Trusted" value={stats.trusted} variant="success" icon={<Shield className="w-4 h-4" />} />
        <StatCard label="Compromised" value={stats.compromised} variant="destructive" icon={<ShieldAlert className="w-4 h-4" />} />
        <StatCard label="Offline" value={stats.offline} variant="muted" icon={<WifiOff className="w-4 h-4" />} />
        <StatCard label="Revoked" value={stats.revoked} variant="warning" icon={<Lock className="w-4 h-4" />} />
        <StatCard label="Active Alerts" value={stats.activeAlerts} variant="destructive" icon={<AlertTriangle className="w-4 h-4" />} />
      </div>

      {/* Device Table */}
      <div className="card-cyber overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Live Device Status</h3>
          <Link to="/devices" className="text-xs text-primary hover:underline">View All →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Device UID</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Trust State</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Firmware</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Seen</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Signal</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d) => (
                <tr
                  key={d.uid}
                  className={`border-b border-border/50 transition-colors ${
                    d.trustState === 'compromised' ? 'bg-destructive/5' : 'hover:bg-muted/30'
                  }`}
                >
                  <td className="py-3 px-3 font-mono text-xs text-foreground">{d.uid}</td>
                  <td className="py-3 px-3 text-foreground">{d.name}</td>
                  <td className="py-3 px-3"><TrustBadge state={d.trustState} /></td>
                  <td className="py-3 px-3">
                    {d.firmwareIntegrity ? (
                      <span className="text-success text-xs font-medium">✓ Valid</span>
                    ) : (
                      <span className="text-destructive text-xs font-medium">✗ Failed</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-xs text-muted-foreground">
                    {new Date(d.lastSeen).toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <SignalBar strength={d.signalStrength} />
                  </td>
                  <td className="py-3 px-3">
                    {d.trustState === 'compromised' || d.trustState === 'revoked' ? (
                      <Link to="/device-lifecycle" className="text-xs text-destructive hover:underline font-medium">
                        <Lock className="w-3 h-3 inline mr-1" />Locked
                      </Link>
                    ) : (
                      <Link to="/telemetry" className="text-xs text-primary hover:underline">
                        Monitor →
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="card-cyber border-destructive/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <h3 className="text-sm font-semibold text-foreground">Recent Tamper Alerts</h3>
          </div>
          <Link to="/tamper-events" className="text-xs text-primary hover:underline">View All →</Link>
        </div>
        <div className="space-y-2">
          {tamperEvents.slice(0, 3).map((e) => (
            <div key={e.id} className="flex items-center justify-between py-2 px-3 rounded bg-destructive/5 border border-destructive/10">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  e.alertLevel === 'Critical' ? 'bg-destructive/20 text-destructive' : 'bg-warning/20 text-warning'
                }`}>
                  {e.alertLevel}
                </span>
                <span className="text-sm text-foreground">{e.type}</span>
                <span className="text-xs text-muted-foreground font-mono">{e.deviceUid}</span>
              </div>
              <span className="text-xs text-muted-foreground">{new Date(e.timestamp).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
