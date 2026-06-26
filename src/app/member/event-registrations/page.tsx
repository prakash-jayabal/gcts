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
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Event,
  CalendarToday,
  LocationOn,
  AttachMoney,
  People,
  CheckCircle,
  Pending,
  Cancel,
  Info,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import { mockMemberData } from '@/data/portal-mock';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`registration-tabpanel-${index}`}
      aria-labelledby={`registration-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function EventRegistrationsPage() {
  const { eventRegistrations } = mockMemberData;
  const [tabValue, setTabValue] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<typeof eventRegistrations[0] | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleViewDetails = (event: typeof eventRegistrations[0]) => {
    setSelectedEvent(event);
    setDetailDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDetailDialogOpen(false);
    setSelectedEvent(null);
  };

  const upcomingEvents = eventRegistrations.filter(reg => 
    new Date(reg.eventDate) >= new Date()
  );

  const pastEvents = eventRegistrations.filter(reg => 
    new Date(reg.eventDate) < new Date()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle />;
      case 'pending':
        return <Pending />;
      case 'cancelled':
        return <Cancel />;
      default:
        return <Info />;
    }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Event Registrations"
        subtitle="Manage Your Event Bookings"
        actions={[
          {
            label: 'Browse Events',
            href: '/events',
            variant: 'contained',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Registration Stats */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <CardContent>
                  <Event sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" color="primary.main" fontWeight={700}>
                    {eventRegistrations.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Registrations
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <CardContent>
                  <CalendarToday sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" color="primary.main" fontWeight={700}>
                    {upcomingEvents.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upcoming Events
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <CardContent>
                  <People sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" color="primary.main" fontWeight={700}>
                    {eventRegistrations.reduce((sum, reg) => sum + reg.attendees.length, 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Attendees
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <CardContent>
                  <AttachMoney sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" color="primary.main" fontWeight={700}>
                    ${eventRegistrations.reduce((sum, reg) => sum + (reg.price || 0), 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Spent
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Registration Tabs */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Your Event Registrations"
              subtitle="View and manage your event bookings"
              align="center"
              showDivider={true}
            />
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
              >
                <Tab label={`Upcoming (${upcomingEvents.length})`} />
                <Tab label={`Past (${pastEvents.length})`} />
                <Tab label="All Events" />
              </Tabs>
            </Box>

            {/* Upcoming Events */}
            <TabPanel value={tabValue} index={0}>
              {upcomingEvents.length > 0 ? (
                <Grid container spacing={3}>
                  {upcomingEvents.map((registration) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={registration.id}>
                      <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Typography variant="h6" gutterBottom fontWeight={600} sx={{ flex: 1 }}>
                              {registration.eventName}
                            </Typography>
                            <Chip
                              icon={getStatusIcon(registration.status)}
                              label={registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                              color={getStatusColor(registration.status) as 'success' | 'warning' | 'error' | 'default'}
                              size="small"
                            />
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                            <Typography variant="body2" color="text.secondary">
                              {new Date(registration.eventDate).toLocaleDateString()}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <LocationOn sx={{ fontSize: 16, color: 'action.active' }} />
                            <Typography variant="body2" color="text.secondary">
                              {registration.location}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <People sx={{ fontSize: 16, color: 'action.active' }} />
                            <Typography variant="body2" color="text.secondary">
                              {registration.attendees.length} attendees
                            </Typography>
                          </Box>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              Registration: {new Date(registration.registrationDate).toLocaleDateString()}
                            </Typography>
                            {registration.price > 0 && (
                              <Typography variant="h6" color="primary.main" fontWeight={600}>
                                ${registration.price}
                              </Typography>
                            )}
                          </Box>
                          
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleViewDetails(registration)}
                            sx={{ mt: 2, width: '100%' }}
                          >
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Card sx={{ textAlign: 'center', p: 4 }}>
                  <Event sx={{ fontSize: 64, color: 'action.active', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    No Upcoming Events
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    You haven&apos;t registered for any upcoming events. Browse our events and register today!
                  </Typography>
                  <Button variant="contained" href="/events">
                    Browse Events
                  </Button>
                </Card>
              )}
            </TabPanel>

            {/* Past Events */}
            <TabPanel value={tabValue} index={1}>
              {pastEvents.length > 0 ? (
                <Grid container spacing={3}>
                  {pastEvents.map((registration) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={registration.id}>
                      <Card sx={{ height: '100%', opacity: 0.8 }}>
                        <CardContent sx={{ p: 3 }}>
                          <Typography variant="h6" gutterBottom fontWeight={600}>
                            {registration.eventName}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                            <Typography variant="body2" color="text.secondary">
                              {new Date(registration.eventDate).toLocaleDateString()}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <LocationOn sx={{ fontSize: 16, color: 'action.active' }} />
                            <Typography variant="body2" color="text.secondary">
                              {registration.location}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <People sx={{ fontSize: 16, color: 'action.active' }} />
                            <Typography variant="body2" color="text.secondary">
                              {registration.attendees.length} attendees
                            </Typography>
                          </Box>
                          
                          <Chip
                            label="Completed"
                            color="default"
                            size="small"
                            sx={{ mb: 2 }}
                          />
                          
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleViewDetails(registration)}
                            sx={{ width: '100%' }}
                          >
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Card sx={{ textAlign: 'center', p: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    No Past Events
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    You haven&apos;t attended any events yet.
                  </Typography>
                </Card>
              )}
            </TabPanel>

            {/* All Events */}
            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={3}>
                {eventRegistrations.map((registration) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={registration.id}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          {registration.eventName}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(registration.eventDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <LocationOn sx={{ fontSize: 16, color: 'action.active' }} />
                          <Typography variant="body2" color="text.secondary">
                            {registration.location}
                          </Typography>
                        </Box>
                        
                        <Chip
                          label={registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                          color={getStatusColor(registration.status) as 'success' | 'warning' | 'error' | 'default'}
                          size="small"
                          sx={{ mb: 2 }}
                        />
                        
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleViewDetails(registration)}
                          sx={{ width: '100%' }}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </Container>
        </Box>
      </Container>

      {/* Event Details Dialog */}
      <Dialog open={detailDialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedEvent && (
          <>
            <DialogTitle>
              <Typography variant="h6" fontWeight={600}>
                {selectedEvent.eventName}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Chip
                    icon={getStatusIcon(selectedEvent.status)}
                    label={selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                    color={getStatusColor(selectedEvent.status) as any}
                  />
                  {selectedEvent.price > 0 && (
                    <Typography variant="h6" color="primary.main">
                      ${selectedEvent.price}
                    </Typography>
                  )}
                </Box>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                      <Typography variant="body2">
                        {new Date(selectedEvent.eventDate).toLocaleDateString()} • {selectedEvent.eventTime}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocationOn sx={{ fontSize: 16, color: 'action.active' }} />
                      <Typography variant="body2">
                        {selectedEvent.location}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom>
                  Registered Attendees ({selectedEvent.attendees.length})
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {selectedEvent.attendees.map((attendee: string, index: number) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                        {attendee.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Typography variant="body2">{attendee}</Typography>
                    </Box>
                  ))}
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body2" color="text.secondary">
                  Registration Date: {new Date(selectedEvent.registrationDate).toLocaleDateString()}
                </Typography>
                {selectedEvent.receipt && (
                  <Typography variant="body2" color="text.secondary">
                    Receipt: {selectedEvent.receipt}
                  </Typography>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button variant="contained" href={`/events/${selectedEvent.eventId}`}>
                View Event Page
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </AppLayout>
  );
}
