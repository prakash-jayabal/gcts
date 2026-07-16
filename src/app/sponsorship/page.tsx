'use client';
// Enhanced Grid Layout - v2.1 - Uniform Grid Fixed

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Divider,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ExpandMore,
  Star,
  Handshake,
  Groups,
  Event,
  School,
  Campaign,
  CheckCircle,
  Email,
  Phone,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';

const SponsorshipPage: React.FC = () => {
  const theme = useTheme();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    tier: '',
    message: '',
  });

  const sponsorshipTiers = [
    {
      id: 'bronze',
      name: 'Bronze Sponsor',
      amount: '$500',
      period: 'year',
      color: '#CD7F32',
      icon: <Star />,
      features: [
        'Logo on website',
        'Social media mention',
        'Event program recognition',
        'Quarterly newsletter mention',
      ],
      popular: false,
    },
    {
      id: 'silver',
      name: 'Silver Sponsor',
      amount: '$1,000',
      period: 'year',
      color: '#C0C0C0',
      icon: <Handshake />,
      features: [
        'All Bronze benefits',
        'Logo on event materials',
        'Event sponsorship opportunity',
        'Social media features',
        'Quarterly newsletter highlights',
      ],
      popular: true,
    },
    {
      id: 'gold',
      name: 'Gold Sponsor',
      amount: '$2,500',
      period: 'year',
      color: '#FFD700',
      icon: <Groups />,
      features: [
        'All Silver benefits',
        'Logo on all marketing materials',
        '4 complimentary event tickets',
        'VIP event invitations',
        'Speaking opportunity at events',
        'Annual report recognition',
      ],
      popular: false,
    },
    {
      id: 'platinum',
      name: 'Platinum Sponsor',
      amount: '$5,000+',
      period: 'year',
      color: '#E5E4E2',
      icon: <Campaign />,
      features: [
        'All Gold benefits',
        'Title sponsorship opportunities',
        '8 complimentary event tickets',
        'Private event hosting opportunity',
        'Board meeting presentation',
        'Custom partnership benefits',
      ],
      popular: false,
    },
  ];

  const impactAreas = [
    {
      title: 'Cultural Education',
      description: 'Support Tamil language classes and cultural workshops for youth',
      icon: <School />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Community Events',
      description: 'Fund major cultural celebrations and community gatherings',
      icon: <Event />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'Youth Programs',
      description: 'Enable leadership development and educational initiatives',
      icon: <Groups />,
      color: theme.palette.success.main,
    },
  ];

  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept checks, bank transfers, and online payments through our secure portal. Payment plans are available for larger sponsorships.',
    },
    {
      question: 'Can I customize my sponsorship package?',
      answer: 'Yes! We\'re happy to work with sponsors to create custom packages that meet your specific goals and budget.',
    },
    {
      question: 'How is my sponsorship recognized?',
      answer: 'Recognition varies by tier but typically includes website placement, social media mentions, event signage, and newsletter features.',
    },
    {
      question: 'Are sponsorships tax-deductible?',
      answer: 'Yes, GCTS is a 501(c)(3) organization, and your sponsorship is tax-deductible to the extent allowed by law.',
    },
  ];

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sponsorship form submitted:', formData);
  };

  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
            Partner With GCTS
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
            Support our mission to preserve and promote Tamil culture in Greater Cincinnati
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            Your sponsorship helps us build a stronger, more connected community
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Chip
              icon={<CheckCircle />}
              label="501(c)(3) Tax Deductible"
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<Groups />}
              label="Community Impact"
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<Campaign />}
              label="Brand Visibility"
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>

        {/* Impact Areas - Uniform Grid Layout */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            Where Your Support Makes a Difference
          </Typography>
          <Grid container spacing={3}>
            {impactAreas.map((area, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Paper
                  sx={{
                    p: 4,
                    height: '100%',
                    textAlign: 'center',
                    transition: 'transform 0.2s',
                    background: index === 0 
                      ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`
                      : 'transparent',
                    border: index === 0 ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}` : '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: alpha(area.color, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      color: area.color,
                    }}
                  >
                    {area.icon}
                  </Box>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {area.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {area.description}
                  </Typography>
                  <Button variant="contained" size="small">
                    Learn More
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Sponsorship Tiers - Uniform Grid Layout */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            Choose Your Partnership Level
          </Typography>
          <Grid container spacing={3}>
            {sponsorshipTiers.map((tier) => (
              <Grid size={{ xs: 12, md: 6, lg: 3 }} key={tier.id}>
                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    border: tier.popular ? `3px solid ${theme.palette.primary.main}` : '1px solid',
                    borderColor: 'divider',
                    background: tier.popular 
                      ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`
                      : 'transparent',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: tier.popular ? theme.shadows[12] : theme.shadows[8],
                    },
                  }}
                >
                  {tier.popular && (
                    <Chip
                      label="MOST POPULAR"
                      color="primary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -8,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                        fontWeight: 'bold',
                      }}
                    />
                  )}
                  <CardContent sx={{ p: 3, pt: 3 }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          backgroundColor: alpha(tier.color, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 16px',
                          color: tier.color,
                        }}
                      >
                        {tier.icon}
                      </Box>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                        {tier.name}
                      </Typography>
                      <Typography variant="h4" sx={{ mb: 1, color: tier.color }}>
                        {tier.amount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        per {tier.period}
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ mb: 2 }}>
                      {tier.features.map((feature, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <CheckCircle sx={{ fontSize: 16, mr: 1, color: 'success.main' }} />
                          <Typography variant="body2">{feature}</Typography>
                        </Box>
                      ))}
                    </Box>
                    <Button
                      fullWidth
                      variant={tier.popular ? 'contained' : 'outlined'}
                      onClick={() => setFormData(prev => ({ ...prev, tier: tier.id }))}
                      sx={{ mt: 'auto' }}
                    >
                      Select {tier.name}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Sponsorship Form - Grid Layout */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            Ready to Partner With Us?
          </Typography>
          <Paper sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={formData.phone}
                    onChange={(e) => handleFormChange('phone', e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Organization"
                    value={formData.organization}
                    onChange={(e) => handleFormChange('organization', e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel>Sponsorship Tier</InputLabel>
                    <Select
                      value={formData.tier}
                      label="Sponsorship Tier"
                      onChange={(e) => handleFormChange('tier', e.target.value)}
                      required
                    >
                      {sponsorshipTiers.map((tier) => (
                        <MenuItem key={tier.id} value={tier.id}>
                          {tier.name} - {tier.amount}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Message (Optional)"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleFormChange('message', e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    Submit Sponsorship Inquiry
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={3}>
            {faqs.map((faq, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary">{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Section */}
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Have Questions?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            Our team is here to help you find the perfect sponsorship partnership
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Email color="primary" />
              <Typography>sponsorship@gcts.org</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Phone color="primary" />
              <Typography>(513) 555-0123</Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </AppLayout>
  );
};

export default SponsorshipPage;
