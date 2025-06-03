import Main from "../../components/Main";
import Question from "../../components/Question";
import type { RouteModel } from "../../utils/RouteModel";
import { rootPaths } from "./rootPaths";


export const allRootRoutes: RouteModel[] = [
  {
    element: Question,
    isExact: false,
    path: rootPaths.questions,
    permissionName: "Question",
  },
   {
    element: Main,
    isExact: false,
    path: rootPaths.main,
    permissionName: "Main",
  },
     
 
 
];

export const rootRoutes = (): RouteModel[] => {
 // const routes: RouteModel[] = [];



 
 

  return allRootRoutes;
};
