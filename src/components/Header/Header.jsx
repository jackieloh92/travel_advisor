import React, { useContext } from 'react';
import { DataContext } from '../../App.js';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box, IconButton, Icon } from '@material-ui/core';
import { Brightness7, Brightness4 } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useLocation } from 'react-router-dom';

import useStyles from './styles.js';



const Header = ({ onPlaceChanged, onLoad }) => {
  const classes = useStyles();
  const currentLocation = useLocation();
  const userLocations = ['/home', '/favourites', '/profile']
  const otherRoutes = userLocations.filter((x) => x !== currentLocation.pathname)
  const routeLabel = (individualRoute) => {
    return individualRoute.slice(1)

  }
  const { theme, setTheme } = useContext(DataContext)


  const changeTheme = () => {
    setTheme(!theme)
    console.log(theme)
  }

  const themeMode = () => {
    if (theme) {
      return 'Dark Mode'
    } else {
      return 'Light Mode'
    }
  }

  return (
    <AppBar position="static">
      <Toolbar className={theme ? (classes.toolbar) : (classes.toolbardark)}>
        <Typography variant="h5" className={classes.title}>
          Tourist Trapp
        </Typography>
        <IconButton onClick={changeTheme}>
          {theme ? (<Brightness4 />) : (<Brightness7 />)}
        </IconButton>
        <Box display="flex">
          {otherRoutes.map((route) =>
          (<Typography variant="h6" className={classes.title}>
            <Link to={route} style={{ color: '#FFF' }}>
              {routeLabel(route)}
            </Link>
          </Typography>))
          }
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;