import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import {userSlice} from "../store/reducers/UserSlice";
import {Button, CssBaseline, TextField} from "@mui/material";
import Header from "../components/Header/Header";
import {addSnack} from "../store/action-creators/snackbar";
import {useAction} from "../shared/hooks/useAction";
import {login, registration} from "../store/action-creators/auth";

const LoginPage = () => {
    const {isLoading} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const addSnack = useAction()

    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')

    const handleLogin = async () => {
        if (!username || !password) {
            addSnack('Заполните все поля', 'error')
            return;
        }

        await dispatch(login(username, password))
            .then((res) => {
                console.log(res)
                addSnack('Успешный вход', 'success')
            })

    }

    return (
        <>
            <CssBaseline/>
            <Header/>
            <TextField
                id="outlined-password-input"
                label="Username"
                value={username}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(event.target.value)
                }
            />
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                }
            />
            <Button disabled={isLoading} onClick={handleLogin}>Зарегистирироваться</Button>
        </>
    );
};

export default LoginPage;