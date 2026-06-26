'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  AccessTime,
  Star,
  EmojiEvents,
  Schedule,
  TrendingUp,
  VolunteerActivism,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import { mockVolunteerData } from '@/data/portal-mock';

export default function VolunteerDashboard() {
  const { profile, volunteerHours, recognition, opportunities } = mockVolunteerData;

  const currentMonthHours = volunteerHours
    .filter(hours => new Date(hours.date).getMonth() === new Date().getMonth())
    .reduce((sum, hours) => sum + hours.hours, 0);

  const upcomingOpportunities = opportunities.filter(opp => opp.status === 'available').slice(0, 3);
  const recentHours = volunteerHours.slice(0, 3);

  const getLevelProgress = () => {
    const nextLevelHours = 200; // Next level at 200 hours
    return (profile.totalHours / nextLevelHours) * 100;
  };

  const getVolunteerLevel = () => {
    if (profile.totalHours >= 200) return 'Gold';
    if (profile.totalHours >= 100) return 'Silver';
    if (profile.totalHours >= 50) return 'Bronze';
    return 'New Volunteer';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Gold':
        return 'warning';
      case 'Silver':
        return 'secondary';
      case 'Bronze':
        return 'info';
      default:
        return 'primary';
    }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Volunteer Dashboard"
        subtitle={`Welcome back, ${profile.firstName}!`}
        actions={[
          {
            label: 'View Opportunities',
            href: '/volunteer/opportunities',
            variant: 'contained',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Welcome Card */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <Card sx={{ p: 3, mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Avatar
                  src={profile.avatar}
                  sx={{ width: 80, height: 80 }}
                >
                  {profile.firstName[0]}{profile.lastName[0]}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" gutterBottom fontWeight={600}>
                    {profile.firstName} {profile.lastName}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Volunteer since {new Date(profile.volunteerSince).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip
                      label={getVolunteerLevel()}
                      color={getLevelColor(getVolunteerLevel()) as 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'error' | 'default'}
                      size="small"
                    />
                    <Chip
                      label={profile.currentStatus.charAt(0).toUpperCase() + profile.currentStatus.slice(1)}
                      color="success"
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Volunteer Level Progress
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile.totalHours} / 200 hours
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={getLevelProgress()}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <CardContent>
                <AccessTime sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" color="primary.main" fontWeight={700}>
                  {profile.totalHours}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Hours
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <CardContent>
                <Schedule sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" color="primary.main" fontWeight={700}>
                  {currentMonthHours}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This Month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <CardContent>
                <EmojiEvents sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" color="primary.main" fontWeight={700}>
                  {recognition.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Awards
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <CardContent>
                <VolunteerActivism sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" color="primary.main" fontWeight={700}>
                  {upcomingOpportunities.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Available Roles
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Skills and Interests */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionTitle
              title="Your Skills"
              subtitle="Areas of expertise"
              align="left"
              showDivider={false}
            />
            <Card sx={{ p: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profile.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      color="primary"
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <SectionTitle
              title="Interests"
              subtitle="Areas you want to help"
              align="left"
              showDivider={false}
            />
            <Card sx={{ p: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profile.interests.map((interest) => (
                    <Chip
                      key={interest}
                      label={interest}
                      color="secondary"
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Upcoming Opportunities */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionTitle
              title="Upcoming Opportunities"
              subtitle="New volunteer roles available"
              align="left"
              showDivider={false}
            />
            {upcomingOpportunities.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {upcomingOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} sx={{ p: 2 }}>
                    <CardContent sx={{ p: 0 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6" fontWeight={600}>
                          {opportunity.title}
                        </Typography>
                        <Chip
                          label={opportunity.urgency}
                          color={opportunity.urgency === 'high' ? 'error' : opportunity.urgency === 'medium' ? 'warning' : 'default'}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {opportunity.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Schedule sx={{ fontSize: 16, color: 'action.active' }} />
                        <Typography variant="body2" color="text.secondary">
                          {opportunity.timeCommitment}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <VolunteerActivism sx={{ fontSize: 16, color: 'action.active' }} />
                        <Typography variant="body2" color="text.secondary">
                          {opportunity.category}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No new opportunities available
                </Typography>
                <Button variant="contained" href="/volunteer/opportunities" sx={{ mt: 2 }}>
                  Browse All Opportunities
                </Button>
              </Card>
            )}
          </Grid>

          {/* Recent Hours */}
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionTitle
              title="Recent Hours"
              subtitle="Your latest volunteer activities"
              align="left"
              showDivider={false}
            />
            {recentHours.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentHours.map((hours) => (
                  <Card key={hours.id} sx={{ p: 2 }}>
                    <CardContent sx={{ p: 0 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" fontWeight={600}>
                          {hours.opportunity}
                        </Typography>
                        <Typography variant="h6" color="primary.main">
                          {hours.hours}h
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {hours.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(hours.date).toLocaleDateString()}
                        </Typography>
                        {hours.verified && (
                          <Chip
                            label="Verified"
                            color="success"
                            size="small"
                          />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No volunteer hours recorded yet
                </Typography>
                <Button variant="contained" href="/volunteer/opportunities" sx={{ mt: 2 }}>
                  Find Opportunities
                </Button>
              </Card>
            )}
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Box sx={{ mt: 6 }}>
          <SectionTitle
            title="Quick Actions"
            subtitle="Manage Your Volunteer Activities"
            align="center"
            showDivider={true}
          />
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                href="/volunteer/opportunities"
                sx={{ p: 2, flexDirection: 'column', height: '100%' }}
              >
                <VolunteerActivism sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="body2">Browse Opportunities</Typography>
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                href="/volunteer/hours"
                sx={{ p: 2, flexDirection: 'column', height: '100%' }}
              >
                <AccessTime sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="body2">Log Hours</Typography>
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                href="/volunteer/recognition"
                sx={{ p: 2, flexDirection: 'column', height: '100%' }}
              >
                <Star sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="body2">Recognition</Typography>
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                href="/volunteer/leaderboard"
                sx={{ p: 2, flexDirection: 'column', height: '100%' }}
              >
                <TrendingUp sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="body2">Leaderboard</Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AppLayout>
  );
}
