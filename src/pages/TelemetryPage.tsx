import { useState } from 'react';
import { devices, IoTDevice } from '@/data/mockData';
import { SectionHeader } from '@/components/SecurityWidgets';
import { Cpu, HardDrive, Thermometer, Clock, Wifi, ShieldX } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

function generateTimeSeries(base: number, variance: number) {
  return Array.from({ length: 20 }, (_, i) => ({
    t: `${i}m`,
    v: Math.max(0, Math.min(100, base + (Math.random() - 0.5) * variance)),
  }));
}

function MiniChart({ data, color }: { data: { t: string; v: number }[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="t" tick={{ fontSize: 10, fill: 'hsl(215, 20%, 55%)' }} axisLine={false} tickLine={false} />
        <YAxis hide domain={[0, 100]} />
        <Tooltip
          contentStyle={{ background: 'hsl(222, 44%, 9%)', border: '1px solid hsl(220, 30%, 18%)', borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: 'hsl(215, 20%, 55%)' }}
        />
        <Area type="monotone" dataKey="v" stroke={color} fill={`url(#grad-${color})`} strokeWidth={2} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default function TelemetryPage() {
  const trustedDevices = devices.filter(d => d.trustState === 'trusted');
  const [selected, setSelected] = useState<IoTDevice>(trustedDevices[0] || devices[0]);
  const isLocked = selected.trustState === 'compromised' || selected.trustState === 'revoked' || selected.trustState === 'offline';

  return (
    <div className="space-y-6 max-w-6xl">
      <SectionHeader title="Live Telemetry Monitoring" subtitle="Real-time device health and performance metrics" />

      <div className="card-cyber">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Select Device</label>
        <select
          value={selected.uid}
          onChange={(e) => setSelected(devices.find(d => d.uid === e.target.value)!)}
          className="bg-muted border border-border rounded px-3 py-2 text-sm text-foreground w-full max-w-md"
        >
          {devices.map(d => (
            <option key={d.uid} value={d.uid}>{d.uid} — {d.name} ({d.trustState})</option>
          ))}
        </select>
      </div>

      {isLocked ? (
        <div className="card-cyber border-destructive/30 glow-destructive flex flex-col items-center py-12">
          <ShieldX className="w-16 h-16 text-destructive mb-4" />
          <h3 className="text-lg font-bold text-destructive mb-2">Device in Lockdown</h3>
          <p className="text-sm text-muted-foreground">Telemetry Disabled — Device must be recovered by admin before data can be collected.</p>
        </div>
      ) : (
        <>
          {/* Stat Row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: Cpu, label: 'CPU', value: `${selected.cpuUsage}%`, color: 'text-primary' },
              { icon: HardDrive, label: 'Memory', value: `${selected.memoryUsage}%`, color: 'text-primary' },
              { icon: Thermometer, label: 'Temp', value: `${selected.temperature}°C`, color: selected.temperature > 45 ? 'text-warning' : 'text-success' },
              { icon: Clock, label: 'Uptime', value: selected.uptime, color: 'text-foreground' },
              { icon: Wifi, label: 'Signal', value: `${selected.signalStrength}%`, color: 'text-success' },
            ].map((m) => (
              <div key={m.label} className="card-cyber flex items-center gap-3">
                <m.icon className={`w-5 h-5 ${m.color}`} />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">{m.label}</p>
                  <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card-cyber">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">CPU Usage</h4>
              <MiniChart data={generateTimeSeries(selected.cpuUsage, 15)} color="hsl(192, 91%, 50%)" />
            </div>
            <div className="card-cyber">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Memory Usage</h4>
              <MiniChart data={generateTimeSeries(selected.memoryUsage, 10)} color="hsl(152, 69%, 41%)" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
