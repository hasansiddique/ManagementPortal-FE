import { USER_STATE } from "../../common/constants";
import { userRoutes } from "./content/user/user.routes";
import { adminRoutes } from "./content/admin/admin.routes";

export const getSideBarRoutes = (userTypeId) => {
  let routes = [];

  if (
    userTypeId === USER_STATE.ADMIN_FULL ||
    userTypeId === USER_STATE.ADMIN_PARTIAL
  ) {
    routes = adminRoutes;
  } else if (userTypeId === USER_STATE.EMPLOYEE) {
    routes = userRoutes;
  }

  return routes;
};
