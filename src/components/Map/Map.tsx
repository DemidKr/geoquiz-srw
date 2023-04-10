import React, {FC} from 'react';
import {CustomMap, MapWrapper} from "./styles";
import {TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'


const Map: FC = () => {

    return (
        <MapWrapper>
            <CustomMap
                center={[51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
            </CustomMap>
        </MapWrapper>
    );
};

export default Map;