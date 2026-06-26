'use client';

import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Skeleton,
  LinearProgress,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { LoadingStateProps } from '@/types/components';

const LoadingState: React.FC<LoadingStateProps> = ({
  message,
  variant = 'default',
  size = 'medium',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getSize = () => {
    switch (size) {
      case 'small':
        return { spinner: 24, skeleton: 32, fontSize: '0.875rem' };
      case 'large':
        return { spinner: 64, skeleton: 56, fontSize: '1.25rem' };
      default:
        return { spinner: 40, skeleton: 40, fontSize: '1rem' };
    }
  };

  const sizeConfig = getSize();

  switch (variant) {
    case 'skeleton':
      return (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Skeleton variant="text" height={sizeConfig.skeleton} />
            <Skeleton variant="text" height={sizeConfig.skeleton} width="80%" />
            <Skeleton variant="rectangular" height={sizeConfig.skeleton * 2} />
            <Skeleton variant="text" height={sizeConfig.skeleton} width="60%" />
          </Box>
        </Box>
      );

    case 'spinner':
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            py: 4,
          }}
        >
          <CircularProgress size={sizeConfig.spinner} />
          {message && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: sizeConfig.fontSize }}
            >
              {message}
            </Typography>
          )}
        </Box>
      );

    case 'progress':
      return (
        <Box sx={{ width: '100%', py: 2 }}>
          <LinearProgress />
          {message && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, fontSize: sizeConfig.fontSize }}
            >
              {message}
            </Typography>
          )}
        </Box>
      );

    default:
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
          }}
        >
          <CircularProgress size={sizeConfig.spinner} />
          {message && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2, fontSize: sizeConfig.fontSize }}
            >
              {message}
            </Typography>
          )}
        </Box>
      );
  }
};

export default LoadingState;
