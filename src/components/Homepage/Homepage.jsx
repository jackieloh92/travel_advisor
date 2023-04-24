import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../App.js';
import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData } from '../../api/index';
import Header from '../Header/Header';
import List from '../List/List';
import Map from '../Map/Map';


const Homepage = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating && Number(place.num_reviews) > review);

    setFilteredPlaces(filtered);
  }, [type, rating, review]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);


      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setRating('');
          setReview('');
          setIsLoading(false);
        });
    }
  }, [bounds, type]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoords({ lat, lng });
  }

  const { theme, setTheme } = useContext(DataContext)


  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={theme ? ({ width: '100%', backgroundColor: 'white' }) : ({ width: '100%', backgroundColor: 'gray' })}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            review={review}
            setReview={setReview}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}

          />
        </Grid>
      </Grid>

    </>
  );
};


export default Homepage