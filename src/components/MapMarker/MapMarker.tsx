import React, { FC, useRef, useState } from 'react'
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { Icon, LatLng, popup } from 'leaflet'

export const MapMarker: FC = () => {
   const [marker, setMarker] = useState<LatLng | null>(null)

    const map = useMapEvents({
        click: (e) => {
            console.log(e.latlng)
            setMarker(e.latlng as LatLng)
        },
    });

    const customIcon = new Icon({
        iconUrl: require('../../shared/static/placeholder.png'),
        iconSize: [38, 38],
    })

    return (
        <>
            {marker &&
                <Marker position={marker} icon={customIcon}>
                    <Popup>You are here</Popup>
                </Marker>
            }
        </>
    );
};