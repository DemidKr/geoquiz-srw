import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import {userSlice} from "../store/reducers/UserSlice";
import {Button, CssBaseline, Grid, TextField, Typography} from "@mui/material";
import Header from "../components/Header/Header";
import {useAction} from "../shared/hooks/useAction";
import {registration} from "../store/action-creators/auth";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const {isLoading} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const addSnack = useAction()
    const navigate = useNavigate()

    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')

    const handleRegistration = async () => {
        if (!username || !password) {
            addSnack('Заполните все поля', 'error')
            return;
        }


        if (password.length < 8) {
            addSnack('Пароль должен содержать не менее 8 символов', 'error')
            return;
        }

        await dispatch(registration(username, password)).then(value => {
            if (value.message) {
                addSnack('Неверный логин или пароль', 'error')
            }
            if (value.data) {
                addSnack('Успешная регистрация', 'success')
            }
            if (!value.message && !value.data) {
                addSnack('Unknown error', 'error')
            }
        })
    }

    return (
        <>
            <CssBaseline/>
            <Header/>
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
                        Регистрация
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
                        onClick={handleRegistration}
                        sx={{backgroundColor: '#F36C41', color: 'white', minWidth: '200px',
                            '&.MuiButton-root:hover':{
                                backgroundColor: '#e04819'
                            },
                        }}
                    >
                        Зарегистирироваться
                    </Button>
                </Grid>
                <Grid item xs={3} margin='6px'>
                    <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                    >
                        Уже есть аккаунт?
                        <Button
                            disabled={isLoading}
                            onClick={() => navigate('/login')}
                            sx={{marginLeft: '3px'}}
                        >
                            Войти
                        </Button>
                    </Typography>
                </Grid>
            </Grid>

        </>
    );
};

export default RegisterPage;