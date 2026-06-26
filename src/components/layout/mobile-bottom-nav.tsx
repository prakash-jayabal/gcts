'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
import {
  Home,
  Event,
  People,
  Photo,
  Message,
} from '@mui/icons-material';
import { MOBILE_NAV_ITEMS } from '@/constants';

const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home />;
      case 'Event':
        return <Event />;
      case 'People':
        return <People />;
      case 'Photo':
        return <Photo />;
      case 'Message':
        return <Message />;
      default:
        return <Home />;
    }
  };

  const getCurrentIndex = () => {
    const currentIndex = MOBILE_NAV_ITEMS.findIndex(item => item.href === pathname);
    return currentIndex >= 0 ? currentIndex : 0;
  };

  if (!isMobile) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <BottomNavigation
        value={getCurrentIndex()}
        sx={{
          backgroundColor: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '6px 12px',
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
        }}
      >
        {MOBILE_NAV_ITEMS.map((item) => (
          <BottomNavigationAction
            key={item.href}
            label={item.label}
            icon={getIcon(item.icon)}
            href={item.href}
            component="a"
            sx={{
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default MobileBottomNav;
