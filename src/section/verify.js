// @mui
import { Alert, Tooltip, Stack, Typography, Box } from '@mui/material';

import AuthVerifyCodeForm from '../section/verifyform';
// hooks

// layouts
import ResetLayout from '../layout/resetlayout';


export default function Reset() {
  return (
    <ResetLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4" sx={{fontWeight : '100'}}>Reset Password</Typography>
        <Typography variant="h4" sx={{fontWeight : 'bold'}}> Please Verify Code</Typography>
        <Stack direction="row" spacing={0.5}>
          {/* <Typography variant="body2" sx={{fontSize:"18px"}}>New user? </Typography> */}
        </Stack>
      </Stack>
      <AuthVerifyCodeForm/>
    </ResetLayout>
  );
}
