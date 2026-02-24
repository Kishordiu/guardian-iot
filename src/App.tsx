import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import DevicesPage from "./pages/DevicesPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import TelemetryPage from "./pages/TelemetryPage";
import TamperEventsPage from "./pages/TamperEventsPage";
import DeviceLifecyclePage from "./pages/DeviceLifecyclePage";
import SecurityFlowPage from "./pages/SecurityFlowPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/authentication" element={<AuthenticationPage />} />
            <Route path="/telemetry" element={<TelemetryPage />} />
            <Route path="/tamper-events" element={<TamperEventsPage />} />
            <Route path="/device-lifecycle" element={<DeviceLifecyclePage />} />
            <Route path="/security-flow" element={<SecurityFlowPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
