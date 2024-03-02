
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

export const getMenuItemsByAuthAndRole = (isAuth: boolean, roleName: string): IMenuItem[] => {
    if(!isAuth) return authItems

    switch (roleName) {
        case "admin":
            return adminItems;
        default:
            return userItems;
    }
};
