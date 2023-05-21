import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import {userSlice} from "../store/reducers/UserSlice";
import {Button, CssBaseline, TextField} from "@mui/material";
import Header from "../components/Header/Header";
import {useAction} from "../shared/hooks/useAction";
import {registration} from "../store/action-creators/auth";

const RegisterPage = () => {
    const {isLoading} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const addSnack = useAction()

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

        await dispatch(registration(username, password)).then(value => console.log(value))
            .then(() => addSnack('Успешная регистрация', 'success'))
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
            <Button disabled={isLoading} onClick={handleRegistration}>Зарегистирироваться</Button>
        </>
    );
};

export default RegisterPage;