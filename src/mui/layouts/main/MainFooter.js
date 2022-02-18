import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import { Link as ScrollLink } from 'react-scroll';
// next
import Link from 'next/link';

// material
import { styled } from '@mui/material/styles';
import {
  Grid,
  Link as MuiLink,
  Stack,
  Divider,
  Container,
  Typography,
  IconButton,
} from '@mui/material';
//
import Logo from 'src/mui/components/Logo';

// ----------------------------------------------------------------------

const SOCIALS = [
  { name: 'FaceBook', icon: facebookFill },
  { name: 'Google', icon: googleFill },
  { name: 'Linkedin', icon: linkedinFill },
  { name: 'Twitter', icon: twitterFill },
];

const LINKS = [
  {
    headline: 'Car X',
    children: [
      { name: 'About', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'FAQs', href: '#' },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
  },
  {
    headline: 'Contact',
    children: [
      { name: 'sean@senpex.com', href: '#' },
      { name: '3566 Stevens Creek Blvd, San Jose, CA 95117', href: '#' },
    ],
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Divider />
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={12} sx={{ mb: 3 }}>
            <ScrollLink to="move_top" spy smooth>
              <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
            </ScrollLink>
          </Grid>
          <Grid item xs={8} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              Welcome to CarX©
            </Typography>
            <Typography variant="body2" sx={{ pr: { md: 5 } }} />

            <Stack
              spacing={1.5}
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
            >
              {SOCIALS.map((social) => (
                <IconButton key={social.name} color="primary" sx={{ p: 1 }}>
                  <Icon icon={social.icon} width={16} height={16} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
            >
              {LINKS.map((list) => {
                const { headline, children } = list;
                return (
                  <Stack key={headline} spacing={2}>
                    <Typography component="p" variant="overline">
                      {headline}
                    </Typography>
                    {children.map((mylink) => (
                      <Link
                        style={{ textDecoration: 'none' }}
                        key={mylink.name}
                        href={mylink.href}
                      >
                        <MuiLink
                          color="inherit"
                          variant="body2"
                          // sx={{ display: 'block' }}
                          sx={{
                            // color: theme => alpha(theme.primary.grey[900], 0.72),
                            color: (theme) => theme.palette.primary.main,
                            typography: 'body2',
                            py: 1,
                            px: 2.5,
                          }}
                        >
                          {mylink.name}
                        </MuiLink>
                      </Link>
                    ))}
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          component="p"
          variant="body2"
          sx={{
            mt: 10,
            pb: 5,
            fontSize: 13,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          © 2021. All rights reserved
        </Typography>
      </Container>
    </RootStyle>
  );
}
