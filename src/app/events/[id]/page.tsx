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
  Divider,
  Avatar,
} from '@mui/material';
import {
  CalendarToday,
  LocationOn,
  AccessTime,
  AttachMoney,
  People,
  Share,
  Favorite,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import TestimonialCard from '@/components/ui/testimonial-card';
import { mockEvents, mockTestimonials } from '@/data/components-mock';

interface EventDetailsPageProps {
  params: {
    id: string;
  };
}

export default function EventDetailsPage({ params }: EventDetailsPageProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Find the event by ID
  const event = mockEvents.find(e => e.id === params.id);
  
  if (!event) {
    return (
      <AppLayout>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h4" gutterBottom>
              Event Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              The event you're looking for doesn't exist or has been removed.
            </Typography>
            <Button variant="contained" href="/events">
              Back to Events
            </Button>
          </Box>
        </Container>
      </AppLayout>
    );
  }

  const relatedEvents = mockEvents
    .filter(e => e.id !== event.id && e.category === event.category)
    .slice(0, 3);

  const eventTestimonials = mockTestimonials.slice(0, 2);

  const handleRegister = () => {
    setIsRegistered(!isRegistered);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <AppLayout>
      <PageHeader
        title={event.title}
        subtitle={event.category}
        actions={[
          {
            label: 'Share Event',
            href: '#',
            variant: 'outlined',
          },
        ]}
      />

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Event Image */}
            {event.imageUrl && (
              <Box
                sx={{
                  height: 400,
                  backgroundImage: `url(${event.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 2,
                  mb: 4,
                }}
              />
            )}

            {/* Event Details */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" gutterBottom fontWeight={600}>
                {event.title}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Chip
                  label={event.category}
                  color="primary"
                  variant="outlined"
                />
                {event.isFeatured && (
                  <Chip
                    label="Featured"
                    color="secondary"
                    variant="filled"
                  />
                )}
              </Box>

              <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
                {event.description}
              </Typography>

              <Divider sx={{ my: 4 }} />

              {/* Extended Description */}
              <Typography variant="h6" gutterBottom fontWeight={600}>
                About This Event
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
                Join us for this wonderful celebration of Tamil culture and community. This event brings together families, 
                friends, and community members to share in the rich traditions and heritage that make our community special. 
                Whether you're new to the area or have been part of our community for years, this event offers something 
                for everyone to enjoy and participate in.
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
                Experience authentic Tamil cultural performances, traditional food, music, and activities that celebrate 
                our heritage. This is a perfect opportunity to connect with other Tamil families in the Cincinnati area 
                and introduce your children to our rich cultural traditions in a fun and engaging environment.
              </Typography>

              {/* What to Expect */}
              <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
                What to Expect
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" variant="body1" paragraph>
                  Traditional Tamil cultural performances and music
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  Authentic Tamil cuisine and refreshments
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  Family-friendly activities and games for children
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  Opportunities to connect with other Tamil families
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  Cultural workshops and educational activities
                </Typography>
              </Box>
            </Box>

            {/* Testimonials */}
            {eventTestimonials.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <SectionTitle
                  title="What People Say"
                  subtitle="Past Event Experiences"
                  align="left"
                  showDivider={false}
                />
                <Grid container spacing={3}>
                  {eventTestimonials.map((testimonial) => (
                    <Grid size={{ xs: 12, md: 6 }} key={testimonial.id}>
                      <TestimonialCard {...testimonial} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Event Info Card */}
            <Card sx={{ mb: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Event Details
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarToday sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" fontWeight={500}>
                      Date
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                    {formatDate(event.date)}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTime sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" fontWeight={500}>
                      Time
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                    {event.time}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" fontWeight={500}>
                      Location
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                    {event.location}
                  </Typography>
                </Box>

                {event.price !== undefined && (
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AttachMoney sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2" fontWeight={500}>
                        Price
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                      {event.price === 0 ? 'Free' : `$${event.price}`}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <People sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" fontWeight={500}>
                      Expected Attendance
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                    50-100 people
                  </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant={isRegistered ? "outlined" : "contained"}
                    fullWidth
                    onClick={handleRegister}
                    sx={{ borderRadius: 2 }}
                  >
                    {isRegistered ? 'Registered ✓' : 'Register Now'}
                  </Button>
                  
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Share />}
                    sx={{ borderRadius: 2 }}
                  >
                    Share Event
                  </Button>
                  
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Favorite />}
                    onClick={handleFavorite}
                    color={isFavorite ? "error" : "inherit"}
                    sx={{ borderRadius: 2 }}
                  >
                    {isFavorite ? 'Favorited' : 'Add to Favorites'}
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Related Events
                  </Typography>
                  {relatedEvents.map((relatedEvent) => (
                    <Box key={relatedEvent.id} sx={{ mb: 2, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        {relatedEvent.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(relatedEvent.date)} • {relatedEvent.location}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
