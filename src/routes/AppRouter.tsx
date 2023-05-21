import {Route, Routes, useNavigate} from "react-router-dom";
import {useAppSelector} from "../shared/hooks/redux";
import {publicRoutes, userRoutes} from "./routes";
import React, {useEffect} from "react";
import {useSnackbar} from "notistack";

const AppRouter = () => {
    const { isAuth } = useAppSelector(store => store.user)
    const { snack } = useAppSelector(store => store.snackbar)
    const { enqueueSnackbar } = useSnackbar()

    const navigator = useNavigate()

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
        console.log('isAuth', isAuth)
        if (isAuth) {
           return userRoutes
        } else {
            return publicRoutes
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