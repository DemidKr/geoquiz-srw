import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import {Button, CssBaseline, Grid, TextField, Typography} from "@mui/material";
import LegacyHeader from "../components/LegacyHeader/LegacyHeader";
import {useAction} from "../shared/hooks/useAction";
import {login} from "../store/action-creators/auth";
import {useNavigate} from "react-router-dom";

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
            <CssBaseline/>
            <LegacyHeader/>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: `calc(100vh - 69px)` }}
            >
                <Grid item xs={3} margin='6px'>
                    <Typography
                        gutterBottom
                        variant="h3"
                        component="div"
                        sx={{color: '#F36C41'}}
                    >
                        Логин
                    </Typography>
                </Grid>
                <Grid item xs={3} margin='6px'>
                    <TextField
                        id="outlined-password-input"
                        label="Username"
                        inputProps={{
                            autoComplete: 'off',
                        }}
                        value={username}
                        sx={{minWidth: '500px'}}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setUsername(event.target.value)
                        }
                    />
                </Grid>
                <Grid item xs={3} margin='6px'>
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        inputProps={{
                            autoComplete: 'off',
                        }}
                        value={password}
                        sx={{minWidth: '500px'}}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(event.target.value)
                        }
                    />
                </Grid>
                <Grid item xs={3} margin='6px'>
                    <Button
                        disabled={isLoading}
                        onClick={handleLogin}
                        sx={{backgroundColor: '#F36C41', color: 'white', minWidth: '200px',
                            '&.MuiButton-root:hover':{
                                backgroundColor: '#e04819'
                            },
                        }}
                    >
                        Войти
                    </Button>
                </Grid>
                <Grid item xs={3} margin='6px'>
                    <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                    >
                        Нет аккаунта?
                        <Button
                            disabled={isLoading}
                            onClick={() => navigate('/register')}
                            sx={{marginLeft: '3px'}}
                        >
                            Зарегистрироваться
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default LoginPage;