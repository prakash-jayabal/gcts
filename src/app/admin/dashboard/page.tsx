'use client';

import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  LinearProgress,
  Avatar,
  Chip,
} from '@mui/material';
import {
  People,
  TrendingUp,
  Event,
  AttachMoney,
  VolunteerActivism,
  Notifications,
  Assessment,
  ArrowUpward,
  ArrowDownward,
  Settings,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import { mockAnalytics } from '@/data/admin-mock';

const COLORS = ['#1976d2', '#dc004e', '#ffc107', '#4caf50', '#9c27b0', '#ff9800'];

export default function AdminDashboard() {
  const { overview, membershipGrowth, donationTrends, eventAttendance, volunteerHours } = mockAnalytics;

  const recentActivity = [
    { id: 1, type: 'user', message: 'New user registration: Sarah Chen', time: '2 minutes ago', icon: <People /> },
    { id: 2, type: 'donation', message: 'Donation received: $250 from Ravi Kumar', time: '15 minutes ago', icon: <AttachMoney /> },
    { id: 3, type: 'event', message: 'Event registration: Tamil New Year Celebration', time: '1 hour ago', icon: <Event /> },
    { id: 4, type: 'volunteer', message: 'Volunteer hours logged: 4 hours by Priya Ranganathan', time: '2 hours ago', icon: <VolunteerActivism /> },
    { id: 5, type: 'announcement', message: 'New announcement published: Monthly Newsletter', time: '3 hours ago', icon: <Notifications /> },
  ];

  const membershipDistribution = [
    { name: 'Individual', value: 65, color: '#1976d2' },
    { name: 'Family', value: 78, color: '#dc004e' },
    { name: 'Student', value: 13, color: '#ffc107' },
  ];

  const getChangeIcon = (value: number) => {
    return value >= 0 ? <ArrowUpward color="success" /> : <ArrowDownward color="error" />;
  };

  const getChangeColor = (value: number) => {
    return value >= 0 ? 'success.main' : 'error.main';
  };

  return (
    <AppLayout>
      <PageHeader
        title="Admin Dashboard"
        subtitle="System Overview & Analytics"
        actions={[
          {
            label: 'View Reports',
            href: '/admin/reports',
            variant: 'outlined',
          },
        ]}
      />

      <Container maxWidth="xl">
        {/* Key Metrics */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Avatar sx={{ backgroundColor: 'primary.main', color: 'white' }}>
                      <People />
                    </Avatar>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h4" color="primary.main" fontWeight={700}>
                        {overview.totalMembers}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Total Members
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                    {getChangeIcon(12)}
                    <Typography variant="body2" color={getChangeColor(12)}>
                      12% from last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Avatar sx={{ backgroundColor: 'success.main', color: 'white' }}>
                      <AttachMoney />
                    </Avatar>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h4" color="success.main" fontWeight={700}>
                        ${overview.totalDonations.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Total Donations
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                    {getChangeIcon(8)}
                    <Typography variant="body2" color={getChangeColor(8)}>
                      8% from last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Avatar sx={{ backgroundColor: 'warning.main', color: 'white' }}>
                      <Event />
                    </Avatar>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h4" color="warning.main" fontWeight={700}>
                        {overview.totalEvents}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Total Events
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                    <Chip label={`${overview.upcomingEvents} upcoming`} size="small" color="primary" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Avatar sx={{ backgroundColor: 'info.main', color: 'white' }}>
                      <VolunteerActivism />
                    </Avatar>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h4" color="info.main" fontWeight={700}>
                        {overview.totalVolunteers}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Active Volunteers
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {overview.totalHours.toLocaleString()} total hours
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Charts Section */}
        <Box sx={{ py: 4 }}>
          <SectionTitle
            title="Analytics Overview"
            subtitle="Key performance metrics and trends"
            align="center"
            showDivider={true}
          />
          
          <Grid container spacing={4}>
            {/* Membership Growth Chart */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Card sx={{ height: 400 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Membership & Volunteer Growth
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={membershipGrowth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="members" 
                        stroke="#1976d2" 
                        strokeWidth={2}
                        dot={{ fill: '#1976d2' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="volunteers" 
                        stroke="#dc004e" 
                        strokeWidth={2}
                        dot={{ fill: '#dc004e' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Membership Distribution */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: 400 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Membership Types
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={membershipDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {membershipDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <Box sx={{ mt: 2 }}>
                    {membershipDistribution.map((item) => (
                      <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Box sx={{ width: 12, height: 12, backgroundColor: item.color, borderRadius: 2 }} />
                        <Typography variant="body2">
                          {item.name}: {item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Additional Charts */}
        <Box sx={{ py: 4 }}>
          <Grid container spacing={4}>
            {/* Donation Trends */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: 350 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Donation Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={donationTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                      <Area 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#4caf50" 
                        fill="#4caf50"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Volunteer Hours */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: 350 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Volunteer Hours
                  </Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={volunteerHours}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#ff9800" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Recent Activity & Quick Actions */}
        <Box sx={{ py: 4 }}>
          <Grid container spacing={4}>
            {/* Recent Activity */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Card sx={{ height: 400 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Recent Activity
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {recentActivity.map((activity) => (
                      <Box key={activity.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 1, '&:hover': { backgroundColor: 'grey.50' } }}>
                        <Avatar sx={{ width: 32, height: 32, backgroundColor: 'primary.main', color: 'white' }}>
                          {activity.icon}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2">
                            {activity.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activity.time}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Quick Actions */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: 400 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Quick Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button variant="contained" fullWidth href="/admin/users" startIcon={<People />}>
                      Manage Users
                    </Button>
                    <Button variant="outlined" fullWidth href="/admin/events" startIcon={<Event />}>
                      Create Event
                    </Button>
                    <Button variant="outlined" fullWidth href="/admin/announcements" startIcon={<Notifications />}>
                      Send Announcement
                    </Button>
                    <Button variant="outlined" fullWidth href="/admin/reports" startIcon={<Assessment />}>
                      Generate Report
                    </Button>
                    <Button variant="outlined" fullWidth href="/admin/settings" startIcon={<Settings />}>
                      System Settings
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AppLayout>
  );
}
