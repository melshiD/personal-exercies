import classes from './Nav.module.css';
import { Fragment } from 'react';

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, useTheme } from '@mui/material/styles';

let colorTheme = createTheme({
    palette: {
      primary: {
        main: '#c62828',
      },
      secondary: {
        main: '#ffcdd2',
      }
    }
});

colorTheme = createTheme(colorTheme, {
    palette: {
        info: {
            main: colorTheme.palette.primary.main
        }
    }
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

// export default function SearchAppBar() {
const SearchAppBar = () => {
  return (
      <AppBar sx={{'background-color': '#990000'}} position="sticky">
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, marginLeft: '2rem' }}
          >
            Indiana University Bloomington 
          </Typography>
                    {/* <IconButton
            size="large"
            edge="start"
            // color = {theme.palette.common.red}
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
          </IconButton> */}
          <MenuIcon 
            sx={{ marginRight: '0.8125rem' }}
          />

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
  );
}


const Nav = (props) => {
    return(
        <Fragment>
        <SearchAppBar></SearchAppBar>
        {/* {props.children} */}
        </Fragment>

    )
};

export default Nav;