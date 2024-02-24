import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../shared/hooks/redux";
import {useAction} from "../shared/hooks/useAction";
import { Grid} from "@mui/material";
import {AuthBox, AuthButton, AuthHint, AuthHintButton, AuthInput, AuthTitle} from "../components/Auth/Auth.styled";
import {useLoginMutation, useRegistrationMutation} from "../store/api/authApi";
import {userSlice} from "../store/reducers/UserSlice";

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
        if (registrationData && AuthType.LOGIN) {
            addSnack('Успешный регистрация', 'success')
            dispatch(userSlice.actions.userFetchingSuccess({
                username: registrationData.username,
                role: registrationData.role.name
            }))
            localStorage.setItem('auth', JSON.stringify(registrationData.access_token))
        }

        if (registrationError && AuthType.REGISTRATION) {
            if ('status' in registrationError) {
                const data = registrationError.data as IErrorResponce
                addSnack(data?.message || 'Что-то пошло не так...', 'error')
            } else {
                addSnack( 'Что-то пошло не так...', 'error')
            }
        }
    }, [isRegistrationLoading])

    useEffect(() => {
        if (loginData && AuthType.LOGIN) {
            addSnack('Успешный вход', 'success')
            dispatch(userSlice.actions.userFetchingSuccess({
                username: loginData.username,
                role: loginData.role.name
            }))
            localStorage.setItem('auth', JSON.stringify(loginData.access_token))
        }

        if (loginError && AuthType.LOGIN) {
            if ('status' in loginError) {
                const data = loginError.data as IErrorResponce
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
            <Grid container component="main" sx={{
                height: 'calc(100vh - 80px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}>
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
        </>
    );
};

export default AuthPage;