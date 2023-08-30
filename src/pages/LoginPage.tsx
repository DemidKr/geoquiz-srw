import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import {Box, Button, CssBaseline, Grid, TextField, Typography} from "@mui/material";
import LegacyHeader from "../components/LegacyHeader/LegacyHeader";
import {useAction} from "../shared/hooks/useAction";
import {login} from "../store/action-creators/auth";
import {useNavigate} from "react-router-dom";
import Header from "../components/Header/Header";
import ImageBackground from "../components/ImageBackground/ImageBackground";
import {AuthBox, AuthButton, AuthHint, AuthHintButton, AuthInput, AuthTitle} from "../components/AuthBox/styled";

const LoginPage = () => {
    const {isLoading} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const addSnack = useAction()
    const navigate = useNavigate()

    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')

    const handleLogin = async () => {
        if (!username || !password) {
            addSnack('Заполните все поля', 'error')
            return;
        }

        await dispatch(login(username, password)).then(value => {
            if (value.message) {
                addSnack('Данный пользователь уже существует', 'error')
            }
            if (value.data) {
                addSnack('Успешная вход', 'success')
            }
            if (!value.message && !value.data) {
                addSnack('Unknown error', 'error')
            }
        })
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
                            Логин
                        </AuthTitle>
                        <AuthInput
                            label="Username"
                            inputProps={{autoComplete: 'off',}}
                            value={username}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setUsername(event.target.value)
                        }
                        />
                        <AuthInput
                            label="Password"
                            type="password"
                            inputProps={{autoComplete: 'off',}}
                            value={password}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setPassword(event.target.value)
                        }
                        />
                        <AuthButton
                            disabled={isLoading}
                            onClick={handleLogin}
                            variant="contained"
                        >
                            Войти
                        </AuthButton>
                        <AuthHint component="div">
                            Нет аккаунта?
                            <AuthHintButton component='span' onClick={() => navigate('/register')}>
                                Зарегистрироваться
                            </AuthHintButton>
                        </AuthHint>
                    </AuthBox>
                </Grid>
            </Grid>
        </>
    );
};

export default LoginPage;