'use client';

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
  Chip,
  Divider,
} from '@mui/material';
import {
  EmojiEvents,
  Star,
  MilitaryTech,
  WorkspacePremium,
  CalendarToday,
  Person,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import { mockVolunteerData } from '@/data/portal-mock';

export default function VolunteerRecognitionPage() {
  const { recognition, profile } = mockVolunteerData;

  const getRecognitionIcon = (category: string) => {
    switch (category) {
      case 'Monthly Recognition':
        return <Star />;
      case 'Milestone':
        return <EmojiEvents />;
      case 'Program Recognition':
        return <MilitaryTech />;
      default:
        return <WorkspacePremium />;
    }
  };

  const getRecognitionColor = (category: string) => {
    switch (category) {
      case 'Monthly Recognition':
        return 'primary';
      case 'Milestone':
        return 'warning';
      case 'Program Recognition':
        return 'secondary';
      default:
        return 'info';
    }
  };

  const upcomingAwards = [
    {
      title: '50 Hours Service Award',
      description: 'Awarded to volunteers who complete 50 hours of service',
      currentProgress: profile.totalHours,
      requiredHours: 50,
      icon: <EmojiEvents />,
    },
    {
      title: '100 Hours Service Award',
      description: 'Awarded to volunteers who complete 100 hours of service',
      currentProgress: profile.totalHours,
      requiredHours: 100,
      icon: <MilitaryTech />,
    },
    {
      title: '200 Hours Service Award',
      description: 'Awarded to volunteers who complete 200 hours of service',
      currentProgress: profile.totalHours,
      requiredHours: 200,
      icon: <WorkspacePremium />,
    },
    {
      title: 'Volunteer of the Year',
      description: 'Annual award for outstanding volunteer contributions',
      currentProgress: 0,
      requiredHours: 0,
      icon: <Star />,
    },
  ];

  const getProgressPercentage = (current: number, required: number) => {
    return Math.min((current / required) * 100, 100);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Volunteer Recognition"
        subtitle="Your Achievements & Awards"
        actions={[
          {
            label: 'View Leaderboard',
            href: '/volunteer/leaderboard',
            variant: 'outlined',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Your Recognition */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <SectionTitle
            title="Your Recognition"
            subtitle="Awards and achievements you&apos;ve earned"
            align="center"
            showDivider={true}
          />
          
          {recognition.length > 0 ? (
            <Grid container spacing={3}>
              {recognition.map((award) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={award.id}>
                  <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                    <CardContent>
                      <Avatar
                        sx={{
                          width: 64,
                          height: 64,
                          mx: 'auto',
                          mb: 2,
                          backgroundColor: getRecognitionColor(award.category) + '.main',
                          color: 'white',
                        }}
                      >
                        {getRecognitionIcon(award.category)}
                      </Avatar>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        {award.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {award.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                        <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(award.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Chip
                        label={award.category}
                        color={getRecognitionColor(award.category) as 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'error' | 'default'}
                        size="small"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <EmojiEvents sx={{ fontSize: 64, color: 'action.active', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No Recognition Yet
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Keep volunteering to earn recognition and awards for your contributions!
              </Typography>
              <Button variant="contained" href="/volunteer/opportunities" sx={{ mt: 2 }}>
                Find Opportunities
              </Button>
            </Card>
          )}
        </Box>

        {/* Upcoming Awards */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Upcoming Awards"
              subtitle="Recognition you can earn"
              align="center"
              showDivider={true}
            />
            
            <Grid container spacing={3}>
              {upcomingAwards.map((award) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={award.title}>
                  <Card sx={{ height: '100%', p: 3 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            backgroundColor: 'primary.main',
                            color: 'white',
                          }}
                        >
                          {award.icon}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" gutterBottom fontWeight={600}>
                            {award.title}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {award.description}
                      </Typography>
                      
                      {award.requiredHours > 0 && (
                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              Progress
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {award.currentProgress} / {award.requiredHours} hours
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ flex: 1, mr: 1 }}>
                              <Box
                                sx={{
                                  height: 8,
                                  backgroundColor: 'grey.200',
                                  borderRadius: 4,
                                  overflow: 'hidden',
                                }}
                              >
                                <Box
                                  sx={{
                                    height: '100%',
                                    width: `${getProgressPercentage(award.currentProgress, award.requiredHours)}%`,
                                    backgroundColor: 'primary.main',
                                  }}
                                />
                              </Box>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              {getProgressPercentage(award.currentProgress, award.requiredHours)}%
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Recognition Program */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <SectionTitle
              title="Recognition Program"
              subtitle="How we celebrate our volunteers"
              align="center"
              showDivider={true}
            />
            
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ height: '100', p: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      How Recognition Works
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Our volunteer recognition program celebrates the dedication and contributions of our volunteers through various awards and acknowledgments.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Recognition is based on hours served, leadership demonstrated, and impact on our community programs.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ height: '100', p: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Recognition Categories
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Star sx={{ color: 'primary.main' }} />
                        <Typography variant="body2">
                          <strong>Monthly Recognition:</strong> Outstanding monthly contributions
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <EmojiEvents sx={{ color: 'warning.main' }} />
                        <Typography variant="body2">
                          <strong>Milestone Awards:</strong> Service hour milestones
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <MilitaryTech sx={{ color: 'secondary.main' }} />
                        <Typography variant="body2">
                          <strong>Program Recognition:</strong> Specific program contributions
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>

        {/* Recent Recognitions */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Recent Recognitions"
              subtitle="Recent volunteer achievements"
              align="center"
              showDivider={true}
            />
            
            <Card sx={{ p: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  This Month&apos;s Recognitions
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Congratulations to all volunteers who received recognition this month!
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                      <Avatar sx={{ backgroundColor: 'primary.main' }}>
                        <Person />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          Mohan Balasubramanian
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Volunteer of the Month
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                      <Avatar sx={{ backgroundColor: 'warning.main' }}>
                        <Person />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          Priya Ranganathan
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          100 Hours Service Award
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                      <Avatar sx={{ backgroundColor: 'secondary.main' }}>
                        <Person />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          Anita Venkatesh
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Youth Mentor Award
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        </Box>

        {/* Share Your Story */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <SectionTitle
              title="Share Your Story"
              subtitle="Inspire others with your volunteer journey"
              align="center"
              showDivider={true}
            />
            
            <Card sx={{ p: 3, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="body1" paragraph>
                  Your volunteer journey can inspire others to make a difference in our community.
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Share your experiences, challenges, and achievements to help encourage new volunteers.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
                  <Button variant="contained">
                    Share Your Story
                  </Button>
                  <Button variant="outlined">
                    Nominate a Volunteer
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Container>
    </AppLayout>
  );
}
