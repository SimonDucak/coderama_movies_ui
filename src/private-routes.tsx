import { Outlet, Navigate } from "react-router-dom";
import { SelectedUserProvider } from "@/providers/selected-user-provider";
import { RouteName, getRoutePath } from "@/routes";

const PrivateRoutes = () => {
  const { user } = SelectedUserProvider.useSelectedUser();

  return user ? <Outlet /> : <Navigate to={getRoutePath(RouteName.USERS)} />;
};

export default PrivateRoutes;
