'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { EmptyStateProps } from '@/types/components';

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  variant = 'default',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          py: 4,
          textAlign: 'center' as const,
        };
      case 'fullscreen':
        return {
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center' as const,
        };
      default:
        return {
          py: 8,
          textAlign: 'center' as const,
        };
    }
  };

  return (
    <Box sx={getVariantStyles()}>
      <Container maxWidth="sm">
        {icon && (
          <Box
            sx={{
              fontSize: { xs: '4rem', md: '6rem' },
              color: 'action.disabled',
              mb: 3,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        )}
        
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          component="h2"
          gutterBottom
          fontWeight={600}
          sx={{ color: 'text.primary' }}
        >
          {title}
        </Typography>
        
        {description && (
          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{ mb: 4, lineHeight: 1.6 }}
          >
            {description}
          </Typography>
        )}
        
        {action && (
          <Button
            variant="contained"
            onClick={action.onClick}
            size={isMobile ? 'medium' : 'large'}
            sx={{ borderRadius: 2 }}
          >
            {action.label}
          </Button>
        )}
      </Container>
    </Box>
  );
};

export default EmptyState;
