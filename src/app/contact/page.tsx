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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Schedule,
  Send,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: '',
  });

  const handleInputChange = (field: string) => (event: { target: { value: unknown } }) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value as string,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Contact form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <LocationOn />,
      title: 'Visit Us',
      details: [
        'Cincinnati Tamil Sangam Cultural Center',
        '1234 Heritage Lane',
        'Cincinnati, OH 45202',
      ],
    },
    {
      icon: <Phone />,
      title: 'Call Us',
      details: [
        'Main Office: (513) 555-0123',
        'Events Hotline: (513) 555-0124',
        'Emergency: (513) 555-0125',
      ],
    },
    {
      icon: <Email />,
      title: 'Email Us',
      details: [
        'General: info@cincinnatitamil.org',
        'Events: events@cincinnatitamil.org',
        'Membership: membership@cincinnatitamil.org',
      ],
    },
    {
      icon: <Schedule />,
      title: 'Office Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 10:00 AM - 4:00 PM',
        'Sunday: 12:00 PM - 4:00 PM',
      ],
    },
  ];

  const boardMembers = [
    {
      name: 'Dr. Arun Kumar',
      role: 'President',
      email: 'president@cincinnatitamil.org',
      phone: '(513) 555-0121',
    },
    {
      name: 'Priya Ranganathan',
      role: 'Vice President',
      email: 'vicepresident@cincinnatitamil.org',
      phone: '(513) 555-0122',
    },
    {
      name: 'Rajesh Menon',
      role: 'Secretary',
      email: 'secretary@cincinnatitamil.org',
      phone: '(513) 555-0123',
    },
    {
      name: 'Lakshmi Srinivasan',
      role: 'Treasurer',
      email: 'treasurer@cincinnatitamil.org',
      phone: '(513) 555-0124',
    },
  ];

  const faqs = [
    {
      question: 'How do I become a member of CTS?',
      answer: 'You can become a member by filling out our membership form online or visiting our cultural center. We offer individual, family, student, and lifetime membership options.',
    },
    {
      question: 'What events do you organize throughout the year?',
      answer: 'We organize various cultural events including Pongal, Tamil New Year, Deepavali, and Christmas celebrations, along with educational programs and community service activities.',
    },
    {
      question: 'Do you offer Tamil language classes?',
      answer: 'Yes, we offer Tamil language classes for children and adults at different skill levels. Classes are held on weekends and weekday evenings.',
    },
    {
      question: 'How can I volunteer with CTS?',
      answer: 'We welcome volunteers for various programs and events. You can fill out our volunteer application form or contact our volunteer coordinator for more information.',
    },
    {
      question: 'Where are your events typically held?',
      answer: 'Most events are held at our cultural center at 1234 Heritage Lane. Some larger events may be held at partner venues like the Hindu Temple of Cincinnati.',
    },
  ];

  return (
    <AppLayout>
      <PageHeader
        title="Contact Us"
        subtitle="Get in Touch with Cincinnati Tamil Sangam"
        actions={[
          {
            label: 'Become a Member',
            href: '/membership',
            variant: 'contained',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Contact Information */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <SectionTitle
            title="Get in Touch"
            subtitle="We&apos;re Here to Help"
            description="Reach out to us with any questions, suggestions, or to learn more about our programs and events"
            align="center"
            showDivider={true}
          />
          
          <Grid container spacing={4}>
            {contactInfo.map((info) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={info.title}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <Box sx={{ fontSize: 48, color: 'primary.main', mb: 2 }}>
                      {info.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {info.title}
                    </Typography>
                    {info.details.map((detail, index) => (
                      <Typography key={index} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {detail}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Form */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Send Us a Message"
              subtitle="We&apos;d Love to Hear From You"
              description="Fill out the form below and we&apos;ll get back to you as soon as possible"
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
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange('phone')}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <FormControl fullWidth>
                        <InputLabel>Inquiry Type</InputLabel>
                        <Select
                          value={formData.inquiryType}
                          label="Inquiry Type"
                          onChange={handleInputChange('inquiryType')}
                          required
                        >
                          <MenuItem value="general">General Inquiry</MenuItem>
                          <MenuItem value="membership">Membership</MenuItem>
                          <MenuItem value="events">Events</MenuItem>
                          <MenuItem value="volunteer">Volunteering</MenuItem>
                          <MenuItem value="education">Education Programs</MenuItem>
                          <MenuItem value="donation">Donation</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Subject"
                        value={formData.subject}
                        onChange={handleInputChange('subject')}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange('message')}
                        placeholder="Tell us more about your inquiry..."
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={<Send />}
                        sx={{ borderRadius: 2 }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Container>
        </Box>

        {/* Board Members */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 6, md: 8 } }}>
            <SectionTitle
              title="Leadership Team"
              subtitle="Contact Our Board Members"
              description="Reach out to our leadership team for specific inquiries or to get involved in our programs"
              align="center"
              showDivider={true}
            />
            
            <Grid container spacing={4}>
              {boardMembers.map((member) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={member.name}>
                  <Card sx={{ height: '100', textAlign: 'center', p: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        {member.name}
                      </Typography>
                      <Typography variant="subtitle1" color="primary.main" gutterBottom>
                        {member.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {member.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.phone}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>

        {/* FAQ Section */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Frequently Asked Questions"
              subtitle="Quick Answers"
              description="Find answers to common questions about Cincinnati Tamil Sangam"
              align="center"
              showDivider={true}
            />
            
            <Grid container spacing={3}>
              {faqs.map((faq, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <Card sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {faq.question}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                size="large"
                href="/about"
                sx={{ borderRadius: 2 }}
              >
                Learn More About CTS
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Map Placeholder */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 6, md: 8 } }}>
            <SectionTitle
              title="Visit Our Cultural Center"
              subtitle="Find Us Here"
              description="Stop by our cultural center to learn more about our programs and meet our community"
              align="center"
              showDivider={true}
            />
            
            <Card sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey.100' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <LocationOn sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Interactive Map
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  1234 Heritage Lane, Cincinnati, OH 45202
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  href="https://maps.google.com/?q=1234+Heritage+Lane+Cincinnati+OH+45202"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Container>
    </AppLayout>
  );
}
