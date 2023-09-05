import React from 'react';
import {Avatar, Box, Button, CssBaseline, Grid, Paper, Typography} from "@mui/material";
import Header from "../components/Header/Header";
import {useAppSelector} from "../shared/hooks/redux";

const ProfilePage = () => {
    const { username} = useAppSelector(state => state.user)

    return (
        <>
            <CssBaseline/>
            <Header themeSwitcherOn={true} small={true}/>
            <Paper
                sx={{
                    margin: 'auto',
                    maxWidth: 900,
                    borderRadius: '16px',
                }}
            >
                <Box sx={{
                    display: 'flex',
                    padding: '22px',
                    width: '100%',

                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px'}}>
                            <Avatar sx={{width: '150px', height: '150px'}} src="/broken-image.jpg" />
                            <Button>Загрузить фото</Button>
                        </Grid>
                        <Grid item xs={9} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '15px'}}>
                            <Typography variant="h4" component="div">
                                Пользователь: {username}
                            </Typography>
                            <Typography variant="h4" component="div">
                                Пароль: ******** <Button>Сменить пароль</Button>
                            </Typography>
                            <Typography variant="h6" component="div">
                                Создан: 21/07/2023
                            </Typography>
                            <Typography variant="h6" component="div">
                                Количество созданых квизов: 7
                            </Typography>
                            <Typography variant="h6" component="div">
                                Количество пройденных квизов: 127
                            </Typography>
                            <Button variant="contained" color="error">Удалить аккаунт</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </>
    );
};

export default ProfilePage;