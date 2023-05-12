import {MapContainer} from "react-leaflet";
import {styled} from "@mui/material";


export const MapWrapper = styled('div')(({theme}) => ({
    height: '100%',
    width: '100%',
    padding: 0,
    position: 'fixed'
}))

export const CustomMap = styled(MapContainer)(({theme}) => ({
    height: '100%',
    width: '100%',
    position: 'relative'
}))

export const YandexMapContainer = styled('div')(({theme}) => ({
    height: '100%',
    width: '100%',
    position: 'relative'
}))