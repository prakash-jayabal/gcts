'use client';

import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn,
  AccessTime,
  Star,
} from '@mui/icons-material';
import { EventCardProps } from '@/types/components';

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  date,
  time,
  location,
  imageUrl,
  category,
  price,
  isFeatured = false,
  showActions = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cultural':
        return 'primary';
      case 'educational':
        return 'secondary';
      case 'religious':
        return 'success';
      case 'social':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        ...(isFeatured && {
          border: 2,
          borderColor: 'primary.main',
        }),
      }}
    >
      {isFeatured && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 1,
          }}
        >
          <Chip
            icon={<Star sx={{ fontSize: 16 }} />}
            label="Featured"
            color="primary"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>
      )}

      {imageUrl ? (
        <Box
          sx={{
            height: 200,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '12px 12px 0 0',
          }}
        />
      ) : (
        <Box
          sx={{
            height: 200,
            backgroundColor: 'action.hover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px 12px 0 0',
          }}
        >
          <EventIcon sx={{ fontSize: 48, color: 'action.disabled' }} />
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {category && (
          <Chip
            label={category}
            color={getCategoryColor(category) as 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default'}
            size="small"
            sx={{ mb: 2, textTransform: 'capitalize' }}
          />
        )}

        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          fontWeight={600}
          sx={{
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5,
          }}
        >
          {description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTime sx={{ fontSize: 16, mr: 1, color: 'action.active' }} />
            <Typography variant="body2" color="text.secondary">
              {formatDate(date)} at {time}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOn sx={{ fontSize: 16, mr: 1, color: 'action.active' }} />
            <Typography variant="body2" color="text.secondary">
              {location}
            </Typography>
          </Box>
        </Box>

        {price !== undefined && (
          <Box sx={{ textAlign: 'right', mt: 2 }}>
            <Typography
              variant="h6"
              color="primary.main"
              fontWeight={700}
            >
              {price === 0 ? 'Free' : `$${price}`}
            </Typography>
          </Box>
        )}
      </CardContent>

      {showActions && (
        <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
          <Button
            variant="outlined"
            component={Link}
            href={`/events/${id}`}
            size={isMobile ? 'small' : 'medium'}
            sx={{ borderRadius: 2 }}
          >
            Learn More
          </Button>
          {price !== undefined && price > 0 && (
            <Button
              variant="contained"
              component={Link}
              href={`/events/${id}/register`}
              size={isMobile ? 'small' : 'medium'}
              sx={{ borderRadius: 2 }}
            >
              Register
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default EventCard;
