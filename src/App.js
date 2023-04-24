import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes, BrowserRouter } from 'react-router-dom';
import Favourites from './components/Favourites/Favourites';
import Homepage from './components/Homepage/Homepage';
import Header from './components/Header/Header';

const Apple = () => {
    let element = useRoutes([
        { path: "/", element: <Homepage /> },
        { path: "/home", element: <Homepage /> },
        { path: "/other", element: <Favourites /> },
        { path: "favourites", element: <Favourites /> },
    ]);
    return element;
};
export const DataContext = createContext();

// do new state here, call it original data, call api data and save it here

const App = ({ place }) => {
    const [coords, setCoords] = useState({});
    const [autocomplete, setAutocomplete] = useState(null);
    const onLoad = (autoC) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoords({ lat, lng });
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoords({ lat: latitude, lng: longitude });
        });
    }, []);

    const [favourite, setFavourite] = useState([]);
    const [theme, setTheme] = useState(false);


    return (
        <>
            <BrowserRouter>
                <DataContext.Provider value={{ favourite, setFavourite, theme, setTheme }}>
                    <Apple />
                </DataContext.Provider>
            </BrowserRouter>
        </>
    );
};

export default App;
