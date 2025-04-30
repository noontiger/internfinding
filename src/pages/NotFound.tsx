
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-2xl font-medium mb-4">页面未找到</p>
        <p className="text-muted-foreground max-w-md mx-auto">
          您访问的页面不存在或已被移除，请返回首页
        </p>
        <Button asChild className="mt-4">
          <Link to="/">返回首页</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
