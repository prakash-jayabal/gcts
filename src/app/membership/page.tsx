'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Star,
  People,
  School,
  Event,
  VolunteerActivism,
  CreditCard,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import StatisticsCard from '@/components/ui/statistics-card';
import TestimonialCard from '@/components/ui/testimonial-card';
import { mockStatistics, mockTestimonials } from '@/data/components-mock';

export default function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState('family');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    agreeToTerms: false,
  });

  const membershipPlans = [
    {
      id: 'individual',
      name: 'Individual Membership',
      price: 50,
      period: 'year',
      features: [
        'Access to all cultural events',
        'Tamil language classes (discounted)',
        'Newsletter subscription',
        'Voting rights in elections',
        'Community networking',
      ],
      recommended: false,
    },
    {
      id: 'family',
      name: 'Family Membership',
      price: 100,
      period: 'year',
      features: [
        'All Individual benefits',
        'Coverage for spouse and children',
        'Free admission to family events',
        'Priority registration for programs',
        'Family discounts on classes',
        'Children&apos;s activity programs',
      ],
      recommended: true,
    },
    {
      id: 'student',
      name: 'Student Membership',
      price: 25,
      period: 'year',
      features: [
        'Access to cultural events',
        'Tamil language classes',
        'Newsletter subscription',
        'Mentorship programs',
        'Career networking',
        'Leadership opportunities',
      ],
      recommended: false,
    },
    {
      id: 'lifetime',
      name: 'Lifetime Membership',
      price: 1000,
      period: 'once',
      features: [
        'All Family benefits for life',
        'Priority event seating',
        'Special recognition at events',
        'Lifetime voting rights',
        'Free admission to all events',
        'Exclusive member events',
        'Name on donor wall',
      ],
      recommended: false,
    },
  ];

  const membershipBenefits = [
    {
      icon: <Event />,
      title: 'Cultural Events',
      description: 'Free or discounted access to our annual festivals, cultural performances, and community celebrations.',
    },
    {
      icon: <School />,
      title: 'Educational Programs',
      description: 'Tamil language classes, cultural workshops, and educational activities for all age groups.',
    },
    {
      icon: <People />,
      title: 'Community Network',
      description: 'Connect with Tamil families, build friendships, and expand your professional network.',
    },
    {
      icon: <VolunteerActivism />,
      title: 'Volunteer Opportunities',
      description: 'Give back to the community through various volunteer programs and service initiatives.',
    },
  ];

  const handlePlanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlan(event.target.value);
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      agreeToTerms: event.target.checked,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    console.log('Membership application submitted:', { plan: selectedPlan, ...formData });
  };

  return (
    <AppLayout>
      <PageHeader
        title="Become a Member"
        subtitle="Join our vibrant Tamil community in Cincinnati"
        actions={[
          {
            label: 'Contact Us',
            href: '/contact',
            variant: 'outlined',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Why Join GCTS */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <SectionTitle
            title="Why Join Cincinnati Tamil Sangam?"
            subtitle="More Than Just Membership"
            description="Become part of a thriving community that celebrates Tamil culture, preserves our heritage, and builds lasting connections"
            align="center"
            showDivider={true}
          />
          <Grid container spacing={4}>
            {membershipBenefits.map((benefit, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={benefit.title}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      fontSize: 48,
                      color: 'primary.main',
                      mb: 2,
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Membership Plans */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Choose Your Membership Plan"
              subtitle="Flexible Options for Every Family"
              description="Select the membership that best fits your needs and budget"
              align="center"
              showDivider={true}
            />
            <Grid container spacing={4}>
              {membershipPlans.map((plan) => (
                <Grid size={{ xs: 12, md: 6, lg: 3 }} key={plan.id}>
                  <Card
                    sx={{
                      height: '100%',
                      position: 'relative',
                      border: plan.recommended ? 2 : 1,
                      borderColor: plan.recommended ? 'primary.main' : 'divider',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                      },
                    }}
                  >
                    {plan.recommended && (
                      <Chip
                        label="RECOMMENDED"
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
                          per {plan.period}
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ textAlign: 'left', mb: 2 }}>
                        {plan.features.map((feature, index) => (
                          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <CheckCircle sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
                            <Typography variant="body2">
                              {feature}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                      <Button
                        variant={selectedPlan === plan.id ? 'contained' : 'outlined'}
                        fullWidth
                        onClick={() => setSelectedPlan(plan.id)}
                        sx={{ borderRadius: 2 }}
                      >
                        {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Membership Application Form */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 6, md: 8 } }}>
            <SectionTitle
              title="Complete Your Membership"
              subtitle="Join Our Community Today"
              description="Fill out the form below to become a member of Cincinnati Tamil Sangam"
              align="center"
              showDivider={true}
            />
            <Card sx={{ maxWidth: 600, mx: 'auto' }}>
              <CardContent sx={{ p: 4 }}>
                <form onSubmit={handleSubmit}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                        Selected Plan: {membershipPlans.find(p => p.id === selectedPlan)?.name}
                  </Typography>
                  <Typography variant="h4" color="primary.main" gutterBottom>
                    ${membershipPlans.find(p => p.id === selectedPlan)?.price}{' '}
                    <Typography variant="body2" component="span" color="text.secondary">
                      per {membershipPlans.find(p => p.id === selectedPlan)?.period}
                    </Typography>
                  </Typography>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange('firstName')}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange('lastName')}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange('phone')}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Street Address"
                        value={formData.address}
                        onChange={handleInputChange('address')}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="City"
                        value={formData.city}
                        onChange={handleInputChange('city')}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <TextField
                        fullWidth
                        label="State"
                        value={formData.state}
                        onChange={handleInputChange('state')}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <TextField
                        fullWidth
                        label="ZIP Code"
                        value={formData.zipCode}
                        onChange={handleInputChange('zipCode')}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.agreeToTerms}
                            onChange={handleCheckboxChange}
                            required
                          />
                        }
                        label="I agree to the membership terms and conditions"
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={<CreditCard />}
                        sx={{ borderRadius: 2 }}
                      >
                        Complete Membership
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Container>

        {/* Member Statistics */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Our Growing Community"
              subtitle="Join Over 500 Families"
              description="Be part of Cincinnati&apos;s largest and most active Tamil community"
              align="center"
              showDivider={true}
            />
            <Grid container spacing={4}>
              {mockStatistics.slice(0, 4).map((stat) => (
                <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
                  <StatisticsCard {...stat} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Member Testimonials */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 6, md: 8 } }}>
            <SectionTitle
              title="What Our Members Say"
              subtitle="Real Stories from Real Members"
              description="Hear from families who have found connection and community through GCTS"
              align="center"
              showDivider={true}
            />
            <Grid container spacing={4}>
              {mockTestimonials.slice(0, 3).map((testimonial) => (
                <Grid size={{ xs: 12, md: 4 }} key={testimonial.id}>
                  <TestimonialCard {...testimonial} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Container>
    </AppLayout>
  );
}
