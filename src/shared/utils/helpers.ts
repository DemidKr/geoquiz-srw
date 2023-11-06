import {RoleTypes} from "../types/IRole";

interface IMenuItem {
    title: string,
    link: string
}

const adminItems: IMenuItem[] = [
    {title: 'Мои геоквизы', link: '/userQuestions'},
    {title: 'Профиль', link: '/profile'},
    {title: 'Админ панель', link: '/admin'},
];

const userItems: IMenuItem[] = [
    {title: 'Мои геоквизы', link: '/userQuestions'},
    {title: 'Профиль', link: '/profile'},
];

const authItems: IMenuItem[] = [
    {title: 'Войти', link: '/auth'},
]

export const getMenuItemsByAuthAndRole = (isAuth: boolean, role: RoleTypes): IMenuItem[] => {
    if(!isAuth) return authItems

    switch (role) {
        case "admin":
            return adminItems;
        default:
        case "user":
            return userItems;
    }
};
