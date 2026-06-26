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
} from '@mui/material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import EventCard from '@/components/ui/event-card';
import SearchBar from '@/components/ui/search-bar';
import { mockEvents } from '@/data/components-mock';

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);

  const categories = [
    { label: 'All Events', value: 'all' },
    { label: 'Cultural', value: 'cultural' },
    { label: 'Educational', value: 'educational' },
    { label: 'Religious', value: 'religious' },
    { label: 'Social', value: 'social' },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterEvents(query, selectedCategory);
  };

  const handleCategoryFilter = (filters: Record<string, unknown>) => {
    const category = filters.category as string || 'all';
    setSelectedCategory(category);
    filterEvents(searchQuery, category);
  };

  const filterEvents = (query: string, category: string) => {
    let filtered = mockEvents;

    // Filter by search query
    if (query) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.location.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(event => event.category === category);
    }

    setFilteredEvents(filtered);
  };

  const upcomingEvents = filteredEvents.filter(event => 
    new Date(event.date) >= new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = filteredEvents.filter(event => 
    new Date(event.date) < new Date()
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <AppLayout>
      <PageHeader
        title="Events"
        subtitle="Join our cultural celebrations and community gatherings"
        actions={[
          {
            label: 'Add Event',
            href: '/events/new',
            variant: 'contained',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Search and Filter */}
        <Box sx={{ mb: 4 }}>
          <SearchBar
            placeholder="Search events by name, location, or description..."
            onSearch={handleSearch}
            onFilterChange={handleCategoryFilter}
            filters={[
              {
                key: 'category',
                label: 'Category',
                options: categories,
              },
            ]}
            showFilters={true}
          />
        </Box>

        {/* Upcoming Events */}
        <Box sx={{ mb: 8 }}>
          <SectionTitle
            title="Upcoming Events"
            subtitle="Mark Your Calendar"
            description="Don't miss out on our upcoming cultural festivals, educational programs, and community gatherings"
            align="left"
            showDivider={true}
          />
          
          {upcomingEvents.length > 0 ? (
            <Grid container spacing={4}>
              {upcomingEvents.map((event) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event.id}>
                  <EventCard {...event} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No upcoming events found
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Check back soon for new events or try adjusting your search filters.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setFilteredEvents(mockEvents);
                }}
              >
                Clear Filters
              </Button>
            </Box>
          )}
        </Box>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <Box>
            <SectionTitle
              title="Past Events"
              subtitle="Memories & Celebrations"
              description="Relive the wonderful moments from our previous events and celebrations"
              align="left"
              showDivider={true}
            />
            <Grid container spacing={4}>
              {pastEvents.slice(0, 6).map((event) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event.id}>
                  <EventCard {...event} />
                </Grid>
              ))}
            </Grid>
            {pastEvents.length > 6 && (
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button variant="outlined" size="large">
                  View All Past Events
                </Button>
              </Box>
            )}
          </Box>
        )}

        {/* Event Categories */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 }, mt: 8 }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Event Categories"
              subtitle="Something for Everyone"
              description="Explore the different types of events we organize throughout the year"
              align="center"
              showDivider={true}
            />
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <Typography variant="h4" color="primary.main" gutterBottom>
                      🎭
                    </Typography>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Cultural Events
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Traditional festivals, dance performances, music concerts, and cultural showcases.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <Typography variant="h4" color="primary.main" gutterBottom>
                      📚
                    </Typography>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Educational Programs
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Workshops, seminars, language classes, and educational activities for all ages.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <Typography variant="h4" color="primary.main" gutterBottom>
                      🙏
                    </Typography>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Religious Events
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Temple visits, religious ceremonies, spiritual gatherings, and prayer meetings.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <Typography variant="h4" color="primary.main" gutterBottom>
                      🎉
                    </Typography>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Social Gatherings
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Community picnics, family gatherings, networking events, and social activities.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
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
                Stay Updated
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                Subscribe to our newsletter to receive updates about upcoming events and cultural programs
              </Typography>
              <Button
                variant="contained"
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
                Subscribe to Event Updates
              </Button>
            </Box>
          </Box>
        </Container>
      </Container>
    </AppLayout>
  );
}
