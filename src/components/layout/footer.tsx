'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Divider,
  Button,
  Stack,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  YouTube,
  Email,
  VolunteerActivism,
} from '@mui/icons-material';
import { SOCIAL_LINKS, APP_NAME } from '@/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook':
        return <Facebook />;
      case 'Instagram':
        return <Instagram />;
      case 'YouTube':
        return <YouTube />;
      case 'Email':
        return <Email />;
      default:
        return <Email />;
    }
  };

  const footerLinks = {
    'About CTS': [
      { label: 'Our Mission', href: '/about/mission' },
      { label: 'History', href: '/about/history' },
      { label: 'Board Members', href: '/about/board' },
      { label: 'Partners', href: '/about/partners' },
    ],
    'Programs': [
      { label: 'Events', href: '/events' },
      { label: 'Youth Programs', href: '/youth-programs' },
      { label: 'Cultural Classes', href: '/classes' },
      { label: 'Volunteer', href: '/volunteer' },
    ],
    'Resources': [
      { label: 'Gallery', href: '/gallery' },
      { label: 'News & Updates', href: '/news' },
      { label: 'Membership', href: '/membership' },
      { label: 'Contact', href: '/contact' },
    ],
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        py: { xs: 4, md: 6 },
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box>
              <Typography variant="h6" gutterBottom fontWeight={700}>
                {APP_NAME}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Celebrating Tamil culture and heritage in Cincinnati since 2010.
                Join us in preserving our rich traditions and building a strong
                community.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {SOCIAL_LINKS.map((link) => (
                  <IconButton
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    size="small"
                    sx={{
                      backgroundColor: 'action.hover',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                      },
                    }}
                  >
                    {getSocialIcon(link.platform)}
                  </IconButton>
                ))}
              </Box>
              <Button
                variant="contained"
                startIcon={<VolunteerActivism />}
                component={Link}
                href="/donate"
                sx={{ borderRadius: 2 }}
              >
                Support Our Mission
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={3}>
              {Object.entries(footerLinks).map(([category, links]) => (
                <Grid size={{ xs: 6, md: 4 }} key={category}>
                  <Box>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {category}
                    </Typography>
                    <Stack spacing={1}>
                      {links.map((link) => (
                        <Link key={link.href} href={link.href} passHref legacyBehavior>
                          <Typography
                            component="a"
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              textDecoration: 'none',
                              transition: 'color 0.2s',
                              '&:hover': {
                                color: 'primary.main',
                              },
                            }}
                          >
                            {link.label}
                          </Typography>
                        </Link>
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="text.secondary">
              © {currentYear} {APP_NAME}. All rights reserved.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Link href="/privacy" passHref legacyBehavior>
                <Typography
                  component="a"
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Privacy Policy
                </Typography>
              </Link>
              <Link href="/terms" passHref legacyBehavior>
                <Typography
                  component="a"
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Terms of Service
                </Typography>
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Made with ❤️ by the Cincinnati Tamil community
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
