import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import {useAction} from "../shared/hooks/useAction";
import {login, registration} from "../store/action-creators/auth";
import {CssBaseline, Grid} from "@mui/material";
import Header from "../components/Header/Header";
import {AuthBox, AuthButton, AuthHint, AuthHintButton, AuthInput, AuthTitle} from "../components/AuthBox/styled";

enum AuthType {
    LOGIN = 'login',
    REGISTRATION = 'registration',
}

const AuthPage = () => {
    const {isLoading} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const addSnack = useAction()

    const [auth, setAuth] = useState<AuthType>(AuthType.LOGIN)
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')

    const handleAuth = async () => {
        if (!username || !password) {
            addSnack('Заполните все поля', 'error')
            return;
        }

        if (password.length < 8) {
            addSnack('Пароль должен содержать не менее 8 символов', 'error')
            return;
        }

        if (auth === AuthType.LOGIN) {
            await dispatch(login(username, password)).then(value => {
                if (value.message) {
                    addSnack(value.response?.data?.message || 'Неверный логин или пароль', 'error')
                }
                if (value.data) {
                    addSnack('Успешный вход', 'success')
                }
                if (!value.message && !value.data) {
                    addSnack('Что-то пошло не так...', 'error')
                }
            })
        } else {
            await dispatch(registration(username, password)).then(value => {
                if (value.message) {
                    addSnack(value.response?.data?.message || 'Неверный логин или пароль', 'error')
                    console.log('value.message', value.message)
                }
                if (value.data) {
                    addSnack('Успешная регистрация', 'success')
                }
                if (!value.message && !value.data) {
                    addSnack('Что-то пошло не так...', 'error')
                }
            })
        }

    }

    return (
        <>
            <Grid container component="main" sx={{ height: 'calc(100vh - 80px)' }}>
                <Header themeSwitcherOn={true} small={true}/>
                <CssBaseline/>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'url(https://images.unsplash.com/photo-1535557142533-b5e1cc6e2a5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2458&q=80)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'top',
                    }}
                >
                    <AuthBox>
                        <AuthTitle component="div">
                            {auth === AuthType.LOGIN ? 'Логин' : 'Регистрация'}
                        </AuthTitle>
                        <AuthInput
                            label="Пользователь"
                            inputProps={{autoComplete: 'off',}}
                            value={username}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setUsername(event.target.value)
                            }
                        />
                        <AuthInput
                            label="Пароль"
                            type="password"
                            inputProps={{autoComplete: 'off',}}
                            value={password}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setPassword(event.target.value)
                            }
                        />
                        <AuthButton
                            disabled={isLoading}
                            onClick={handleAuth}
                            variant="contained"
                        >
                            {auth === AuthType.LOGIN ? 'Войти' : 'Зарегистирироваться'}
                        </AuthButton>
                        <AuthHint component="div">
                            {auth === AuthType.LOGIN ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                            <AuthHintButton
                                component='span'
                                onClick={() => setAuth(auth === AuthType.LOGIN ? AuthType.REGISTRATION : AuthType.LOGIN)}>
                                {auth === AuthType.LOGIN ? 'Зарегистирироваться' : 'Войти'}
                            </AuthHintButton>
                        </AuthHint>
                    </AuthBox>
                </Grid>
            </Grid>
        </>
    );
};

export default AuthPage;