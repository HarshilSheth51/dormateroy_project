// @mui
import { styled, alpha } from '@mui/material/styles';
// utils

import { bgGradient } from '../layout/cssStyles';
// import { hover } from '@testing-library/user-event/dist/hover';


// ----------------------------------------------------------------------

export const StyledRoot = styled('main')(() => ({
  height: '100%',
  display: 'flex',
  position: 'relative',
  
  
  
}));

export const StyledSection = styled('div')(({ theme }) => ({
  display: 'none',
  position: 'relative',
  backgroundColor:'black',
  color:'white',
  fontWeight:'bold',
  overflow :'hidden',
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    
    
    
    
    
  },
}));

export const StyledSectionBg = styled('div')(({ theme }) => ({
  // ...bgGradient({
  //   color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
  //   imgUrl: '/assets/background/overlay_2.jpg',
  // }),
  // top: 0,
  left: 0,
  zIndex: -1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  transform: 'scaleX(-1)',
  overflow :'hidden',

  
}));

export const StyledContent = styled('div')(({ theme }) => ({
  width: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  justifyContent: 'center',
  overflow :'hidden',
  backgroundColor:'whitesmoke',
  padding: theme.spacing(15, 2),
  [theme.breakpoints.up('md')]: {
    flexShrink: 0,
    padding: theme.spacing(16, 8, 0, 8),
    
    
  },
}));
