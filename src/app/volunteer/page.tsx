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
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Divider,
} from '@mui/material';
import {
  VolunteerActivism,
  Event,
  School,
  People,
  Schedule,
  LocalHospital,
  Restaurant,
  Campaign,
  Handshake,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import TestimonialCard from '@/components/ui/testimonial-card';
import { mockTestimonials } from '@/data/components-mock';

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    areas: [] as string[],
    availability: '',
    experience: '',
    motivation: '',
    agreeToTerms: false,
  });

  const volunteerOpportunities = [
    {
      title: 'Event Planning',
      description: 'Help organize and execute our cultural events, festivals, and community gatherings.',
      icon: <Event />,
      timeCommitment: '5-10 hours per event',
      skills: 'Event planning, organization, coordination',
    },
    {
      title: 'Teaching Assistant',
      description: 'Support our Tamil language and cultural education programs for children.',
      icon: <School />,
      timeCommitment: '2-4 hours per week',
      skills: 'Teaching, Tamil language, working with children',
    },
    {
      title: 'Community Outreach',
      description: 'Help us reach more Tamil families in Cincinnati through outreach and marketing.',
      icon: <People />,
      timeCommitment: '3-5 hours per month',
      skills: 'Communication, marketing, community engagement',
    },
    {
      title: 'Administrative Support',
      description: 'Assist with day-to-day operations, member services, and administrative tasks.',
      icon: <Schedule />,
      timeCommitment: '4-6 hours per week',
      skills: 'Organization, computer skills, customer service',
    },
    {
      title: 'Youth Programs',
      description: 'Mentor and support youth in our various educational and cultural programs.',
      icon: <VolunteerActivism />,
      timeCommitment: '2-3 hours per week',
      skills: 'Mentoring, working with youth, cultural knowledge',
    },
    {
      title: 'Fundraising',
      description: 'Help organize fundraising events and campaigns to support our programs.',
      icon: <Campaign />,
      timeCommitment: '5-8 hours per month',
      skills: 'Fundraising, event planning, communication',
    },
    {
      title: 'Cultural Activities',
      description: 'Share your talents in music, dance, arts, or other cultural activities.',
      icon: <Restaurant />,
      timeCommitment: '2-4 hours per week',
      skills: 'Cultural arts, performance, teaching',
    },
    {
      title: 'Community Service',
      description: 'Participate in community service projects and charitable initiatives.',
      icon: <Handshake />,
      timeCommitment: '4-6 hours per month',
      skills: 'Community service, organization, compassion',
    },
  ];

  const volunteerBenefits = [
    {
      title: 'Make a Difference',
      description: 'Contribute to preserving and promoting Tamil culture in Cincinnati.',
      icon: '🌟',
    },
    {
      title: 'Build Connections',
      description: 'Meet and connect with other Tamil families and community members.',
      icon: '🤝',
    },
    {
      title: 'Develop Skills',
      description: 'Gain valuable experience in event planning, teaching, and community leadership.',
      icon: '📈',
    },
    {
      title: 'Give Back',
      description: 'Share your time and talents to support our growing community.',
      icon: '❤️',
    },
    {
      title: 'Leadership Opportunities',
      description: 'Take on leadership roles and help shape our community programs.',
      icon: '🎯',
    },
    {
      title: 'Cultural Enrichment',
      description: 'Deepen your own connection to Tamil heritage and traditions.',
      icon: '🎭',
    },
  ];

  const handleInputChange = (field: string) => (event: { target: { value: unknown } }) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value as string,
    }));
  };

  const handleAreaChange = (area: string) => {
    setFormData(prev => ({
      ...prev,
      areas: prev.areas.includes(area)
        ? prev.areas.filter(a => a !== area)
        : [...prev.areas, area],
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
    console.log('Volunteer application submitted:', formData);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Volunteer With Us"
        subtitle="Make a Difference in Our Community"
        actions={[
          {
            label: 'Contact Us',
            href: '/contact',
            variant: 'outlined',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Why Volunteer */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <SectionTitle
            title="Why Volunteer with GCTS?"
            subtitle="More Than Just Giving Time"
            description="Discover the rewards of volunteering and how you can make a meaningful impact in our community"
            align="center"
            showDivider={true}
          />
          <Grid container spacing={4}>
            {volunteerBenefits.map((benefit) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={benefit.title}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <Box sx={{ fontSize: 48, mb: 2 }}>{benefit.icon}</Box>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Volunteer Opportunities */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Volunteer Opportunities"
              subtitle="Find Your Perfect Role"
              description="Explore various ways you can contribute your time and talents to our community"
              align="center"
              showDivider={true}
            />
            <Grid container spacing={4}>
              {volunteerOpportunities.map((opportunity) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={opportunity.title}>
                  <Card sx={{ height: '100%', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ fontSize: 32, color: 'primary.main', mr: 2 }}>
                          {opportunity.icon}
                        </Box>
                        <Typography variant="h6" fontWeight={600}>
                          {opportunity.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {opportunity.description}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" color="primary.main" fontWeight={500}>
                          Time Commitment: {opportunity.timeCommitment}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Skills: {opportunity.skills}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Volunteer Application Form */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 6, md: 8 } }}>
            <SectionTitle
              title="Join Our Volunteer Team"
              subtitle="Start Making a Difference Today"
              description="Fill out the form below to become a volunteer with Cincinnati Tamil Sangam"
              align="center"
              showDivider={true}
            />
            <Card sx={{ maxWidth: 800, mx: 'auto' }}>
              <CardContent sx={{ p: 4 }}>
                <form onSubmit={handleSubmit}>
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
                    
                    {/* Areas of Interest */}
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        Areas of Interest
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Select all areas where you'd like to volunteer
                      </Typography>
                      <Grid container spacing={2}>
                        {volunteerOpportunities.map((opportunity) => (
                          <Grid size={{ xs: 12, sm: 6 }} key={opportunity.title}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={formData.areas.includes(opportunity.title)}
                                  onChange={() => handleAreaChange(opportunity.title)}
                                />
                              }
                              label={opportunity.title}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>

                    {/* Availability */}
                    <Grid size={{ xs: 12 }}>
                      <FormControl fullWidth>
                        <InputLabel>Availability</InputLabel>
                        <Select
                          value={formData.availability}
                          label="Availability"
                          onChange={handleInputChange('availability')}
                          required
                        >
                          <MenuItem value="weekdays">Weekdays</MenuItem>
                          <MenuItem value="weekends">Weekends</MenuItem>
                          <MenuItem value="both">Both Weekdays and Weekends</MenuItem>
                          <MenuItem value="flexible">Flexible</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Experience */}
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Relevant Experience"
                        multiline
                        rows={3}
                        value={formData.experience}
                        onChange={handleInputChange('experience')}
                        placeholder="Tell us about any relevant experience you have..."
                      />
                    </Grid>

                    {/* Motivation */}
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Why do you want to volunteer with GCTS?"
                        multiline
                        rows={3}
                        value={formData.motivation}
                        onChange={handleInputChange('motivation')}
                        placeholder="Share your motivation for volunteering..."
                        required
                      />
                    </Grid>

                    {/* Terms */}
                    <Grid size={{ xs: 12 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.agreeToTerms}
                            onChange={handleCheckboxChange}
                            required
                          />
                        }
                        label="I agree to the volunteer terms and conditions and understand that my time is voluntary"
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={<VolunteerActivism />}
                        sx={{ borderRadius: 2 }}
                      >
                        Submit Volunteer Application
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Container>

        {/* Volunteer Testimonials */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="What Our Volunteers Say"
              subtitle="Stories from Our Community"
              description="Hear from volunteers who have made a difference through GCTS"
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
          </Container>
        </Box>

        {/* Call to Action */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 6, md: 8 } }}>
            <Box
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                borderRadius: 4,
                p: { xs: 4, md: 6 },
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" gutterBottom fontWeight={600}>
                Ready to Make a Difference?
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                Your time and talents can help us build a stronger Tamil community in Cincinnati. 
                Join our volunteer team today and be part of something meaningful.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  href="#volunteer-form"
                  sx={{
                    backgroundColor: 'secondary.main',
                    color: 'secondary.contrastText',
                    '&:hover': {
                      backgroundColor: 'secondary.dark',
                    },
                    borderRadius: 2,
                    px: 4,
                  }}
                >
                  Become a Volunteer
                </Button>
                <Button
                  variant="outlined"
                  href="/contact"
                  sx={{
                    borderColor: 'common.white',
                    color: 'common.white',
                    '&:hover': {
                      borderColor: 'common.white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    borderRadius: 2,
                    px: 4,
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Container>
    </AppLayout>
  );
}
