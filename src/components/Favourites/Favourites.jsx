import React, { useContext } from 'react';
import { DataContext } from '../../App';
import { CircularProgress, Grid } from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import Header from '../Header/Header';
import useStyles from './styles'


const Favourites = ({ isLoading }) => {
  const classes = useStyles();
  const { favourite } = useContext(DataContext);
  console.log(favourite)

  return (


    <div className={classes.container}>
      {isLoading ? (
        <div className="loading" height="600px" display="flex">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <Header />
          <Grid container spacing={3} className={classes.list} item xs={12} md={6}>
            {favourite?.map((place, i) => (
              <Grid key={i} item xs={12} md={12}>
                <PlaceDetails place={place} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  )
}

export default Favourites;