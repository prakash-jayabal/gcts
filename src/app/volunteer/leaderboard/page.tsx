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
  LinearProgress,
  Tabs,
  Tab,
} from '@mui/material';
import {
  EmojiEvents,
  MilitaryTech,
  WorkspacePremium,
  TrendingUp,
  Person,
  AccessTime,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import { mockLeaderboard, mockVolunteerData } from '@/data/portal-mock';

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
      id={`leaderboard-tabpanel-${index}`}
      aria-labelledby={`leaderboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function VolunteerLeaderboardPage() {
  const { profile } = mockVolunteerData;
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <EmojiEvents sx={{ color: 'warning.main' }} />;
      case 2:
        return <MilitaryTech sx={{ color: 'grey.400' }} />;
      case 3:
        return <WorkspacePremium sx={{ color: 'orange.600' }} />;
      default:
        return <Person sx={{ color: 'action.active' }} />;
    }
  };

  const getRankBadge = (badge: string) => {
    switch (badge) {
      case 'gold':
        return { color: 'warning.main', label: 'Gold' };
      case 'silver':
        return { color: 'grey.400', label: 'Silver' };
      case 'bronze':
        return { color: 'orange.600', label: 'Bronze' };
      default:
        return { color: 'action.active', label: 'Participant' };
    }
  };

  const currentUserRank = mockLeaderboard.find(v => v.name === 'Sarah Chen');
  const topVolunteers = mockLeaderboard.slice(0, 10);
  const byCategory = mockLeaderboard.reduce((acc, volunteer) => {
    if (!acc[volunteer.category]) {
      acc[volunteer.category] = [];
    }
    acc[volunteer.category].push(volunteer);
    return acc;
  }, {} as Record<string, typeof mockLeaderboard>);

  return (
    <AppLayout>
      <PageHeader
        title="Volunteer Leaderboard"
        subtitle="Top Contributors & Rankings"
        actions={[
          {
            label: 'View Recognition',
            href: '/volunteer/recognition',
            variant: 'outlined',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Your Ranking */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <SectionTitle
            title="Your Ranking"
            subtitle="Where you stand among volunteers"
            align="center"
            showDivider={true}
          />
          
          {currentUserRank && (
            <Card sx={{ maxWidth: 600, mx: 'auto', p: 3, border: 2, borderColor: 'primary.light' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                  <Avatar sx={{ width: 64, height: 64, backgroundColor: 'primary.main' }}>
                    {getRankIcon(currentUserRank.rank)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" gutterBottom fontWeight={600}>
                      {currentUserRank.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <Chip
                        label={`Rank #${currentUserRank.rank}`}
                        color="primary"
                        size="small"
                      />
                      <Chip
                        label={getRankBadge(currentUserRank.badge).label}
                        sx={{
                          backgroundColor: getRankBadge(currentUserRank.badge).color,
                          color: 'white',
                        }}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {currentUserRank.category}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Total Hours
                    </Typography>
                    <Typography variant="h6" color="primary.main" fontWeight={700}>
                      {currentUserRank.totalHours}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(currentUserRank.totalHours / 400) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {currentUserRank.achievements.map((achievement, index) => (
                    <Chip
                      key={index}
                      label={achievement}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>

        {/* Leaderboard Tabs */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Volunteer Rankings"
              subtitle="Top contributors this year"
              align="center"
              showDivider={true}
            />
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
              >
                <Tab label="Overall" />
                <Tab label="By Category" />
                <Tab label="Achievements" />
              </Tabs>
            </Box>

            {/* Overall Rankings */}
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={2}>
                {topVolunteers.map((volunteer) => (
                  <Grid size={{ xs: 12 }} key={volunteer.rank}>
                    <Card sx={{ 
                      p: 2,
                      border: volunteer.rank <= 3 ? 2 : 1,
                      borderColor: volunteer.rank <= 3 ? 'primary.light' : 'divider',
                      backgroundColor: volunteer.rank <= 3 ? 'primary.50' : 'background.paper'
                    }}>
                      <CardContent sx={{ p: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40 }}>
                            <Typography variant="h6" fontWeight={700} color={volunteer.rank <= 3 ? 'primary.main' : 'text.secondary'}>
                              #{volunteer.rank}
                            </Typography>
                          </Box>
                          
                          <Avatar sx={{ width: 48, height: 48 }}>
                            {getRankIcon(volunteer.rank)}
                          </Avatar>
                          
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" fontWeight={600}>
                              {volunteer.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {volunteer.category}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="h5" color="primary.main" fontWeight={700}>
                              {volunteer.totalHours}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              hours
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {volunteer.achievements.slice(0, 3).map((achievement, index) => (
                            <Chip
                              key={index}
                              label={achievement}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            {/* By Category */}
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3}>
                {Object.entries(byCategory).map(([category, volunteers]) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category}>
                    <Card sx={{ height: '100', p: 3 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          {category}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {volunteers.slice(0, 3).map((volunteer) => (
                            <Box key={volunteer.rank} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar sx={{ width: 32, height: 32 }}>
                                {getRankIcon(volunteer.rank)}
                              </Avatar>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" fontWeight={500}>
                                  {volunteer.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {volunteer.totalHours} hours
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            {/* Achievements */}
            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card sx={{ height: '100', p: 3 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <EmojiEvents sx={{ color: 'warning.main', fontSize: 32 }} />
                        <Typography variant="h6" fontWeight={600}>
                          500 Hours Club
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Volunteers who have contributed 500+ hours of service
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {mockLeaderboard.filter(v => v.totalHours >= 500).map((volunteer) => (
                          <Chip
                            key={volunteer.rank}
                            label={volunteer.name}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card sx={{ height: '100', p: 3 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <TrendingUp sx={{ color: 'primary.main', fontSize: 32 }} />
                        <Typography variant="h6" fontWeight={600}>
                          5 Year Service
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Volunteers with 5+ years of dedicated service
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {mockLeaderboard.filter(v => v.achievements.includes('5 Year Service')).map((volunteer) => (
                          <Chip
                            key={volunteer.rank}
                            label={volunteer.name}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card sx={{ height: '100', p: 3 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <MilitaryTech sx={{ color: 'secondary.main', fontSize: 32 }} />
                        <Typography variant="h6" fontWeight={600}>
                          Leadership Excellence
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Volunteers recognized for outstanding leadership
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {mockLeaderboard.filter(v => v.achievements.includes('Leadership Excellence')).map((volunteer) => (
                          <Chip
                            key={volunteer.rank}
                            label={volunteer.name}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Container>
        </Box>

        {/* Stats Overview */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <SectionTitle
              title="Community Impact"
              subtitle="Our collective achievements"
              align="center"
              showDivider={true}
            />
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <AccessTime sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h4" color="primary.main" fontWeight={700}>
                      {mockLeaderboard.reduce((sum, v) => sum + v.totalHours, 0)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Volunteer Hours
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <Person sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h4" color="primary.main" fontWeight={700}>
                      {mockLeaderboard.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Volunteers
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <EmojiEvents sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h4" color="primary.main" fontWeight={700}>
                      {mockLeaderboard.filter(v => v.totalHours >= 100).length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      100+ Hour Volunteers
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h4" color="primary.main" fontWeight={700}>
                      {Math.round(mockLeaderboard.reduce((sum, v) => sum + v.totalHours, 0) / mockLeaderboard.length)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Average Hours per Volunteer
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
    </AppLayout>
  );
}
