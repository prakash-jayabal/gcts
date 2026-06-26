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
  Chip,
} from '@mui/material';
import {
  Dashboard,
  Person,
  FamilyRestroom,
  Event,
  AttachMoney,
  CreditCard,
  VolunteerActivism,
  AccessTime,
  EmojiEvents,
  School,
  TrendingUp,
  ChevronRight,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface PortalNavigationProps {
  open: boolean;
  onClose: () => void;
  userRole: 'member' | 'volunteer';
  userName: string;
  userAvatar?: string;
}

export default function PortalNavigation({
  open,
  onClose,
  userRole,
  userName,
  userAvatar,
}: PortalNavigationProps) {
  const router = useRouter();

  const memberSections = [
    {
      title: 'Member Portal',
      items: [
        {
          title: 'Dashboard',
          icon: <Dashboard />,
          href: '/member/dashboard',
        },
        {
          title: 'Membership Status',
          icon: <CreditCard />,
          href: '/member/membership-status',
        },
        {
          title: 'Family Members',
          icon: <FamilyRestroom />,
          href: '/member/family-members',
        },
        {
          title: 'Event Registrations',
          icon: <Event />,
          href: '/member/event-registrations',
        },
        {
          title: 'Donation History',
          icon: <AttachMoney />,
          href: '/member/donation-history',
        },
        {
          title: 'Digital Card',
          icon: <CreditCard />,
          href: '/member/digital-card',
        },
      ],
    },
  ];

  const volunteerSections = [
    {
      title: 'Volunteer Portal',
      items: [
        {
          title: 'Dashboard',
          icon: <Dashboard />,
          href: '/volunteer/dashboard',
        },
        {
          title: 'Opportunities',
          icon: <VolunteerActivism />,
          href: '/volunteer/opportunities',
        },
        {
          title: 'Hours',
          icon: <AccessTime />,
          href: '/volunteer/hours',
        },
        {
          title: 'Recognition',
          icon: <EmojiEvents />,
          href: '/volunteer/recognition',
        },
        {
          title: 'Certificates',
          icon: <School />,
          href: '/volunteer/certificates',
        },
        {
          title: 'Leaderboard',
          icon: <TrendingUp />,
          href: '/volunteer/leaderboard',
        },
      ],
    },
  ];

  const sections = userRole === 'member' ? memberSections : volunteerSections;

  const handleNavigation = (href: string) => {
    router.push(href);
    onClose();
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
        },
      }}
    >
      {/* User Profile */}
      <Box sx={{ p: 3, backgroundColor: 'primary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar
            src={userAvatar}
            sx={{ width: 48, height: 48, border: '2px solid rgba(255, 255, 255, 0.3)' }}
          >
            {userName.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {userName}
            </Typography>
            <Chip
              label={userRole === 'member' ? 'Member' : 'Volunteer'}
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Navigation Sections */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {sections.map((section, sectionIndex) => (
          <Box key={sectionIndex}>
            <Box sx={{ p: 2, backgroundColor: 'grey.50' }}>
              <Typography variant="overline" color="text.secondary" fontWeight={600}>
                {section.title}
              </Typography>
            </Box>
            <List dense>
              {section.items.map((item, itemIndex) => (
                <ListItem key={itemIndex} disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(item.href)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'primary.50',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: 'primary.main' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        fontWeight: 500,
                      }}
                    />
                    <ChevronRight sx={{ color: 'action.active' }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            {sectionIndex < sections.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>

      {/* Quick Actions */}
      <Box sx={{ p: 2, backgroundColor: 'grey.50', borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="overline" color="text.secondary" fontWeight={600} sx={{ display: 'block', mb: 1 }}>
          Quick Actions
        </Typography>
        <List dense>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation('/')}
              sx={{
                '&:hover': {
                  backgroundColor: 'primary.50',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'primary.main' }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText
                primary="Back to Main Site"
                primaryTypographyProps={{
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation('/login')}
              sx={{
                '&:hover': {
                  backgroundColor: 'primary.50',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'primary.main' }}>
                <Person />
              </ListItemIcon>
              <ListItemText
                primary="Switch Account"
                primaryTypographyProps={{
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
