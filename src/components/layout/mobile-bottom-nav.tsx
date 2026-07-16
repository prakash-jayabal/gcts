'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
  const router = useRouter();
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

  // Derive current index from pathname instead of using state
  const currentIndex = React.useMemo(() => {
    const index = MOBILE_NAV_ITEMS.findIndex(item => item.href === pathname);
    return index >= 0 ? index : 0;
  }, [pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const selectedItem = MOBILE_NAV_ITEMS[newValue];
    if (selectedItem) {
      router.push(selectedItem.href);
    }
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
        value={currentIndex}
        onChange={handleChange}
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
        {MOBILE_NAV_ITEMS.map((item, index) => (
          <BottomNavigationAction
            key={item.href}
            label={item.label}
            icon={getIcon(item.icon)}
            value={index}
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
