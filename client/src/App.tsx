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
import QnA from "./pages/QnA";
import QnADetail from "./pages/QnADetail";
import QnAVerify from "./pages/QnAVerify";
import QnAWrite from "./pages/QnAWrite";
import Notice from "./pages/Notice";
import NoticeDetail from "./pages/NoticeDetail";
import NoticeWrite from "./pages/NoticeWrite";

function Router() {
  // 페이지 이동 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/company" component={CompIntro} />
          <Route path="/itservice" component={IT_Services} />
          <Route path="/otservice" component={OT_Services} />
          <Route path="/qna" component={QnA} />
          <Route path="/qna/write" component={QnAWrite} />
          <Route path="/qna/:id/verify" component={QnAVerify} />
          <Route path="/qna/:id" component={QnADetail} />
          <Route path="/notice" component={Notice} />
          <Route path="/notice/write" component={NoticeWrite} />
          <Route path="/notice/:id" component={NoticeDetail} />
          <Route path="/404" component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
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
