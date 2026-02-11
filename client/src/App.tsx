import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "@/components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CompIntro from "./pages/CompIntro"
import IT_Services from "./pages/IT_Services";
import OT_Services from "./pages/OT_Services";
import Contact from "./pages/Contact";

function Router() {
  // 페이지 이동 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/company" component={CompIntro} />
        <Route path="/itservice" component={IT_Services} />
        <Route path="/otservice" component={OT_Services} />
        <Route path="/contact" component={Contact} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
