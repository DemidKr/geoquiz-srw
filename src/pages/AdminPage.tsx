import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as S from "./QuestionListPage/QuestionListPage.styled";
import {StyledTab, StyledTabs} from "../components/Tabs/Tabs.styled";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AdminPage = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
       <>
           <S.TitlesContainer>
               <S.MainTitle component="div">
                   панель
               </S.MainTitle>
               <S.SubTitle component="div">
                   администратора
               </S.SubTitle>
           </S.TitlesContainer>
           <Box sx={{ width: '100%' }}>
               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                   <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
                       <StyledTab label="Жалобы" {...a11yProps(0)} />
                       <StyledTab label="Пользователи" {...a11yProps(1)} />
                       <StyledTab label="Квизы" {...a11yProps(2)} />
                   </StyledTabs>
               </Box>
               <CustomTabPanel value={value} index={0}>
                   Жалобы
               </CustomTabPanel>
               <CustomTabPanel value={value} index={1}>
                   Пользователи
               </CustomTabPanel>
               <CustomTabPanel value={value} index={2}>
                   Квизы
               </CustomTabPanel>
           </Box>
       </>
    );
};

export default AdminPage;