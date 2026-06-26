'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumbs,
  Typography,
  Link as MuiLink,
  Box,
} from '@mui/material';
import { Home } from '@mui/icons-material';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    if (pathname === '/') {
      return [];
    }

    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
    ];

    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({ label, href: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: 2 }}>
      <Box>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator="/"
          sx={{
            '& .MuiBreadcrumbs-separator': {
              mx: 1,
            },
          }}
        >
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            if (isLast) {
              return (
                <Typography
                  key={item.href}
                  color="primary.main"
                  fontWeight={600}
                >
                  {item.label}
                </Typography>
              );
            }

            return (
              <MuiLink
                key={item.href}
                component={Link}
                href={item.href}
                underline="hover"
                color="text.secondary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  transition: 'color 0.2s',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {index === 0 && <Home sx={{ fontSize: 16 }} />}
                {item.label}
              </MuiLink>
            );
          })}
        </Breadcrumbs>
      </Box>
    </Box>
  );
};

export default Breadcrumb;
