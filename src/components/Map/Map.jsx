import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography } from '@material-ui/core';
import { DataContext } from '../../App.js';
import Rating from '@material-ui/lab/Rating';
import mapStylesDark from '../../mapStylesDark';
import mapStyles from '../../mapStyles';
import useStyles from './styles.js';

const Map = ({ coords, places, setCoords, setBounds, setChildClicked }) => {
  const classes = useStyles();
  const { theme, setTheme } = useContext(DataContext)

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={theme ? ({ disableDefaultUI: true, zoomControl: true, styles: mapStyles }) : ({ disableDefaultUI: true, zoomControl: true, styles: mapStylesDark })}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places.length && places.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >

            <Paper elevation={3} className={classes.paper}>
              <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
              <img
                className={classes.pointer}
                src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
              />
              <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
            </Paper>

          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;