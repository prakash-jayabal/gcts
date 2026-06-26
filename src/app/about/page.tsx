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
} from '@mui/material';
import {
  History,
  People,
  School,
  Event,
  VolunteerActivism,
  LocationOn,
  Email,
  Phone,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import StatisticsCard from '@/components/ui/statistics-card';
import Timeline from '@/components/ui/timeline';
import { mockStatistics, mockTimeline } from '@/data/components-mock';

export default function AboutPage() {
  const boardMembers = [
    {
      name: 'Dr. Arun Kumar',
      role: 'President',
      bio: 'Leading our community with passion and dedication for over 8 years.',
      avatar: '/images/board/arun-kumar.jpg',
    },
    {
      name: 'Priya Ranganathan',
      role: 'Vice President',
      bio: 'Cultural programs coordinator with expertise in traditional Tamil arts.',
      avatar: '/images/board/priya-ranganathan.jpg',
    },
    {
      name: 'Rajesh Menon',
      role: 'Secretary',
      bio: 'Managing administrative operations and member communications.',
      avatar: '/images/board/rajesh-menon.jpg',
    },
    {
      name: 'Lakshmi Srinivasan',
      role: 'Treasurer',
      bio: 'Financial management and fundraising initiatives.',
      avatar: '/images/board/lakshmi-srinivasan.jpg',
    },
    {
      name: 'Mohan Balasubramanian',
      role: 'Cultural Director',
      bio: 'Organizing cultural events and educational programs.',
      avatar: '/images/board/mohan-balasubramanian.jpg',
    },
    {
      name: 'Anita Venkatesh',
      role: 'Youth Programs Director',
      bio: 'Developing and coordinating youth engagement activities.',
      avatar: '/images/board/anita-venkatesh.jpg',
    },
  ];

  return (
    <AppLayout>
      <PageHeader
        title="About Cincinnati Tamil Sangam"
        subtitle="Learn about our mission, history, and the team behind our community"
        actions={[
          {
            label: 'Join Our Team',
            href: '/volunteer',
            variant: 'contained',
          },
          {
            label: 'Contact Us',
            href: '/contact',
            variant: 'outlined',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Mission & Vision */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <SectionTitle
            title="Our Mission & Vision"
            subtitle="Preserving Heritage, Building Future"
            description="We are dedicated to preserving and promoting Tamil language, culture, and heritage in the Cincinnati area while fostering a sense of community and belonging among Tamil families."
            align="center"
            showDivider={true}
          />
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <History sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h5" fontWeight={600}>
                      Our Mission
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    To preserve, promote, and celebrate Tamil language, culture, and traditions in the Greater Cincinnati area through educational programs, cultural events, and community activities that bring families together.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <People sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h5" fontWeight={600}>
                      Our Vision
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    To be the leading cultural organization serving the Tamil community in Cincinnati, providing a welcoming environment where traditions are preserved, connections are made, and the next generation embraces their heritage.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Our Impact */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Our Impact"
              subtitle="Growing Stronger Together"
              description="See how we've made a difference in the Cincinnati Tamil community"
              align="center"
              showDivider={true}
            />
            <Grid container spacing={4}>
              {mockStatistics.map((stat) => (
                <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
                  <StatisticsCard {...stat} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* History Timeline */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 6, md: 8 } }}>
            <SectionTitle
              title="Our Journey"
              subtitle="A Timeline of Growth"
              description="From our humble beginnings to becoming a thriving community hub"
              align="center"
              showDivider={true}
            />
            <Timeline items={mockTimeline} variant="vertical" showDates={true} />
          </Box>
        </Container>

        {/* What We Offer */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="What We Offer"
              subtitle="Comprehensive Programs & Services"
              description="Discover the wide range of programs and services we provide to our community"
              align="center"
              showDivider={true}
            />
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <School sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Education
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tamil language classes, cultural workshops, and educational programs for all ages.
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Event sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Cultural Events
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Traditional festivals, cultural performances, and community celebrations.
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <VolunteerActivism sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Community Service
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Volunteer opportunities and charitable initiatives to give back to the broader community.
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <People sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Networking
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Building connections and fostering friendships among Tamil families in Cincinnati.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Board Members */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 6, md: 8 } }}>
            <SectionTitle
              title="Leadership Team"
              subtitle="Dedicated Volunteers Serving Our Community"
              description="Meet the passionate individuals who lead and manage our organization"
              align="center"
              showDivider={true}
            />
            <Grid container spacing={4}>
              {boardMembers.map((member) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={member.name}>
                  <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                    <Avatar
                      src={member.avatar}
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                      }}
                    >
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary.main" gutterBottom>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.bio}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>

        {/* Contact Information */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Get in Touch"
              subtitle="We'd Love to Hear From You"
              description="Contact us to learn more about our programs, volunteer opportunities, or membership"
              align="center"
              showDivider={true}
            />
            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <LocationOn sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Visit Us
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cincinnati Tamil Sangam Cultural Center<br />
                    1234 Heritage Lane<br />
                    Cincinnati, OH 45202
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Phone sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Call Us
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Main: (513) 555-0123<br />
                    Events: (513) 555-0124
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Email sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Email Us
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    info@cincinnatitamil.org<br />
                    events@cincinnatitamil.org
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                href="/contact"
                sx={{ borderRadius: 3, px: 4 }}
              >
                Contact Us Today
              </Button>
            </Box>
          </Container>
        </Box>
      </Container>
    </AppLayout>
  );
}
