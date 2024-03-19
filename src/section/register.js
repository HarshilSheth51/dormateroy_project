// @mui
import { Alert, Tooltip, Stack, Typography, Box } from '@mui/material';
import AuthRegisterForm from '../section/regiform';
// hooks

// layouts
import RegisterLayout from '../layout/regilayout';


export default function Login() {
  return (
    <RegisterLayout>
      <Stack spacing={0.5} sx={{ mb: 1.5, position: 'relative' }}>
        <Typography variant="h4" sx={{fontWeight : '100'}}>Register To</Typography>
        <Typography variant="h4" sx={{fontWeight : 'bold'}}>Dormitory Discovery</Typography>
        <Stack direction="row" spacing={0.5}>
          {/* <Typography variant="body2" sx={{fontSize:"18px"}}>New user? </Typography> */}
        </Stack>
      </Stack>
      <AuthRegisterForm/>
    </RegisterLayout>
  );
}
