'use client';

import React from 'react';
import {
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { SectionTitleProps } from '@/types/components';

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'center',
  description,
  showDivider = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getAlignment = () => {
    switch (align) {
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      default:
        return 'center';
    }
  };

  return (
    <Box
      sx={{
        textAlign: align,
        mb: { xs: 4, md: 6 },
        px: { xs: 2, sm: 0 },
      }}
    >
      <Typography
        variant={isMobile ? 'h4' : 'h3'}
        component="h2"
        gutterBottom
        fontWeight={700}
        sx={{
          color: 'text.primary',
          fontSize: { xs: '1.75rem', md: '2.25rem' },
        }}
      >
        {title}
      </Typography>
      
      {subtitle && (
        <Typography
          variant="h6"
          color="primary.main"
          gutterBottom
          fontWeight={600}
          sx={{
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            mb: 2,
          }}
        >
          {subtitle}
        </Typography>
      )}
      
      {description && (
        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{
            maxWidth: align === 'center' ? { xs: '100%', md: '66%' } : '100%',
            mx: align === 'center' ? 'auto' : 0,
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.6,
            mb: 3,
          }}
        >
          {description}
        </Typography>
      )}
      
      {showDivider && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: getAlignment(),
            width: '100%',
          }}
        >
          <Divider
            sx={{
              width: { xs: 60, md: 80 },
              height: 4,
              backgroundColor: 'primary.main',
              borderRadius: 2,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default SectionTitle;
