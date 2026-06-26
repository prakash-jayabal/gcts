'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Breadcrumb from '@/components/common/breadcrumb';
import { PageHeaderProps } from '@/types/components';

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumb = true,
  actions = [],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        py: { xs: 3, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        {breadcrumb && <Breadcrumb />}
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1, textAlign: { xs: 'left', md: 'center' } }}>
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              component="h1"
              gutterBottom
              fontWeight={700}
              sx={{ color: 'text.primary' }}
            >
              {title}
            </Typography>
            
            {subtitle && (
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  maxWidth: { xs: '100%', md: '66%' },
                  mx: { xs: 0, md: 'auto' },
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          
          {actions.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                justifyContent: { xs: 'flex-start', md: 'flex-end' },
              }}
            >
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'contained'}
                  component={Link}
                  href={action.href}
                  startIcon={action.icon}
                  size={isMobile ? 'medium' : 'large'}
                  sx={{
                    minWidth: { xs: '100%', sm: 'auto' },
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default PageHeader;
