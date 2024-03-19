import React from 'react';
import { Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { Card } from '@mui/material';
import { Grid } from '@mui/material';



export default function ProductList() {

  
  return (

    <Stack
      sx={{
        rowGap: '15px',
        alignItems: 'center',
        width: '100%',
        ' @media(max-width:991px)': { width: '100%', padding: '0px 5px' },
        ' @media(max-width:479px)': { width: '100%', padding: '0px 5px' },
      }}
      spacing="0px">

       
      <Stack
        sx={{
          fontFamily: 'sans-serif,system-ui',
          alignItems: 'flex-start',
          width: '100%',
        }}
        spacing="10px">
        <Typography variant="h2" sx={{textAlign:'center' , alignItems:'center' , paddingLeft:'47%'}}>Popular</Typography>
        <Typography
          variant="p"
          sx={{ fontSize: '20px', color: 'white' , paddingLeft:'20%' }}>
          Simplify things and integrate payroll with the most commonly used
          software. Connect to your operations platform to keep your team
          running smoothly.
        </Typography>
      </Stack>
      <Grid
        container
        sx={{
          fontFamily: 'sans-serif,system-ui',
          gridTemplateColumns: 'repeat(auto-fill,minmax(360px,1fr))',
          gap: '20px',
          ' @media(max-width:479px)': {
            gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
          },
        }}>
        <Card
          sx={{
            fontFamily: 'sans-serif,system-ui',
            backgroundColor: 'inherit',
            border: '1px solid rgb(247, 252, 252)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            columnGap: '1rem',
            width: '100%',
            borderRadius: '10px',
            // marginLeft:'30%',
            // marginRight:'25%',
          }}>
            
          <img
          className='img-book'
          
            src="https://objectstorage.me-dubai-1.oraclecloud.com/n/axwzijd5v1vn/b/DSL_IMAGES/o/IMAGE/44cb278f-9ce1-4d88-b4da-e622bfdaeff9-615af9c9fb4aa90ef13fb045_5c2d282d11197c0301fc00f2_generic-blog-header.png"
            // style={{ objectFit: 'contain' }}
            height="60%"
            width="50%"
          />
          <Stack sx={{ alignItems: 'flex-start', width: '100%' }} spacing="5px">
            <Typography variant="p" sx={{  color: 'rgb(10, 128, 128)', fontSize: '30px' }}>
              Breezy HR
            </Typography>
            <Typography
              variant="p"
              sx={{  color: 'rgb(10, 128, 128)', fontSize: '25px' , paddingLeft:'10%' }}>
              purecode is a uniquely modern hiring solution that helps you
              attract, interview, the best talent.
            </Typography>
            <Typography
              variant="p"
              sx={{
                color: 'rgb(10, 128, 128)',
                fontSize: '20px',
                fontWeight: '600',
              }}>
              Get 25% off Startup, Growth or Business Plans
            </Typography>
          </Stack>
        </Card>
        <Card
          sx={{
            backgroundColor: 'inherit',
            border: '1px solid rgb(247, 252, 252)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            columnGap: '1rem',
            width: '100%',
            borderRadius: '4px',
          }}>
          <img
            src="https://objectstorage.me-dubai-1.oraclecloud.com/n/axwzijd5v1vn/b/DSL_IMAGES/o/IMAGE/ef3251a9-6f67-4203-8647-a7bbe1112290-salesforce.png"
            style={{ objectFit: 'contain' }}
            height="80px"
            width="70px"
          />
          <Stack sx={{ alignItems: 'flex-start', width: '100%' }} spacing="0px">
            <Typography variant="p" sx={{ color: '#0d2036', fontSize: '15px' }}>
              Salesforce
            </Typography>
            <Typography
              variant="p"
              sx={{ color: 'rgb(108, 108, 114)', fontSize: '14px' }}>
              Salesforce is the world’s #1 customer relationship management
              (CRM) platform
            </Typography>
          </Stack>
        </Card>
        <Card
          sx={{
            backgroundColor: 'inherit',
            border: '1px solid rgb(247, 252, 252)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            columnGap: '1rem',
            width: '100%',
            borderRadius: '4px',
          }}>
          <img
            src="https://objectstorage.me-dubai-1.oraclecloud.com/n/axwzijd5v1vn/b/DSL_IMAGES/o/IMAGE/bb674ff3-4c77-4cd1-ae3a-c4c15cfbae64-Zhbxv1nv_400x400.png"
            height="80px"
            width="70px"
          />
          <Stack sx={{ alignItems: 'flex-start', width: '100%' }} spacing="0px">
            <Typography variant="p" sx={{ color: '#0d2036', fontSize: '15px' }}>
              LastPass
            </Typography>
            <Typography
              variant="p"
              sx={{ color: 'rgb(108, 108, 114)', fontSize: '14px' }}>
              LastPass is a password manager that empowers users to generate,
              secure, and share credentials to keep your business protected from
              security threats.
            </Typography>
          </Stack>
        </Card>
        <Card
          sx={{
            backgroundColor: 'inherit',
            border: '1px solid rgb(247, 252, 252)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            columnGap: '1rem',
            width: '100%',
            borderRadius: '4px',
          }}>
          <img
            src="https://objectstorage.me-dubai-1.oraclecloud.com/n/axwzijd5v1vn/b/DSL_IMAGES/o/IMAGE/5fc55b16-5b67-4ef9-acb0-08dbe28d3282-images (1).png"
            height="80px"
            width="70px"
          />
          <Stack sx={{ alignItems: 'flex-start', width: '100%' }} spacing="0px">
            <Typography variant="p" sx={{ color: '#0d2036', fontSize: '15px' }}>
              Google Workspace
            </Typography>
            <Typography
              variant="p"
              sx={{ color: 'rgb(108, 108, 114)', fontSize: '14px' }}>
              Google Workspace plans provide a custom email for your business
              and includes collaboration tools like Gmail, Calendar, Drive,
              Sheets, and more.
            </Typography>
          </Stack>
        </Card>
        <Card
          sx={{
            backgroundColor: 'inherit',
            border: '1px solid rgb(247, 252, 252)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            columnGap: '1rem',
            width: '100%',
            borderRadius: '4px',
          }}>
          <img
            src="https://objectstorage.me-dubai-1.oraclecloud.com/n/axwzijd5v1vn/b/DSL_IMAGES/o/IMAGE/2243ba86-c0bd-498a-8fca-0711d5b76b0c-logo-ms-social.png"
            height="70px"
            width="70px"
          />
          <Stack sx={{ alignItems: 'flex-start', width: '100%' }} spacing="5px">
            <Typography variant="p" sx={{ color: '#0d2036', fontSize: '15px' }}>
              Microsoft 365
            </Typography>
            <Typography
              variant="p"
              sx={{ color: 'rgb(108, 108, 114)', fontSize: '14px' }}>
              Microsoft 365 is an integrated solution including Teams, OneDrive
              cloud storage, and Office apps with advanced security options.
            </Typography>
            <Typography
              variant="p"
              sx={{
                color: 'rgb(10, 128, 128)',
                fontSize: '14px',
                fontWeight: '600',
              }}>
              Get 10% off Microsoft Business Standard
            </Typography>
          </Stack>
        </Card>
        <Card
          sx={{
            backgroundColor: 'inherit',
            border: '1px solid rgb(247, 252, 252)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            columnGap: '1rem',
            width: '100%',
            borderRadius: '4px',
          }}>
          <img
            src="https://objectstorage.me-dubai-1.oraclecloud.com/n/axwzijd5v1vn/b/DSL_IMAGES/o/IMAGE/b57a5901-7388-4500-b205-c7bcfab1e8cd-png-transparent-zoom-zoom-logo-3d-zoom-logo-video-meeting-application-meeting-app-meeting-application-3d-icon-thumbnail.png"
            height="80px"
            width="70px"
          />
          <Stack sx={{ alignItems: 'flex-start', width: '100%' }} spacing="0px">
            <Typography variant="p" sx={{ color: '#0d2036', fontSize: '15px' }}>
              Zoom
            </Typography>
            <Typography
              variant="p"
              sx={{ color: 'rgb(108, 108, 114)', fontSize: '14px' }}>
              Zoom provides video, telephone, and online chat services through a
              cloud-based peer-to-peer software platform.
            </Typography>
          </Stack>
        </Card>
        <Card
          sx={{
            backgroundColor: 'inherit',
            border: '1px solid rgb(247, 252, 252)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            columnGap: '1rem',
            width: '100%',
            borderRadius: '4px',
          }}>
          <img
            src="https://objectstorage.me-dubai-1.oraclecloud.com/n/axwzijd5v1vn/b/DSL_IMAGES/o/IMAGE/851c584b-0433-4ce9-9713-d8765f741715-unnamed.jpg"
            height="80px"
            width="70px"
          />
          <Stack sx={{ alignItems: 'flex-start', width: '100%' }} spacing="5px">
            <Typography variant="p" sx={{ color: '#0d2036', fontSize: '15px' }}>
              Slack
            </Typography>
            <Typography
              variant="p"
              sx={{ color: 'rgb(108, 108, 114)', fontSize: '14px' }}>
              With Slack, people can work together more effectively, connect all
              their software tools and services, and find the information they
              need to do their best work.
            </Typography>
            <Typography
              variant="p"
              sx={{
                color: 'rgb(10, 128, 128)',
                fontSize: '14px',
                fontWeight: '600',
              }}>
              Get 25% off monthly or annual Business+ plan
            </Typography>
          </Stack>
        </Card>
        <Card
          sx={{
            backgroundColor: 'inherit',
            border: '1px solid rgb(247, 252, 252)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            columnGap: '1rem',
            width: '100%',
            borderRadius: '4px',
          }}>
          <img
            src="https://objectstorage.me-dubai-1.oraclecloud.com/n/axwzijd5v1vn/b/DSL_IMAGES/o/IMAGE/94ddad6d-bda0-46c9-b696-a8652135796f-RezFaa-U_400x400.jpg"
            height="80px"
            width="70px"
          />
          <Stack sx={{ alignItems: 'flex-start', width: '100%' }} spacing="0px">
            <Typography variant="p" sx={{ color: '#0d2036', fontSize: '15px' }}>
              Asana
            </Typography>
            <Typography
              variant="p"
              sx={{ color: 'rgb(108, 108, 114)', fontSize: '14px' }}>
              Asana is a web and mobile application designed to help teams
              organize, track, and manage their work.
            </Typography>
          </Stack>
        </Card>
      </Grid>
    </Stack>
  );
}
