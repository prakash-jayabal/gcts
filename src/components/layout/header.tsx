'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Divider,
} from '@mui/material';
import {
  Menu,
  Brightness4,
  Brightness7,
  Close,
  VolunteerActivism,
  Login,
} from '@mui/icons-material';
import { NAVIGATION_ITEMS } from '@/constants';
import { useTheme as useCustomTheme } from '@/theme/theme-provider';

const Header: React.FC = () => {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const { mode, toggleTheme } = useCustomTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box sx={{ width: 280, height: '100%' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            component="img"
            src="/images/gcts-logo.png"
            alt="Greater Cincinnati Tamil Sangam"
            onError={(e) => {
              // Fallback to text if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
            sx={{
              width: '40px !important',
              height: '40px !important',
              borderRadius: '50% !important',
              objectFit: 'cover !important',
              minWidth: '40px !important',
              minHeight: '40px !important',
            }}
          />
          <Box
            sx={{
              width: '40px !important',
              height: '40px !important',
              borderRadius: '50% !important',
              backgroundColor: 'primary.main !important',
              display: 'none !important', // Hidden by default, shown on image error
              alignItems: 'center !important',
              justifyContent: 'center !important',
              color: 'primary.contrastText !important',
              fontSize: '1.1rem !important',
              fontWeight: '600 !important',
              minWidth: '40px !important',
              minHeight: '40px !important',
            }}
          >
            GCTS
          </Box>
          <Typography variant="h6" component="div">
            Cincinnati Tamil Sangam
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ px: 1 }}>
        {NAVIGATION_ITEMS.map((item) => (
          <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: pathname === item.href ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<VolunteerActivism />}
          sx={{ mb: 1 }}
          component={Link}
          href="/donate"
          onClick={handleDrawerToggle}
        >
          Donate
        </Button>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Login />}
          component={Link}
          href="/login"
          onClick={handleDrawerToggle}
        >
          Login
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                component="img"
                src="/images/gcts-logo.png"
                alt="Greater Cincinnati Tamil Sangam"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
                sx={{
                  width: '50px !important',
                  height: '50px !important',
                  borderRadius: '50% !important',
                  objectFit: 'cover !important',
                  minWidth: '50px !important',
                  minHeight: '50px !important',
                }}
              />
              <Box
                sx={{
                  width: '50px !important',
                  height: '50px !important',
                  borderRadius: '50% !important',
                  backgroundColor: 'primary.main !important',
                  display: 'none !important', // Hidden by default, shown on image error
                  alignItems: 'center !important',
                  justifyContent: 'center !important',
                  color: 'primary.contrastText !important',
                  fontSize: '1.4rem !important',
                  fontWeight: '600 !important',
                  minWidth: '50px !important',
                  minHeight: '50px !important',
                }}
              >
                GCTS
              </Box>
              Cincinnati Tamil Sangam
            </Typography>
          </Box>

          {isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton color="inherit" onClick={toggleTheme}>
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
              >
                <Menu />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {NAVIGATION_ITEMS.slice(0, -2).map((item) => (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    color="inherit"
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: pathname === item.href ? 600 : 400,
                      backgroundColor: pathname === item.href ? 'primary.main' : 'transparent',
                      color: pathname === item.href ? 'primary.contrastText' : 'inherit',
                      '&:hover': {
                        backgroundColor: pathname === item.href ? 'primary.dark' : 'action.hover',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <Button
                variant="contained"
                startIcon={<VolunteerActivism />}
                component={Link}
                href="/donate"
                sx={{ borderRadius: 2 }}
              >
                Donate
              </Button>
              <Button
                variant="outlined"
                startIcon={<Login />}
                component={Link}
                href="/login"
                sx={{ borderRadius: 2 }}
              >
                Login
              </Button>
              <IconButton color="inherit" onClick={toggleTheme}>
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
