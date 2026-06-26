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
  Chip,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  CheckCircle,
  Schedule,
  CreditCard,
  Star,
  Refresh,
  History,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import { mockMemberData } from '@/data/portal-mock';

export default function MembershipStatusPage() {
  const { profile, membershipBenefits } = mockMemberData;

  const membershipProgress = () => {
    const renewalDate = new Date(profile.renewalDate);
    const currentDate = new Date();
    const totalDays = 365;
    const daysElapsed = Math.floor((currentDate.getTime() - new Date(profile.memberSince).getTime()) / (1000 * 60 * 60 * 24)) % totalDays;
    return (daysElapsed / totalDays) * 100;
  };

  const daysUntilRenewal = () => {
    const renewalDate = new Date(profile.renewalDate);
    const currentDate = new Date();
    const timeDiff = renewalDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  const membershipPlans = [
    {
      type: 'individual',
      name: 'Individual Membership',
      price: 50,
      benefits: [
        'Access to all cultural events',
        'Tamil language classes (discounted)',
        'Newsletter subscription',
        'Voting rights in elections',
      ],
    },
    {
      type: 'family',
      name: 'Family Membership',
      price: 100,
      benefits: [
        'All Individual benefits',
        'Coverage for spouse and children',
        'Free admission to family events',
        'Priority registration for programs',
        'Family discounts on classes',
      ],
    },
    {
      type: 'student',
      name: 'Student Membership',
      price: 25,
      benefits: [
        'Access to cultural events',
        'Tamil language classes',
        'Newsletter subscription',
        'Mentorship programs',
      ],
    },
    {
      type: 'lifetime',
      name: 'Lifetime Membership',
      price: 1000,
      benefits: [
        'All Family benefits for life',
        'Priority event seating',
        'Special recognition at events',
        'Lifetime voting rights',
      ],
    },
  ];

  const currentPlan = membershipPlans.find(plan => plan.type === profile.membershipType);

  return (
    <AppLayout>
      <PageHeader
        title="Membership Status"
        subtitle="Manage Your Membership"
        actions={[
          {
            label: 'Renew Membership',
            href: '/membership',
            variant: 'contained',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Current Membership Overview */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <SectionTitle
            title="Current Membership"
            subtitle="Your Membership Details"
            align="center"
            showDivider={true}
          />
          
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" fontWeight={600}>
                      {currentPlan?.name}
                    </Typography>
                    <Chip
                      label={profile.membershipStatus.charAt(0).toUpperCase() + profile.membershipStatus.slice(1)}
                      color="success"
                      size="medium"
                    />
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" color="primary.main" fontWeight={700}>
                      ${currentPlan?.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      per year
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Membership Period
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(profile.memberSince).toLocaleDateString()} - {new Date(profile.renewalDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={membershipProgress()}
                      sx={{ height: 8, borderRadius: 4, mb: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {daysUntilRenewal()} days until renewal
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Refresh />}
                    href="/membership"
                    sx={{ borderRadius: 2 }}
                  >
                    Renew Membership
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Membership Benefits
                  </Typography>
                  <List>
                    {membershipBenefits.map((benefit, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={benefit} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Membership History */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Membership History"
              subtitle="Your Journey with CTS"
              align="center"
              showDivider={true}
            />
            
            <Card sx={{ p: 3 }}>
              <CardContent>
                <List>
                  <ListItem sx={{ py: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <ListItemIcon>
                      <History color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Current Membership"
                      secondary={`${currentPlan?.name} • Started ${new Date(profile.memberSince).toLocaleDateString()}`}
                    />
                    <Chip label="Active" color="success" size="small" />
                  </ListItem>
                  <ListItem sx={{ py: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <ListItemIcon>
                      <Schedule color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Renewal Due"
                      secondary={`${new Date(profile.renewalDate).toLocaleDateString()} • ${daysUntilRenewal()} days remaining`}
                    />
                    <Chip label="Upcoming" color="warning" size="small" />
                  </ListItem>
                  <ListItem sx={{ py: 2 }}>
                    <ListItemIcon>
                      <Star color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Member Since"
                      secondary={`${Math.floor((new Date().getTime() - new Date(profile.memberSince).getTime()) / (1000 * 60 * 60 * 24 * 365))} years of membership`}
                    />
                    <Chip label="Loyal Member" color="primary" size="small" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Container>
        </Box>

        {/* Available Plans */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <SectionTitle
              title="Available Membership Plans"
              subtitle="Upgrade or Change Your Plan"
              align="center"
              showDivider={true}
            />
            
            <Grid container spacing={4}>
              {membershipPlans.map((plan) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={plan.type}>
                  <Card
                    sx={{
                      height: '100%',
                      border: plan.type === profile.membershipType ? 2 : 1,
                      borderColor: plan.type === profile.membershipType ? 'primary.main' : 'divider',
                      position: 'relative',
                    }}
                  >
                    {plan.type === profile.membershipType && (
                      <Chip
                        label="CURRENT PLAN"
                        color="primary"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: -12,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontWeight: 600,
                        }}
                      />
                    )}
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        {plan.name}
                      </Typography>
                      <Box sx={{ my: 2 }}>
                        <Typography variant="h4" color="primary.main" fontWeight={700}>
                          ${plan.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          per year
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ textAlign: 'left', mb: 2 }}>
                        {plan.benefits.map((benefit, index) => (
                          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <CheckCircle sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
                            <Typography variant="body2">
                              {benefit}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                      <Button
                        variant={plan.type === profile.membershipType ? 'outlined' : 'contained'}
                        fullWidth
                        href="/membership"
                        sx={{ borderRadius: 2 }}
                        disabled={plan.type === profile.membershipType}
                      >
                        {plan.type === profile.membershipType ? 'Current Plan' : 'Choose Plan'}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>

        {/* Payment Information */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Payment Information"
              subtitle="Billing Details"
              align="center"
              showDivider={true}
            />
            
            <Card sx={{ p: 3 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Current Payment Method
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <CreditCard sx={{ color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2">
                          Visa ending in 4242
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Expires 12/25
                        </Typography>
                      </Box>
                    </Box>
                    <Button variant="outlined" size="small">
                      Update Payment Method
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Billing Address
                    </Typography>
                    <Typography variant="body2">
                      {profile.firstName} {profile.lastName}<br />
                      {profile.address.street}<br />
                      {profile.address.city}, {profile.address.state} {profile.address.zipCode}
                    </Typography>
                    <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                      Update Address
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Container>
    </AppLayout>
  );
}
