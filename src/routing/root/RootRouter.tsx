import React, { Suspense } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";

import { rootRoutes } from "./rootRoutes";
import { exactRouteFixer } from "../../utils/exactRouterFixer";
import MainLayout from "../../components/MainLayout";
import AvoidAuth from "../../components/avoid-auth/AvoidAuth";
import RequireAuth from "../../components/require-auth/RequireAuth";
import Auth from "../../components/Auth";


const RootRouter: React.FC = () => {
  return (
    <Suspense >
      <Routes>
    <Route element={<AvoidAuth />}>
          <Route path={"/auth"} element={<Auth />}></Route>
        </Route>
       <Route element={<RequireAuth />}>
          <Route element={<MainLayout />}>
            {rootRoutes()?.map((route, index) => (
              <Route
                key={index}
                path={exactRouteFixer(route.path!, route.isExact)}
                element={<route.element />}
              />
            ))}
            <Route path="*" element={"Not Found 404"} />
          </Route>
       </Route>
   
      </Routes>
    </Suspense>
  );
};

export default RootRouter;
