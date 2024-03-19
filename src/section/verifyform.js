import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, FormHelperText , TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import RHFTextField from '../hook-form/RHFTextField';
import { Link } from 'react-router-dom';


// components

import FormProvider from '../hook-form/FormProvider';



// ----------------------------------------------------------------------


export default function AuthVerifyCodeForm() {
  
  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
    code6: Yup.string().required('Code is required'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };

  // const methods = useForm({
  //   mode: 'onChange',
  //   resolver: yupResolver(VerifyCodeSchema),
  //   defaultValues,
  // });

  // const {
  //   handleSubmit,
  //   formState: { isSubmitting, errors },
  // } = methods;

  const onSubmit = async () => {
    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   console.log('DATA', Object.values().join(''));

    

    
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
   <>
      <TextField 
      id="outlined-basic" 
      label="Enter Verification code" 
      variant="outlined" 
      name='password'
      />
      <Link to="/newpass">
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
            padding:'15px',
          borderRadius : '10px',
          marginTop:'50px'
          
          }}
      >
        Verify
      </LoadingButton>
      </Link>
      </>
  );
}
