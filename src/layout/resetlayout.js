// @mui
import { Typography, Stack } from '@mui/material';
// components
// import Image from '../image/Image';

//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

// ----------------------------------------------------------------------


export default function ResetLayout({ children, illustration, title }: Props): JSX.Element {
  return (
    <StyledRoot>
      {/* <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      /> */}

      <StyledSection>
        <Typography variant="h3" sx={{ mb: 30, maxWidth: 480, textAlign: 'center'}}>
          {title || 'Plase Fill Details'}
        </Typography>

            

         {/*   <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={illustration || '/assets/illustrations/illustration_dashboard.png'}
          sx={{ maxWidth: 720 }}
        />  */}

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
