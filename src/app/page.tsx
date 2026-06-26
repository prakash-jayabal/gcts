import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Email, Send } from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import HeroBanner from '@/components/ui/hero-banner';
import SectionTitle from '@/components/ui/section-title';
import StatisticsCard from '@/components/ui/statistics-card';
import EventCard from '@/components/ui/event-card';
import ProgramCard from '@/components/ui/program-card';
import GalleryCard from '@/components/ui/gallery-card';
import TestimonialCard from '@/components/ui/testimonial-card';
import SponsorCarousel from '@/components/ui/sponsor-carousel';
import { 
  mockStatistics, 
  mockEvents, 
  mockPrograms, 
  mockGallery, 
  mockTestimonials, 
  mockSponsors 
} from '@/data/components-mock';

export default function Home() {
  // Get first 2 events for homepage
  const featuredEvents = mockEvents.filter(event => event.isFeatured).slice(0, 2);
  const featuredPrograms = mockPrograms.slice(0, 3);
  const galleryPreview = mockGallery.slice(0, 4);
  const featuredTestimonials = mockTestimonials.slice(0, 3);

  return (
    <AppLayout showBreadcrumb={false}>
      {/* Premium Hero Section */}
      <HeroBanner
        title="Welcome to Cincinnati Tamil Sangam"
        subtitle="Preserving Tamil Heritage in the Heart of Ohio"
        description="Join our vibrant community celebrating Tamil culture, language, and traditions since 2010. Experience the richness of our heritage through events, education, and meaningful connections."
        primaryAction={{
          label: 'Become a Member',
          href: '/membership',
          variant: 'contained'
        }}
        secondaryAction={{
          label: 'Upcoming Events',
          href: '/events',
          variant: 'outlined'
        }}
        height="large"
        overlay={true}
      />

      {/* Community Statistics */}
      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <SectionTitle
            title="Our Community Impact"
            subtitle="Growing Stronger Together"
            description="Join over 500 families in celebrating and preserving Tamil culture in Cincinnati"
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
        </Box>
      </Container>

      {/* Upcoming Events */}
      <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <SectionTitle
            title="Upcoming Events"
            subtitle="Join Our Celebrations"
            description="Don't miss out on our cultural festivals, educational programs, and community gatherings"
            align="center"
            showDivider={true}
          />
          <Grid container spacing={4}>
            {featuredEvents.map((event) => (
              <Grid size={{ xs: 12, md: 6 }} key={event.id}>
                <EventCard {...event} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              href="/events"
              sx={{ borderRadius: 3, px: 4 }}
            >
              View All Events
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Programs */}
      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <SectionTitle
            title="Educational Programs"
            subtitle="Learn & Grow With Us"
            description="Discover our comprehensive Tamil language and cultural education programs for all ages"
            align="center"
            showDivider={true}
          />
          <Grid container spacing={4}>
            {featuredPrograms.map((program) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={program.id}>
                <ProgramCard {...program} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              href="/youth-programs"
              sx={{ borderRadius: 3, px: 4 }}
            >
              Explore All Programs
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Gallery Preview */}
      <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <SectionTitle
            title="Gallery Highlights"
            subtitle="Memories & Celebrations"
            description="Glimpse into our vibrant community events and cultural celebrations"
            align="center"
            showDivider={true}
          />
          <Grid container spacing={3}>
            {galleryPreview.map((item) => (
              <Grid size={{ xs: 6, sm: 3 }} key={item.id}>
                <GalleryCard {...item} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              href="/gallery"
              sx={{ borderRadius: 3, px: 4 }}
            >
              View Full Gallery
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <SectionTitle
            title="What Our Community Says"
            subtitle="Voices from Our Members"
            description="Hear from families who have found connection, learning, and belonging in our community"
            align="center"
            showDivider={true}
          />
          <Grid container spacing={4}>
            {featuredTestimonials.map((testimonial) => (
              <Grid size={{ xs: 12, md: 4 }} key={testimonial.id}>
                <TestimonialCard {...testimonial} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Sponsors */}
      <SponsorCarousel
        sponsors={mockSponsors}
        title="Our Valued Partners"
      />

      {/* Latest News */}
      <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <SectionTitle
            title="Latest News & Updates"
            subtitle="Stay Connected"
            description="Get the latest updates on events, programs, and community news"
            align="center"
            showDivider={true}
          />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Pongal Celebration 2024 - Record Attendance!
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Our annual Pongal celebration saw over 300 community members gathering to celebrate the harvest festival with traditional food, cultural performances, and family activities.
                </Typography>
                <Typography variant="caption" color="primary.main">
                  January 15, 2024
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  New Tamil Language Class Schedule Announced
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  We&apos;re excited to announce expanded class schedules for both children and adults, with new beginner-level classes starting this February.
                </Typography>
                <Typography variant="caption" color="primary.main">
                  January 28, 2024
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Youth Cultural Competition Registration Open
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Registration is now open for our annual youth cultural competition featuring music, dance, and oratory categories for children aged 5-18.
                </Typography>
                <Typography variant="caption" color="primary.main">
                  February 5, 2024
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              href="/news"
              sx={{ borderRadius: 3, px: 4 }}
            >
              Read All News
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Newsletter Signup */}
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
              Stay Connected
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4, opacity: 0.9 }}>
              Subscribe to our newsletter for updates on events, programs, and community news
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                maxWidth: 500,
                mx: 'auto',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <TextField
                placeholder="Enter your email"
                variant="outlined"
                fullWidth
                sx={{
                  backgroundColor: 'common.white',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                endIcon={<Send />}
                sx={{
                  backgroundColor: 'secondary.main',
                  color: 'secondary.contrastText',
                  '&:hover': {
                    backgroundColor: 'secondary.dark',
                  },
                  borderRadius: 2,
                  px: 3,
                  whiteSpace: 'nowrap',
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </AppLayout>
  );
}
