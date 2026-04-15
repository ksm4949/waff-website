import { useEffect } from "react";
import { useLocation } from "wouter";
import Blog from "./Blog";

export default function AdminBlog() {
  const [, navigate] = useLocation();

  useEffect(() => {
    if (window.localStorage.getItem("isAdmin") !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  return <Blog adminMode />;
}
