import React, {FC} from 'react';
import {Grid} from "@mui/material";
import {Panorama} from "@pbe/react-yandex-maps";
import {useAppSelector} from "../shared/hooks/redux";
import {MapWrapper} from "../components/Map/Map.styled";
import CreateQuestionBox from "../components/CreateQuestionBox/CreateQuestionBox";


const CreateQuestionPage: FC = () => {
    const {coordinates} = useAppSelector(state => state.coordinates)

    return (
        <>
            <Grid container style={{width: '100%'}}>
                <Grid item xs={12}>
                    <MapWrapper>
                        <Panorama point={coordinates} style={{ width: '100%', height: `calc(100% - 80px)` }}
                                  defaultOptions={{
                                      direction: [-10, 0],
                                      controls: [],
                                      suppressMapOpenBlock: true,
                                      hotkeysEnabled: false
                                  }}
                        />
                    </MapWrapper>
                </Grid>
            </Grid>
            <CreateQuestionBox/>
        </>
    );
};

export default CreateQuestionPage;