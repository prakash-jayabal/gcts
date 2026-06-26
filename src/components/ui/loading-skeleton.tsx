'use client';

import React from 'react';
import {
  Box,
  Skeleton,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'table' | 'chart' | 'hero';
  count?: number;
}

export default function LoadingSkeleton({ variant = 'card', count = 1 }: LoadingSkeletonProps) {
  const renderCardSkeleton = () => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Skeleton variant="circular" width={48} height={48} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="40%" height={16} />
          </Box>
        </Box>
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton variant="text" width="80%" height={16} />
      </CardContent>
    </Card>
  );

  const renderListSkeleton = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
      <Skeleton variant="circular" width={40} height={40} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="50%" height={20} />
        <Skeleton variant="text" width="30%" height={14} />
      </Box>
      <Box sx={{ width: 100, height: 32, borderRadius: 2, backgroundColor: 'grey.300' }} />
    </Box>
  );

  const renderTableSkeleton = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}>
      <Skeleton variant="text" width="20%" height={20} />
      <Skeleton variant="text" width="25%" height={20} />
      <Skeleton variant="text" width="15%" height={20} />
      <Skeleton variant="text" width="20%" height={20} />
      <Skeleton variant="text" width="10%" height={20} />
      <Skeleton variant="text" width="10%" height={20} />
    </Box>
  );

  const renderChartSkeleton = () => (
    <Card>
      <CardContent>
        <Skeleton variant="text" width="40%" height={24} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={300} />
      </CardContent>
    </Card>
  );

  const renderHeroSkeleton = () => (
    <Box>
      <Skeleton variant="text" width="60%" height={48} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="80%" height={24} sx={{ mb: 3 }} />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ width: 120, height: 40, borderRadius: 2, backgroundColor: 'grey.300' }} />
        <Box sx={{ width: 120, height: 40, borderRadius: 2, backgroundColor: 'grey.300' }} />
      </Box>
    </Box>
  );

  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return renderCardSkeleton();
      case 'list':
        return renderListSkeleton();
      case 'table':
        return renderTableSkeleton();
      case 'chart':
        return renderChartSkeleton();
      case 'hero':
        return renderHeroSkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  return (
    <Box>
      {Array.from({ length: count }, (_, index) => (
        <Box key={index} sx={{ mb: variant === 'list' || variant === 'table' ? 0 : 2 }}>
          {renderSkeleton()}
        </Box>
      ))}
    </Box>
  );
}

// Loading spinner component
export function LoadingSpinner({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 56;
      default:
        return 40;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
      }}
    >
      <CircularProgress size={getSize()} />
    </Box>
  );
}

// Page loading component
export function PageLoading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <CircularProgress size={48} />
      <Typography variant="h6" color="text.secondary">
        Loading...
      </Typography>
    </Box>
  );
}

// Empty state component
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        textAlign: 'center',
        p: 4,
      }}
    >
      {icon && (
        <Box sx={{ mb: 2, color: 'action.active' }}>
          {icon}
        </Box>
      )}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        {description}
      </Typography>
      {action && <Box sx={{ mt: 2 }}>{action}</Box>}
    </Box>
  );
}
