'use client';

import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  Dashboard,
  People,
  CardMembership,
  Event,
  AttachMoney,
  VolunteerActivism,
  PhotoLibrary,
  Announcement,
  Assessment,
  Email,
  Settings,
  ContentCopy,
  ChevronRight,
  Notifications,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface AdminNavigationProps {
  open: boolean;
  onClose: () => void;
  userName: string;
  userAvatar?: string;
  notifications?: number;
}

export default function AdminNavigation({
  open,
  onClose,
  userName,
  userAvatar,
  notifications = 0,
}: AdminNavigationProps) {
  const router = useRouter();

  const navigationSections = [
    {
      title: 'Dashboard',
      items: [
        {
          title: 'Overview',
          icon: <Dashboard />,
          href: '/admin/dashboard',
          badge: 0,
        },
      ],
    },
    {
      title: 'User Management',
      items: [
        {
          title: 'Users',
          icon: <People />,
          href: '/admin/users',
          badge: 0,
        },
        {
          title: 'Memberships',
          icon: <CardMembership />,
          href: '/admin/memberships',
          badge: 3,
        },
        {
          title: 'Volunteers',
          icon: <VolunteerActivism />,
          href: '/admin/volunteers',
          badge: 0,
        },
      ],
    },
    {
      title: 'Content Management',
      items: [
        {
          title: 'Events',
          icon: <Event />,
          href: '/admin/events',
          badge: 2,
        },
        {
          title: 'Announcements',
          icon: <Announcement />,
          href: '/admin/announcements',
          badge: 1,
        },
        {
          title: 'Media Library',
          icon: <PhotoLibrary />,
          href: '/admin/media',
          badge: 0,
        },
      ],
    },
    {
      title: 'Financial',
      items: [
        {
          title: 'Donations',
          icon: <AttachMoney />,
          href: '/admin/donations',
          badge: 0,
        },
        {
          title: 'Reports',
          icon: <Assessment />,
          href: '/admin/reports',
          badge: 0,
        },
        {
          title: 'Analytics',
          icon: <Assessment />,
          href: '/admin/analytics',
          badge: 0,
        },
      ],
    },
    {
      title: 'Communication',
      items: [
        {
          title: 'Email Campaigns',
          icon: <Email />,
          href: '/admin/email-campaigns',
          badge: 0,
        },
      ],
    },
    {
      title: 'System',
      items: [
        {
          title: 'Content Management',
          icon: <ContentCopy />,
          href: '/admin/content',
          badge: 0,
        },
        {
          title: 'Settings',
          icon: <Settings />,
          href: '/admin/settings',
          badge: 0,
        },
      ],
    },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
    onClose();
  };

  const getTotalBadges = () => {
    return navigationSections.reduce((total, section) => 
      total + section.items.reduce((sectionTotal, item) => sectionTotal + item.badge, 0), 0
    );
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 320,
          boxSizing: 'border-box',
          backgroundColor: 'grey.50',
        },
      }}
    >
      {/* Admin Profile */}
      <Box sx={{ 
        p: 3, 
        backgroundColor: 'primary.main', 
        color: 'white',
        borderBottom: 1,
        borderColor: 'primary.dark',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={userAvatar}
            sx={{ 
              width: 48, 
              height: 48, 
              border: '2px solid rgba(255, 255, 255, 0.3)',
              backgroundColor: 'primary.light',
            }}
          >
            {userName.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem' }}>
              {userName}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Administrator
            </Typography>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <Badge 
              badgeContent={getTotalBadges()} 
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.6rem',
                  height: 16,
                  minWidth: 16,
                },
              }}
            >
              <Notifications sx={{ fontSize: 24 }} />
            </Badge>
          </Box>
        </Box>
      </Box>

      {/* Navigation Sections */}
      <Box sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
        {navigationSections.map((section, sectionIndex) => (
          <Box key={sectionIndex}>
            <Box sx={{ px: 3, py: 1 }}>
              <Typography 
                variant="overline" 
                color="text.secondary" 
                fontWeight={600}
                sx={{ fontSize: '0.75rem', textTransform: 'uppercase' }}
              >
                {section.title}
              </Typography>
            </Box>
            <List dense sx={{ py: 0 }}>
              {section.items.map((item, itemIndex) => (
                <ListItem key={itemIndex} disablePadding sx={{ px: 1 }}>
                  <Tooltip title={item.badge > 0 ? `${item.badge} pending items` : ''} arrow>
                    <ListItemButton
                      onClick={() => handleNavigation(item.href)}
                      sx={{
                        borderRadius: 2,
                        mx: 1,
                        mb: 0.5,
                        '&:hover': {
                          backgroundColor: 'primary.50',
                          '& .MuiListItemIcon-root': {
                            color: 'primary.main',
                          },
                          '& .MuiListItemText-primary': {
                            color: 'primary.main',
                            fontWeight: 600,
                          },
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'primary.100',
                          borderLeft: 3,
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ 
                        minWidth: 40,
                        color: 'text.secondary',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Badge 
                          badgeContent={item.badge} 
                          color="error"
                          invisible={item.badge === 0}
                          sx={{
                            '& .MuiBadge-badge': {
                              fontSize: '0.6rem',
                              height: 14,
                              minWidth: 14,
                              right: -8,
                              top: -8,
                            },
                          }}
                        >
                          {item.icon}
                        </Badge>
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{
                          fontSize: '0.875rem',
                          fontWeight: 500,
                        }}
                      />
                      <ChevronRight 
                        sx={{ 
                          fontSize: 16, 
                          color: 'action.active',
                          opacity: 0.5,
                        }} 
                      />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
            {sectionIndex < navigationSections.length - 1 && (
              <Divider sx={{ mx: 2, my: 1 }} />
            )}
          </Box>
        ))}
      </Box>

      {/* Quick Actions */}
      <Box sx={{ 
        p: 2, 
        borderTop: 1, 
        borderColor: 'divider',
        backgroundColor: 'grey.100',
      }}>
        <Typography 
          variant="overline" 
          color="text.secondary" 
          fontWeight={600}
          sx={{ 
            display: 'block', 
            mb: 1,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
          }}
        >
          Quick Actions
        </Typography>
        <List dense sx={{ py: 0 }}>
          <ListItem disablePadding sx={{ px: 1 }}>
            <ListItemButton
              onClick={() => handleNavigation('/')}
              sx={{
                borderRadius: 2,
                mx: 1,
                '&:hover': {
                  backgroundColor: 'primary.50',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                <Dashboard fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="View Main Site"
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ 
        p: 2, 
        borderTop: 1, 
        borderColor: 'divider',
        textAlign: 'center',
        backgroundColor: 'grey.100',
      }}>
        <Typography variant="caption" color="text.secondary">
          Cincinnati Tamil Sangam Admin
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          v1.0.0
        </Typography>
      </Box>
    </Drawer>
  );
}
