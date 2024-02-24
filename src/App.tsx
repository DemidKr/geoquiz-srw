import React, {FC, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import AppRouter from "./routes/AppRouter";
import {useAppDispatch, useAppSelector} from "./shared/hooks/redux";
import {userSlice} from "./store/reducers/UserSlice";
import {getAuthDataFromLS, getUserByToken} from "./store/action-creators/auth";
import {createTheme, ThemeProvider} from "@mui/material";
import {LOCAL_STORAGE_THEME_KEY, Theme, themeSlice} from "./store/reducers/ThemeSlice";
import BasePage from "./pages/BasePage/BasePage";


const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT

const App: FC = () => {
    const {theme} = useAppSelector(state => state.theme)

    const dispatch = useAppDispatch()

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    useEffect(() => {
        if (theme !== defaultTheme) {
            dispatch(themeSlice.actions.setTheme(defaultTheme))
        }
        const auth = dispatch(getAuthDataFromLS());
        console.log('auth', auth)
        if (auth ) {
            dispatch(getUserByToken(auth))
        } else {
            dispatch(userSlice.actions.removeUser())
        }
    }, [])

    return (
        <ThemeProvider theme={theme === Theme.DARK ? darkTheme : lightTheme}>
            <Router>
                <BasePage>
                    <AppRouter/>
                </BasePage>
            </Router>
        </ThemeProvider>
    );
};

export default App;