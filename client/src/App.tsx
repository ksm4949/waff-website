import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "@/components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CompIntro from "./pages/CompIntro";
import IT_Services from "./pages/IT_Services";
import OT_Services from "./pages/OT_Services";
import QnA from "./pages/QnA";
import QnADetail from "./pages/QnADetail";
import QnAVerify from "./pages/QnAVerify";
import QnAWrite from "./pages/QnAWrite";
import Notice from "./pages/Notice";
import NoticeDetail from "./pages/NoticeDetail";
import NoticeWrite from "./pages/NoticeWrite";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import BlogWrite from "./pages/BlogWrite";
import AdminLogin from "./pages/AdminLogin";
import AdminBlog from "./pages/AdminBlog";
import BlogCategory from "./pages/BlogCategory";
import AdminBlogCategory from "./pages/AdminBlogCategory";

function BlogPublic() {
  return <Blog />;
}

function BlogCategoryPublic() {
  return <BlogCategory />;
}

function Router() {
  const [location] = useLocation();

  // Move to top on every route change.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

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
          <Route path="/blog" component={BlogPublic} />
          <Route path="/blog/category/:category" component={BlogCategoryPublic} />
          <Route path="/blog/:id" component={BlogDetail} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/blog" component={AdminBlog} />
          <Route path="/admin/blog/category/:category" component={AdminBlogCategory} />
          <Route path="/admin/blog/write" component={BlogWrite} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
