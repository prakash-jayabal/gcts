'use client';

import React from 'react';
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { SponsorCarouselProps } from '@/types/components';

const SponsorCarousel: React.FC<SponsorCarouselProps> = ({
  sponsors,
  title = "Our Sponsors",
  autoplay = false,
  showArrows = false,
  showDots = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getTierStyles = (tier?: string) => {
    switch (tier) {
      case 'platinum':
        return {
          height: 80,
          filter: 'grayscale(0%)',
          opacity: 1,
        };
      case 'gold':
        return {
          height: 60,
          filter: 'grayscale(20%)',
          opacity: 0.9,
        };
      case 'silver':
        return {
          height: 50,
          filter: 'grayscale(40%)',
          opacity: 0.8,
        };
      case 'bronze':
        return {
          height: 40,
          filter: 'grayscale(60%)',
          opacity: 0.7,
        };
      default:
        return {
          height: 50,
          filter: 'grayscale(50%)',
          opacity: 0.8,
        };
    }
  };

  return (
    <Box sx={{ py: 6, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          gutterBottom
          fontWeight={600}
          sx={{ mb: 4 }}
        >
          {title}
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: { xs: 3, md: 4 },
          }}
        >
          {sponsors.map((sponsor) => (
            <Box
              key={sponsor.id}
              component={sponsor.url ? 'a' : 'div'}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s, filter 0.3s',
                cursor: sponsor.url ? 'pointer' : 'default',
                '&:hover': {
                  transform: 'scale(1.05)',
                  filter: 'grayscale(0%)',
                  opacity: 1,
                },
                ...getTierStyles(sponsor.tier),
              }}
            >
              <Box
                component="img"
                src={sponsor.logo}
                alt={sponsor.name}
                sx={{
                  height: '100%',
                  width: 'auto',
                  maxWidth: { xs: 120, md: 160 },
                  objectFit: 'contain',
                }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default SponsorCarousel;
