import { Outlet, Navigate, useLocation } from "react-router-dom";
import { ApplicationProvider } from "@/providers/application-provider";
import { RouteName, getRoutePath } from "@/routes";
import { useEffect } from "react";

export const PrivateRoutes = () => {
  const { user } = ApplicationProvider.useApplication();

  return user ? <Outlet /> : <Navigate to={getRoutePath(RouteName.USERS)} />;
};

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
