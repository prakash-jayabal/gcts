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
  Person,
  CalendarToday,
  AttachMoney,
  Event,
  FamilyRestroom,
  CreditCard,
  TrendingUp,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import { mockMemberData } from '@/data/portal-mock';

export default function MemberDashboard() {
  const { profile, familyMembers, eventRegistrations, donationHistory } = mockMemberData;

  const upcomingEvents = eventRegistrations.filter(reg => 
    new Date(reg.eventDate) >= new Date()
  ).slice(0, 3);

  const recentDonations = donationHistory.slice(0, 3);

  const membershipProgress = () => {
    const renewalDate = new Date(profile.renewalDate);
    const currentDate = new Date();
    const totalDays = 365;
    const daysElapsed = Math.floor((currentDate.getTime() - new Date(profile.memberSince).getTime()) / (1000 * 60 * 60 * 24)) % totalDays;
    return (daysElapsed / totalDays) * 100;
  };

  return (
    <AppLayout>
      <PageHeader
        title="Member Dashboard"
        subtitle={`Welcome back, ${profile.firstName}!`}
        actions={[
          {
            label: 'View Profile',
            href: '/member/profile',
            variant: 'outlined',
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
                  <Typography variant="body1" color="text.secondary">
                    Member since {new Date(profile.memberSince).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Chip
                      label={profile.membershipType.charAt(0).toUpperCase() + profile.membershipType.slice(1)}
                      color="primary"
                      size="small"
                    />
                    <Chip
                      label={profile.membershipStatus.charAt(0).toUpperCase() + profile.membershipStatus.slice(1)}
                      color="success"
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Membership Renewal
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(profile.renewalDate).toLocaleDateString()}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={membershipProgress()}
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
                <FamilyRestroom sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" color="primary.main" fontWeight={700}>
                  {familyMembers.length + 1}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Family Members
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <CardContent>
                <Event sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" color="primary.main" fontWeight={700}>
                  {eventRegistrations.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Event Registrations
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <CardContent>
                <AttachMoney sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" color="primary.main" fontWeight={700}>
                  ${donationHistory.reduce((sum, donation) => sum + donation.amount, 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Donations
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <CardContent>
                <CreditCard sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" color="primary.main" fontWeight={700}>
                  Active
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Membership Status
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Upcoming Events */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionTitle
              title="Upcoming Events"
              subtitle="Your Registrations"
              align="left"
              showDivider={false}
            />
            {upcomingEvents.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {upcomingEvents.map((registration) => (
                  <Card key={registration.id} sx={{ p: 2 }}>
                    <CardContent sx={{ p: 0 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6" fontWeight={600}>
                          {registration.eventName}
                        </Typography>
                        <Chip
                          label={registration.status}
                          color="success"
                          size="small"
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(registration.eventDate).toLocaleDateString()} • {registration.eventTime}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {registration.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Attendees: {registration.attendees.join(', ')}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No upcoming events registered
                </Typography>
                <Button variant="contained" href="/events" sx={{ mt: 2 }}>
                  Browse Events
                </Button>
              </Card>
            )}
          </Grid>

          {/* Recent Donations */}
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionTitle
              title="Recent Donations"
              subtitle="Your Contributions"
              align="left"
              showDivider={false}
            />
            {recentDonations.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentDonations.map((donation) => (
                  <Card key={donation.id} sx={{ p: 2 }}>
                    <CardContent sx={{ p: 0 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" fontWeight={600}>
                          ${donation.amount}
                        </Typography>
                        <Chip
                          label={donation.type}
                          color="primary"
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {donation.purpose}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(donation.date).toLocaleDateString()} • Receipt: {donation.receipt}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No donation history
                </Typography>
                <Button variant="contained" href="/donate" sx={{ mt: 2 }}>
                  Make a Donation
                </Button>
              </Card>
            )}
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Box sx={{ mt: 6 }}>
          <SectionTitle
            title="Quick Actions"
            subtitle="Manage Your Membership"
            align="center"
            showDivider={true}
          />
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                href="/member/membership-status"
                sx={{ p: 2, flexDirection: 'column', height: '100%' }}
              >
                <CreditCard sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="body2">Membership Status</Typography>
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                href="/member/event-registrations"
                sx={{ p: 2, flexDirection: 'column', height: '100%' }}
              >
                <Event sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="body2">Event Registrations</Typography>
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                href="/member/donation-history"
                sx={{ p: 2, flexDirection: 'column', height: '100%' }}
              >
                <TrendingUp sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="body2">Donation History</Typography>
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                href="/member/digital-card"
                sx={{ p: 2, flexDirection: 'column', height: '100%' }}
              >
                <Person sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="body2">Digital Card</Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AppLayout>
  );
}
