'use client';

import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Header from './header';
import Footer from './footer';
import MobileBottomNav from './mobile-bottom-nav';
import Breadcrumb from '@/components/common/breadcrumb';

interface AppLayoutProps {
  children: React.ReactNode;
  showBreadcrumb?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  showBreadcrumb = true 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          pt: 2,
          pb: isMobile ? 8 : 4, // Extra padding for mobile bottom nav
        }}
      >
        <Box sx={{ maxWidth: 'xl', mx: 'auto', px: { xs: 2, sm: 3 } }}>
          {showBreadcrumb && <Breadcrumb />}
          {children}
        </Box>
      </Box>
      <Footer />
      <MobileBottomNav />
    </Box>
  );
};

export default AppLayout;
