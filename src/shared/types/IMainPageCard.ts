import {ReactNode} from "react";

export interface IMainPageCard {
    title: string,
    desc: string,
    link: string,
    icon: ReactNode,
    isAuthRequired?: boolean
}