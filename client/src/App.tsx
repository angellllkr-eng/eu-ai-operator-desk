/**
 * Updated App Router - Add new monetization pages
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import HardwareBuilder from "./pages/HardwareBuilder";
import StrategicAtlas from "./pages/StrategicAtlas";
import About from "./pages/About";
import SponsorOnboarding from "./components/SponsorOnboarding";
import AffiliateSignup from "./components/AffiliateSignup";
import AdminDashboard from "./components/AdminDashboard";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/strategy"} component={StrategicAtlas} />
      <Route path={"/hardware"} component={HardwareBuilder} />
      <Route path={"/about"} component={About} />
      <Route path={"/become-sponsor"} component={SponsorOnboarding} />
      <Route path={"/affiliate"} component={AffiliateSignup} />
      <Route path={"/admin/dashboard"} component={AdminDashboard} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster richColors position="bottom-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
