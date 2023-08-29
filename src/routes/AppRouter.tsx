import {Route, Routes, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import {publicRoutes, userRoutes} from "./routes";
import React, {useEffect} from "react";
import {useSnackbar} from "notistack";
import {getAuthDataFromLS} from "../store/action-creators/auth";
import {userSlice} from "../store/reducers/UserSlice";

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
            return publicRoutes
        } else {
            return userRoutes
        }
        // console.log('isAuth', isAuth)
        // if (isAuth) {
        //    return userRoutes
        // } else {
        //     return publicRoutes
        // }
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