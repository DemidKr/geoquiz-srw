import { AppPaths } from "../consts";

interface IMenuItem {
  title: string;
  link: string;
}

const userItems: IMenuItem[] = [
  { title: "Мои викторины", link: AppPaths.USER_QUESTIONS },
  { title: "Профиль", link: AppPaths.PROFILE },
];

const adminItems: IMenuItem[] = [
  ...userItems,
  { title: "Админ панель", link: AppPaths.ADMIN },
];

const authItems: IMenuItem[] = [{ title: "Войти", link: "/auth" }];

export const getMenuItemsByAuthAndRole = (
  isAuth: boolean,
  roleName: string,
): IMenuItem[] => {
  if (!isAuth) return authItems;

  switch (roleName) {
    case "admin":
      return adminItems;
    default:
      return userItems;
  }
};
