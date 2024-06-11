import { createHashHistory } from "history";

import UserList from "../views/user_list/user_list.jsx";
import Register from "../views/register/register.jsx";

export const history = createHashHistory();

export const UserListPage = {
  Element: UserList,
  Path: "/user_list",
};

export const RegisterPage = {
  Element: Register,
  Path: "/",
};

const Pages = [RegisterPage, UserListPage];

export default Pages;
