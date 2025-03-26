import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "~/layouts/DefaultLayout";
import routes from "~/routes";
import ProtectedRoute from "../ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {routes.map((route) => {
        const Layout =
          route.layout === undefined ? DefaultLayout : route.layout || Fragment;
        const Component = route.component;
        const RouteWrapper = route.protected ? ProtectedRoute : Fragment;
        return (
          <Route key={route.path} element={<Layout />}>
            <Route
              path={route.path}
              element={
                <RouteWrapper>
                  <Component />
                </RouteWrapper>
              }
            />
          </Route>
        );
      })}
    </Routes>
  );
}

export default AppRoutes;
