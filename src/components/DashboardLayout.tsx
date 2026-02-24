import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  Activity,
  RotateCcw,
  GitBranch,
  Menu,
  X,
  Shield,
  Bell,
  User,
  Presentation,
} from 'lucide-react';

const navItems = [
  { label: 'Overview', path: '/', icon: LayoutDashboard },
  { label: 'Devices', path: '/devices', icon: Cpu },
  { label: 'Authentication', path: '/authentication', icon: ShieldCheck },
  { label: 'Tamper Events', path: '/tamper-events', icon: AlertTriangle },
  { label: 'Telemetry', path: '/telemetry', icon: Activity },
  { label: 'Device Lifecycle', path: '/device-lifecycle', icon: RotateCcw },
  { label: 'Security Flow', path: '/security-flow', icon: GitBranch },
];

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-mono text-sm text-muted-foreground">
      {time.toLocaleTimeString()} UTC
    </span>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-60' : 'w-0 -ml-1'
        } transition-all duration-300 bg-sidebar border-r border-sidebar-border flex-shrink-0 overflow-hidden`}
      >
        <div className="flex flex-col h-full w-60">
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-5 py-5 border-b border-sidebar-border">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground tracking-tight">ZeroTrust IoT</span>
              <span className="text-[10px] text-muted-foreground font-mono tracking-wider uppercase">Command Center</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const active = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-sidebar-border">
            <p className="text-[10px] text-muted-foreground font-mono text-center tracking-wider">
              CHEMOVATE 2.0 — SENTINEL TEAM
            </p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-border bg-card/50 backdrop-blur flex items-center justify-between px-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <h1 className="text-sm font-semibold text-foreground hidden sm:block">
              {navItems.find((n) => n.path === pathname)?.label ?? 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/present')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold transition-colors"
            >
              <Presentation className="w-3.5 h-3.5" />
              Present
            </button>
            <LiveClock />
            <button className="relative p-1.5 rounded-md hover:bg-muted text-muted-foreground">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-xs font-medium text-foreground hidden sm:block">Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
