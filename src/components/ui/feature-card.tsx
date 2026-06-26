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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { FeatureCardProps } from '@/types/components';

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  image,
  action,
  variant = 'default',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getCardStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          border: 2,
          borderColor: 'primary.main',
          backgroundColor: 'transparent',
        };
      case 'elevated':
        return {
          boxShadow: 4,
          backgroundColor: 'background.paper',
        };
      default:
        return {
          boxShadow: 1,
          backgroundColor: 'background.paper',
        };
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
          boxShadow: variant === 'elevated' ? 8 : 4,
        },
        ...getCardStyles(),
      }}
    >
      {image && (
        <Box
          sx={{
            height: 200,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: variant === 'default' ? '12px 12px 0 0' : '12px',
          }}
        />
      )}
      
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box
          sx={{
            fontSize: { xs: '2.5rem', md: '3rem' },
            mb: 2,
            color: 'primary.main',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon}
        </Box>
        
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          fontWeight={600}
          sx={{
            textAlign: 'center',
            fontSize: { xs: '1.1rem', md: '1.25rem' },
          }}
        >
          {title}
        </Typography>
        
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textAlign: 'center',
            lineHeight: 1.6,
            mb: 2,
          }}
        >
          {description}
        </Typography>
      </CardContent>
      
      {action && (
        <CardActions sx={{ justifyContent: 'center', p: 2, pt: 0 }}>
          <Button
            variant="outlined"
            component={Link}
            href={action.href}
            size={isMobile ? 'small' : 'medium'}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            {action.label}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default FeatureCard;
