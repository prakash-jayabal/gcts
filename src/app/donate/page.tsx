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
} from '@mui/material';
import {
  Favorite,
  School,
  Event,
  VolunteerActivism,
  CreditCard,
  CheckCircle,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import StatisticsCard from '@/components/ui/statistics-card';
import { mockStatistics } from '@/data/components-mock';

export default function DonatePage() {
  const [donationType, setDonationType] = useState('one-time');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    isAnonymous: false,
    isRecurring: false,
  });

  const donationAmounts = [
    { value: 25, label: '$25' },
    { value: 50, label: '$50' },
    { value: 100, label: '$100' },
    { value: 250, label: '$250' },
    { value: 500, label: '$500' },
    { value: 1000, label: '$1,000' },
  ];

  const donationPrograms = [
    {
      title: 'Education Programs',
      description: 'Support our Tamil language classes and cultural education programs for children and adults.',
      icon: <School />,
    },
    {
      title: 'Cultural Events',
      description: 'Help us organize and celebrate traditional Tamil festivals and cultural events.',
      icon: <Event />,
    },
    {
      title: 'Community Service',
      description: 'Fund our community outreach and volunteer programs that serve the broader Cincinnati area.',
      icon: <VolunteerActivism />,
    },
    {
      title: 'General Support',
      description: 'Unrestricted funds that allow us to respond to our community&apos;s most pressing needs.',
      icon: <Favorite />,
    },
  ];

  const handleAmountSelect = (value: string) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount('');
  };

  const handleInputChange = (field: string) => (event: { target: { value: unknown } }) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value as string,
    }));
  };

  const handleCheckboxChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const finalAmount = customAmount || amount;
    console.log('Donation submitted:', { amount: finalAmount, type: donationType, ...formData });
  };

  const getDonationAmount = () => {
    return customAmount || amount || '0';
  };

  return (
    <AppLayout>
      <PageHeader
        title="Support Our Community"
        subtitle="Make a Difference Today"
        actions={[
          {
            label: 'Contact Us',
            href: '/contact',
            variant: 'outlined',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Why Donate */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <SectionTitle
            title="Why Support Cincinnati Tamil Sangam?"
            subtitle="Invest in Our Community&apos;s Future"
            description="Your generosity helps us preserve Tamil culture, educate our youth, and build a stronger community"
            align="center"
            showDivider={true}
          />
          
          <Grid container spacing={4}>
            {donationPrograms.map((program) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={program.title}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <Box sx={{ fontSize: 48, color: 'primary.main', mb: 2 }}>
                      {program.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {program.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {program.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Donation Impact */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Your Impact"
              subtitle="How Your Donation Helps"
              description="See how your generosity makes a real difference in our community"
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

        {/* Donation Form */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 6, md: 8 } }}>
            <SectionTitle
              title="Make Your Donation"
              subtitle="Choose Your Impact"
              description="Every contribution, no matter the size, makes a meaningful difference"
              align="center"
              showDivider={true}
            />
            
            <Grid container spacing={4}>
              {/* Donation Amount Selection */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ p: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Select Amount
                    </Typography>
                    
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Donation Type</InputLabel>
                      <Select
                        value={donationType}
                        label="Donation Type"
                        onChange={(e) => setDonationType(e.target.value as string)}
                      >
                        <MenuItem value="one-time">One-Time</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="quarterly">Quarterly</MenuItem>
                        <MenuItem value="yearly">Yearly</MenuItem>
                      </Select>
                    </FormControl>

                    <Typography variant="subtitle2" gutterBottom>
                      Quick Select
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      {donationAmounts.map((amountOption) => (
                        <Grid size={{ xs: 4, sm: 2 }} key={amountOption.value}>
                          <Button
                            variant={amount === amountOption.value.toString() ? 'contained' : 'outlined'}
                            onClick={() => handleAmountSelect(amountOption.value.toString())}
                            sx={{ borderRadius: 2 }}
                          >
                            {amountOption.label}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>

                    <Typography variant="subtitle2" gutterBottom>
                      Custom Amount
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                      }}
                      sx={{ mb: 2 }}
                    />

                    <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 2, textAlign: 'center', mb: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Total Donation
                      </Typography>
                      <Typography variant="h4" fontWeight={700}>
                        ${getDonationAmount()}
                      </Typography>
                      {donationType !== 'one-time' && (
                        <Typography variant="body2">
                          {donationType.charAt(0).toUpperCase() + donationType.slice(1)} recurring
                        </Typography>
                      )}
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Cincinnati Tamil Sangam is a 501(c)(3) non-profit organization. 
                      Your donation is tax-deductible to the extent allowed by law.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Donor Information */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ p: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Donor Information
                    </Typography>
                    
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
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
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            fullWidth
                            label="Street Address"
                            value={formData.address}
                            onChange={handleInputChange('address')}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="City"
                            value={formData.city}
                            onChange={handleInputChange('city')}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 3 }}>
                          <TextField
                            fullWidth
                            label="State"
                            value={formData.state}
                            onChange={handleInputChange('state')}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 3 }}>
                          <TextField
                            fullWidth
                            label="ZIP Code"
                            value={formData.zipCode}
                            onChange={handleInputChange('zipCode')}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={formData.isAnonymous}
                                onChange={handleCheckboxChange('isAnonymous')}
                              />
                            }
                            label="Make this donation anonymous"
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={donationType !== 'one-time'}
                                onChange={handleCheckboxChange('isRecurring')}
                              />
                            }
                            label="Set up recurring donation"
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
                            Proceed to Payment
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>

        {/* Other Ways to Give */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Other Ways to Give"
              subtitle="Multiple Ways to Support"
              description="Explore different ways to contribute to our community"
              align="center"
              showDivider={true}
            />
            
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ height: '100', p: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Check Donation
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Make checks payable to &ldquo;Cincinnati Tamil Sangam&rdquo; and mail to:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cincinnati Tamil Sangam<br />
                      1234 Heritage Lane<br />
                      Cincinnati, OH 45202
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ height: '100', p: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Corporate Matching
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Many employers match charitable donations. Check with your HR department to see if they offer matching gifts.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ height: '100', p: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      In-Kind Donations
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      We welcome in-kind donations of goods and services that support our programs and events.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Thank You Section */}
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
              <Favorite sx={{ fontSize: 64, mb: 2 }} />
              <Typography variant="h4" gutterBottom fontWeight={600}>
                Thank You for Your Support
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                Your generosity helps us preserve Tamil culture, educate our youth, and build a stronger community. 
                Every contribution makes a meaningful difference in the lives of Tamil families in Cincinnati.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  href="/membership"
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
                  Become a Member
                </Button>
                <Button
                  variant="outlined"
                  href="/volunteer"
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
                  Volunteer With Us
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Container>
    </AppLayout>
  );
}
