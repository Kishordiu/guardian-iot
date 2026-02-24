import { tamperEvents, devices } from '@/data/mockData';
import { SectionHeader } from '@/components/SecurityWidgets';
import { AlertTriangle, ShieldX, KeyRound, Lock } from 'lucide-react';

export default function TamperEventsPage() {
  const activeEvents = tamperEvents.filter(e => e.lockdownActive);
  const hasActive = activeEvents.length > 0;

  return (
    <div className="space-y-6 max-w-5xl">
      {hasActive && (
        <div className="bg-destructive/10 border border-destructive/40 rounded-lg p-4 flex items-center gap-3 animate-fade-in glow-destructive">
          <ShieldX className="w-6 h-6 text-destructive flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-destructive">DEVICE COMPROMISED — LOCKDOWN ACTIVATED</p>
            <p className="text-xs text-destructive/80 mt-0.5">{activeEvents.length} device(s) currently in lockdown mode. Admin recovery required.</p>
          </div>
        </div>
      )}

      <SectionHeader title="Tamper Event Log" subtitle="Physical and firmware intrusion detection records" />

      <div className="card-cyber overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {['ID', 'Device', 'Tamper Type', 'Timestamp', 'Key Status', 'Lockdown', 'Alert Level'].map(h => (
                  <th key={h} className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tamperEvents.map((e) => {
                const device = devices.find(d => d.uid === e.deviceUid);
                return (
                  <tr key={e.id} className="border-b border-border/50 hover:bg-destructive/5 transition-colors">
                    <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{e.id}</td>
                    <td className="py-3 px-3">
                      <span className="font-mono text-xs text-foreground">{e.deviceUid}</span>
                      {device && <p className="text-[10px] text-muted-foreground">{device.name}</p>}
                    </td>
                    <td className="py-3 px-3">
                      <span className="flex items-center gap-1.5 text-foreground">
                        <AlertTriangle className="w-3 h-3 text-destructive" />
                        {e.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-xs text-muted-foreground">{new Date(e.timestamp).toLocaleString()}</td>
                    <td className="py-3 px-3">
                      {e.keyDestroyed ? (
                        <span className="flex items-center gap-1 text-xs text-destructive font-medium">
                          <KeyRound className="w-3 h-3" /> Destroyed
                        </span>
                      ) : (
                        <span className="text-xs text-success font-medium">Intact</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {e.lockdownActive ? (
                        <span className="flex items-center gap-1 text-xs text-destructive font-medium">
                          <Lock className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Cleared</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        e.alertLevel === 'Critical' ? 'bg-destructive/20 text-destructive' : 'bg-warning/20 text-warning'
                      }`}>
                        {e.alertLevel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
