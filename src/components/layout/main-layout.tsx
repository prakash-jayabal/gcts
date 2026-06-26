'use client';

import React from 'react';
import { Box } from '@mui/material';
import Header from './header';
import Footer from './footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, pt: 2, pb: 4 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
