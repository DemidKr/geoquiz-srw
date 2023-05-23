import React, {FC, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import AppRouter from "./routes/AppRouter";
import {useAppDispatch} from "./shared/hooks/redux";
import {userSlice} from "./store/reducers/UserSlice";
import {getAuthDataFromLS} from "./store/action-creators/auth";

const App: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const auth: any = dispatch(getAuthDataFromLS());
        console.log('auth', auth)

        if (!auth || !auth.access_token || !auth.refresh_token) {
            dispatch(userSlice.actions.removeUser())
        } else {

            dispatch(userSlice.actions.userFetchingSuccess(auth.username))
        }
    }, [])

    return (
        <Router>
            <AppRouter/>
        </Router>
    );
};

export default App;