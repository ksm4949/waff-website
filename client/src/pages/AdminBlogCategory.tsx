import { useEffect } from "react";
import { useLocation } from "wouter";
import BlogCategory from "./BlogCategory";

export default function AdminBlogCategory() {
  const [, navigate] = useLocation();

  useEffect(() => {
    if (window.localStorage.getItem("isAdmin") !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  return <BlogCategory adminMode />;
}

