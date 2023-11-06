import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import {useAction} from "../shared/hooks/useAction";
import {CssBaseline, Grid} from "@mui/material";
import Header from "../components/Header/Header";
import {AuthBox, AuthButton, AuthHint, AuthHintButton, AuthInput, AuthTitle} from "../components/Auth/Auth.styled";
import {useLoginMutation, useRegistrationMutation} from "../store/api/authApi";

enum AuthType {
    LOGIN = 'login',
    REGISTRATION = 'registration',
}

interface IErrorResponce {
    statusCode?: number;
    message?: string;
    error?: string;
}

const AuthPage = () => {
    // const {isLoading} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const addSnack = useAction()

    const [
        login,
        {
            data: loginData,
            isLoading: isLoginLoading,
            isSuccess: isLoginSuccess,
            isError: isLoginError,
            error: loginError
        }
    ] = useLoginMutation()
    const [
        registration,
        {
            data: registrationData,
            isLoading: isRegistrationLoading,
            isSuccess: isRegistrationSuccess,
            isError: isRegistrationError,
            error: registrationError
        }
    ] = useRegistrationMutation()

    const [auth, setAuth] = useState<AuthType>(AuthType.LOGIN)
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')

    useEffect(() => {
        console.log('registrationData', registrationData)
        console.log('registrationError', registrationError)
        if (isRegistrationSuccess) {
            addSnack('Успешная регистрация', 'success')
        }

        if (registrationError && AuthType.REGISTRATION) {
            if ('status' in registrationError) {
                const data = registrationError.data as IErrorResponce
                console.log('data?.message', data?.message)
                addSnack(data?.message || 'Что-то пошло не так...', 'error')
            } else {
                addSnack( 'Что-то пошло не так...', 'error')
            }
        }
    }, [isRegistrationLoading])

    useEffect(() => {
        console.log('loginData', loginData)
        console.log('loginError', loginError)
        if (isLoginSuccess) {
            addSnack('Успешный вход', 'success')
        }

        if (loginError && AuthType.LOGIN) {
            if ('status' in loginError) {
                const data = loginError.data as IErrorResponce
                console.log('data?.message', data?.message)
                addSnack(data?.message || 'Что-то пошло не так...', 'error')
            } else {
                addSnack( 'Что-то пошло не так...', 'error')
            }
        }
    }, [isLoginLoading])

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
            login({username, password})
        } else {
            registration({username, password})
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
                            disabled={isLoginLoading || isRegistrationLoading}
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