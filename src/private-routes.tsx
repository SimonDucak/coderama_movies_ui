import { Outlet, Navigate } from "react-router-dom";
import { ApplicationProvider } from "@/providers/application-provider";
import { RouteName, getRoutePath } from "@/routes";

const PrivateRoutes = () => {
  const { user } = ApplicationProvider.useApplication();

  return user ? <Outlet /> : <Navigate to={getRoutePath(RouteName.USERS)} />;
};

export default PrivateRoutes;
