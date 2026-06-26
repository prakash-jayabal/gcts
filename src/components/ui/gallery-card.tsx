'use client';

import React from 'react';
import {
  Card,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import {
  ZoomIn,
  CalendarToday,
  Category,
} from '@mui/icons-material';
import { GalleryCardProps } from '@/types/components';

const GalleryCard: React.FC<GalleryCardProps> = ({
  title,
  imageUrl,
  category,
  date,
  description,
  showOverlay = true,
  aspectRatio = 'landscape',
}) => {
  const getAspectRatio = () => {
    switch (aspectRatio) {
      case 'square':
        return '1/1';
      case 'portrait':
        return '3/4';
      default:
        return '16/9';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
          '& .overlay': {
            opacity: 1,
          },
          '& .zoom-icon': {
            transform: 'scale(1.1)',
          },
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          paddingTop: getAspectRatio(),
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {showOverlay && (
          <Box
            className="overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
              opacity: 0.8,
              transition: 'opacity 0.3s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  fontWeight={600}
                  sx={{
                    color: 'common.white',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                    mb: 1,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                  }}
                >
                  {title}
                </Typography>
                
                {(category || date) && (
                  <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    {category && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Category sx={{ fontSize: 14, color: 'common.white' }} />
                        <Typography variant="caption" color="common.white">
                          {category}
                        </Typography>
                      </Box>
                    )}
                    {date && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarToday sx={{ fontSize: 14, color: 'common.white' }} />
                        <Typography variant="caption" color="common.white">
                          {formatDate(date)}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
                
                {description && (
                  <Typography
                    variant="caption"
                    color="common.white"
                    sx={{
                      opacity: 0.9,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {description}
                  </Typography>
                )}
              </Box>
              
              <IconButton
                className="zoom-icon"
                sx={{
                  color: 'common.white',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.7)',
                  },
                }}
              >
                <ZoomIn />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default GalleryCard;
