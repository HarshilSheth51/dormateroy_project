// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';

import AuthLoginForm from '../section/loginform';
// import AuthRegisterForm from '../section/regiform';
// hooks
import { Link as RouterLink } from 'react-router-dom'; // Renamed import to avoid conflict
// layouts
 import LoginLayout from '../layout/loginlayout';

//





// ----------------------------------------------------------------------

export default function Login() {
//   const { method } = useAuthContext();

  return (
    
    <LoginLayout>
      <Stack spacing={1.5} sx={{ mb: 3, position:'relative' }}>
        <Typography variant="h4" sx={{fontWeight : '100'}}>Sign in to</Typography>
        <Typography variant="h4" sx={{fontWeight : 'bold'}}>Dormitory Discovery</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2" sx={{fontSize:"18px"}}>New user? </Typography>

          {/* <Link variant="subtitle2" sx={{}}>Create an account</Link> */}
          <RouterLink to="/register">
          <a href={""} className='accout-sty'
          >Create an account</a>
          </RouterLink>
        </Stack>
      </Stack>

      {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert> */}
      <AuthLoginForm/>
      {/* <AuthRegisterForm/> */}
    </LoginLayout>

    
    
      
    
  );
}
