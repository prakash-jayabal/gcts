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
import { HeroBannerProps } from '@/types/components';

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  primaryAction,
  secondaryAction,
  height = 'medium',
  overlay = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getHeight = () => {
    switch (height) {
      case 'small':
        return { xs: 300, sm: 400, md: 500 };
      case 'large':
        return { xs: 500, sm: 600, md: 700 };
      default:
        return { xs: 400, sm: 500, md: 600 };
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: getHeight(),
        display: 'flex',
        alignItems: 'center',
        backgroundImage: backgroundImage
          ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImage})`
          : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        '&::before': overlay
          ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1,
            }
          : {},
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ maxWidth: { xs: '100%', md: '66%' } }}>
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            gutterBottom
            fontWeight={700}
            sx={{
              color: 'common.white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          
          {subtitle && (
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              gutterBottom
              fontWeight={600}
              sx={{
                color: 'common.white',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                mb: 2,
              }}
            >
              {subtitle}
            </Typography>
          )}
          
          {description && (
            <Typography
              variant="body1"
              paragraph
              sx={{
                color: 'common.white',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              {description}
            </Typography>
          )}
          
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            {primaryAction && (
              <Button
                variant={primaryAction.variant || 'contained'}
                size="large"
                component={Link}
                href={primaryAction.href}
                sx={{
                  minWidth: { xs: '100%', sm: 'auto' },
                  py: 1.5,
                  px: 3,
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                {primaryAction.label}
              </Button>
            )}
            
            {secondaryAction && (
              <Button
                variant={secondaryAction.variant || 'outlined'}
                size="large"
                component={Link}
                href={secondaryAction.href}
                sx={{
                  minWidth: { xs: '100%', sm: 'auto' },
                  py: 1.5,
                  px: 3,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderColor: 'common.white',
                  color: 'common.white',
                  '&:hover': {
                    borderColor: 'common.white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {secondaryAction.label}
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroBanner;
