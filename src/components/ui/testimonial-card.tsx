'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Rating,
} from '@mui/material';
import { FormatQuote, LocationOn } from '@mui/icons-material';
import { TestimonialCardProps } from '@/types/components';

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  rating = 5,
  avatar,
  location,
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'primary.main',
            opacity: 0.2,
          }}
        >
          <FormatQuote sx={{ fontSize: 48 }} />
        </Box>

        <Rating
          value={rating}
          readOnly
          precision={0.5}
          size="small"
          sx={{ mb: 2 }}
        />

        <Typography
          variant="body1"
          paragraph
          sx={{
            mb: 3,
            fontStyle: 'italic',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          &ldquo;{content}&rdquo;
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={avatar}
            sx={{
              width: 48,
              height: 48,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              fontWeight: 600,
            }}
          >
            {name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="div"
              fontWeight={600}
              sx={{ fontSize: '1rem' }}
            >
              {name}
            </Typography>
            
            {role && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                {role}
              </Typography>
            )}
            
            {location && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocationOn sx={{ fontSize: 14, color: 'action.active' }} />
                <Typography variant="caption" color="text.secondary">
                  {location}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
