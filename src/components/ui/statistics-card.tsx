'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { StatisticsCardProps } from '@/types/components';

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  value,
  label,
  icon,
  color = 'primary',
  trend,
}) => {
  const theme = useTheme();

  const getColor = () => {
    return theme.palette[color]?.main || theme.palette.primary.main;
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend.direction === 'up' ? (
      <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
    ) : (
      <TrendingDown sx={{ color: 'error.main', fontSize: 16 }} />
    );
  };

  const getTrendColor = () => {
    if (!trend) return 'text.secondary';
    return trend.direction === 'up' ? 'success.main' : 'error.main';
  };

  return (
    <Card
      sx={{
        height: '100%',
        textAlign: 'center',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ py: 3 }}>
        <Box
          sx={{
            fontSize: { xs: '2.5rem', md: '3rem' },
            mb: 1,
            color: getColor(),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon}
        </Box>
        
        <Typography
          variant="h3"
          component="div"
          fontWeight={700}
          sx={{
            color: 'text.primary',
            fontSize: { xs: '2rem', md: '2.5rem' },
            mb: 1,
          }}
        >
          {value}
        </Typography>
        
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 1, fontWeight: 500 }}
        >
          {label}
        </Typography>
        
        {trend && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
            }}
          >
            {getTrendIcon()}
            <Typography
              variant="body2"
              sx={{ color: getTrendColor(), fontWeight: 600 }}
            >
              {trend.value}%
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
