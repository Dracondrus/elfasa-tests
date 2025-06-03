import type { ReactNode } from "react";

export interface RouteModel {
  element: React.FC;
  path?: string;
  isExact: boolean;
  index?: boolean;
  children?: RouteModel[];
  breadcrumb?: ReactNode;
  permissionName?: string;
  permissionModuleName?: string;
  isDetailed?: boolean;
}
