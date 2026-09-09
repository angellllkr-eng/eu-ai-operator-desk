/**
 * EU AI Operator's Desk — Unified platform for European AI adoption
 * Dual-mode: Strategic Market Intelligence + Hardware Configuration
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

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/strategy"} component={StrategicAtlas} />
      <Route path={"/hardware"} component={HardwareBuilder} />
      <Route path={"/about"} component={About} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * Theme: Unified design system
 * - Editorial Intelligence Atlas (warm paper, saffron, deep ink) for strategy
 * - Quiet Command Deck (porcelain, Signal Cobalt, warm graphite) for hardware
 * - Merged aesthetic: accessible, evidence-driven, EU-focused
 */
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
