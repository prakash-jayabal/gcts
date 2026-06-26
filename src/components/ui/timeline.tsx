'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { TimelineProps, TimelineItem as TimelineItemType } from '@/types/components';

const Timeline: React.FC<TimelineProps> = ({
  items,
  variant = 'vertical',
  showDates = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getItemColor = (type?: string) => {
    switch (type) {
      case 'milestone':
        return 'primary.main';
      case 'event':
        return 'secondary.main';
      case 'announcement':
        return 'success.main';
      default:
        return 'info.main';
    }
  };

  if (variant === 'horizontal') {
    return (
      <Box sx={{ overflowX: 'auto', py: 4 }}>
        <Box sx={{ display: 'flex', gap: 4, minWidth: 'max-content' }}>
          {items.map((item, index) => (
            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: getItemColor(item.type),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'common.white',
                  fontSize: '1.2rem',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </Box>
              <Card sx={{ minWidth: 200, maxWidth: 300 }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                    {item.title}
                  </Typography>
                  {showDates && (
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                      {new Date(item.date).toLocaleDateString()}
                    </Typography>
                  )}
                  {item.description && (
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  )}
                </CardContent>
              </Card>
              {index < items.length - 1 && (
                <Box
                  sx={{
                    width: 40,
                    height: 2,
                    backgroundColor: 'divider',
                    flexShrink: 0,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      {items.map((item, index) => (
        <Box key={item.id} sx={{ display: 'flex', mb: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 3 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: getItemColor(item.type),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
                fontSize: '1.5rem',
                zIndex: 1,
                position: 'relative',
              }}
            >
              {item.icon}
            </Box>
            {index < items.length - 1 && (
              <Box
                sx={{
                  width: 2,
                  height: 60,
                  backgroundColor: 'divider',
                  mt: 1,
                }}
              />
            )}
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Card
              sx={{
                backgroundColor: 'background.paper',
                border: 1,
                borderColor: 'divider',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateX(4px)',
                  boxShadow: 2,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                  {item.title}
                </Typography>
                
                {showDates && (
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                )}
                
                {item.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {item.description}
                  </Typography>
                )}
                
                {item.imageUrl && (
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.title}
                    sx={{
                      width: '100%',
                      height: 150,
                      objectFit: 'cover',
                      borderRadius: 1,
                      mt: 2,
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Timeline;
