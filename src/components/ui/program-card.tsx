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
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  School,
  Schedule,
  Person,
  Timer,
} from '@mui/icons-material';
import { ProgramCardProps } from '@/types/components';

const ProgramCard: React.FC<ProgramCardProps> = ({
  id,
  title,
  description,
  ageGroup,
  schedule,
  instructor,
  imageUrl,
  price,
  duration,
  level = 'beginner',
  showActions = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'Beginner';
      case 'intermediate':
        return 'Intermediate';
      case 'advanced':
        return 'Advanced';
      default:
        return level;
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
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
          <School sx={{ fontSize: 48, color: 'action.disabled' }} />
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Chip
            label={getLevelLabel(level)}
            color={getLevelColor(level) as 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default'}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
          {price !== undefined && (
            <Typography
              variant="h6"
              color="primary.main"
              fontWeight={700}
            >
              {price === 0 ? 'Free' : `$${price}`}
            </Typography>
          )}
        </Box>

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
          {ageGroup && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Person sx={{ fontSize: 16, mr: 1, color: 'action.active' }} />
              <Typography variant="body2" color="text.secondary">
                Ages {ageGroup}
              </Typography>
            </Box>
          )}
          {schedule && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Schedule sx={{ fontSize: 16, mr: 1, color: 'action.active' }} />
              <Typography variant="body2" color="text.secondary">
                {schedule}
              </Typography>
            </Box>
          )}
          {duration && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Timer sx={{ fontSize: 16, mr: 1, color: 'action.active' }} />
              <Typography variant="body2" color="text.secondary">
                {duration}
              </Typography>
            </Box>
          )}
          {instructor && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ width: 20, height: 20, mr: 1, fontSize: 12 }}>
                {instructor.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <Typography variant="body2" color="text.secondary">
                {instructor}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>

      {showActions && (
        <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
          <Button
            variant="outlined"
            component={Link}
            href={`/programs/${id}`}
            size={isMobile ? 'small' : 'medium'}
            sx={{ borderRadius: 2 }}
          >
            Learn More
          </Button>
          <Button
            variant="contained"
            component={Link}
            href={`/programs/${id}/enroll`}
            size={isMobile ? 'small' : 'medium'}
            sx={{ borderRadius: 2 }}
          >
            Enroll Now
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ProgramCard;
