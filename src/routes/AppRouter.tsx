import {Route, Routes} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import {publicRoutes, userRoutes} from "./routes";
import React, {useEffect} from "react";
import {useSnackbar} from "notistack";
import {getAuthDataFromLS} from "../store/action-creators/auth";

const AppRouter = () => {
    const { isAuth } = useAppSelector(store => store.user)
    const { snack } = useAppSelector(store => store.snackbar)
    const { enqueueSnackbar } = useSnackbar()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (snack && snack.id) {
            enqueueSnackbar(snack.message, {
                autoHideDuration: 4000,
                variant: snack.variant,
                key: snack.id,
            })
        }
    }, [snack, enqueueSnackbar])

    const getRouts = () => {
        const auth: any = dispatch(getAuthDataFromLS());
        console.log('auth', auth)

        if (!auth || !auth.access_token || !auth.refresh_token) {
            // ToDo: validate data and token

            return publicRoutes
        } else {
            return userRoutes
        }
    }

    return (
        <Routes>
            {getRouts().map(route => (
                <Route path={route.path} element={route.element} key={route.path} />
            ))}
        </Routes>
    )
}

export default AppRouter