import React, {FC, useState} from 'react';
import {Button, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, TextField} from "@mui/material";
import {FormWrapper} from "./styles";

const CreateQuestionBox: FC = () => {
    const [type, setType] = useState<number>(1)

    return (
        <FormWrapper>
            <Grid container direction='column' alignItems='center' sx={{padding: '15px'}}>
                <FormControl fullWidth variant='standard'>
                    <InputLabel id='demo-simple-select-label'>Тип викторины</InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={type.toString()}
                        label='Тип викторины'
                    >
                        <MenuItem value={1}>Угадай из списка</MenuItem>
                        <MenuItem value={2}>Угадай локацию</MenuItem>
                        <MenuItem value={3}>Угадай название</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    required
                    sx={{ marginTop: '15px' }}
                    fullWidth
                    id="outlined-required"
                    label="Название точки"
                    defaultValue=""
                />
                <Grid item xs={2} sx={{ marginTop: ' 15px' }}>
                    <Button>Сохранить и продолжить</Button>
                </Grid>
                <Grid item xs={3} sx={{ marginTop: '15px' }}>
                    <Pagination count={15} color='primary' />
                </Grid>
                <Grid item xs={2} sx={{ marginTop: ' 15px'}}>
                    <Button >Завершить создание викторины</Button>
                </Grid>
            </Grid>
        </FormWrapper>
    );
};

export default CreateQuestionBox;