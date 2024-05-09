import React, { FC, useState } from "react";
import { Grid } from "@mui/material";
import { Panorama } from "@pbe/react-yandex-maps";
import { MapWrapper } from "../components/Map/Map.styled";
import CreateQuestionBox from "../components/CreateQuestionBox/CreateQuestionBox";
import { ICoordinates } from "../shared/types/coordinates";
import { DEFAULT_COORDINATES } from "../shared/consts";

const CreateQuestionPage: FC = () => {
  const [currentCoordinates, setCurrentCoordinates] =
    useState<ICoordinates>(DEFAULT_COORDINATES);

  return (
    <>
      <Grid container style={{ width: "100%" }}>
        <Grid item xs={12}>
          <MapWrapper>
            <Panorama
              point={[currentCoordinates.lat, currentCoordinates.lng]}
              style={{ width: "100%", height: `calc(100% - 80px)` }}
              defaultOptions={{
                direction: [-10, 0],
                controls: [],
                suppressMapOpenBlock: true,
                hotkeysEnabled: false,
              }}
            />
          </MapWrapper>
        </Grid>
      </Grid>
      <CreateQuestionBox
        currentCoordinates={currentCoordinates}
        setCurrentCoordinates={setCurrentCoordinates}
      />
    </>
  );
};

export default CreateQuestionPage;
