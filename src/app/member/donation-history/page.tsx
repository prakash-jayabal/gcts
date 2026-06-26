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
  LinearProgress,
  Avatar,
  Divider,
} from '@mui/material';
import {
  AttachMoney,
  CalendarToday,
  Receipt,
  Download,
  TrendingUp,
  CheckCircle,
  Schedule,
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
      id={`donation-tabpanel-${index}`}
      aria-labelledby={`donation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DonationHistoryPage() {
  const { donationHistory } = mockMemberData;
  const [tabValue, setTabValue] = useState(0);
  const [selectedDonation, setSelectedDonation] = useState<typeof donationHistory[0] | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleViewDetails = (donation: typeof donationHistory[0]) => {
    setSelectedDonation(donation);
    setDetailDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDetailDialogOpen(false);
    setSelectedDonation(null);
  };

  const completedDonations = donationHistory.filter(d => d.status === 'completed');
  const activeDonations = donationHistory.filter(d => d.status === 'active');
  const totalDonated = donationHistory.reduce((sum, donation) => sum + donation.amount, 0);
  const thisYearDonations = donationHistory.filter(d => 
    new Date(d.date).getFullYear() === new Date().getFullYear()
  ).reduce((sum, donation) => sum + donation.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'active':
        return 'primary';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle />;
      case 'active':
        return <Schedule />;
      case 'pending':
        return <Info />;
      default:
        return <Info />;
    }
  };

  const getDonationTypeColor = (type: string) => {
    switch (type) {
      case 'one-time':
        return 'secondary';
      case 'monthly':
        return 'primary';
      case 'quarterly':
        return 'info';
      case 'yearly':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Donation History"
        subtitle="Your Contribution Impact"
        actions={[
          {
            label: 'Make a Donation',
            href: '/donate',
            variant: 'contained',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Donation Stats */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <SectionTitle
            title="Your Giving Impact"
            subtitle="Thank You for Your Support"
            align="center"
            showDivider={true}
          />
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <CardContent>
                  <AttachMoney sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" color="primary.main" fontWeight={700}>
                    ${totalDonated}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Donated
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <CardContent>
                  <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" color="primary.main" fontWeight={700}>
                    ${thisYearDonations}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This Year
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <CardContent>
                  <CalendarToday sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" color="primary.main" fontWeight={700}>
                    {donationHistory.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Donations
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <CardContent>
                  <Schedule sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" color="primary.main" fontWeight={700}>
                    {activeDonations.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Recurring
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Donation Tabs */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Donation Records"
              subtitle="View your donation history and receipts"
              align="center"
              showDivider={true}
            />
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
              >
                <Tab label={`All (${donationHistory.length})`} />
                <Tab label={`Completed (${completedDonations.length})`} />
                <Tab label={`Active (${activeDonations.length})`} />
              </Tabs>
            </Box>

            {/* All Donations */}
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                {donationHistory.map((donation) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={donation.id}>
                    <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography variant="h6" gutterBottom fontWeight={600}>
                            ${donation.amount}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip
                              label={donation.type}
                              color={getDonationTypeColor(donation.type) as 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'error' | 'default'}
                              size="small"
                            />
                            <Chip
                              icon={getStatusIcon(donation.status)}
                              label={donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                              color={getStatusColor(donation.status) as 'success' | 'warning' | 'error' | 'default'}
                              size="small"
                            />
                          </Box>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {donation.purpose}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(donation.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Receipt: {donation.receipt}
                          </Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Receipt />}
                            onClick={() => handleViewDetails(donation)}
                          >
                            Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            {/* Completed Donations */}
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3}>
                {completedDonations.map((donation) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={donation.id}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          ${donation.amount}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {donation.purpose}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(donation.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        
                        <Chip
                          label="Completed"
                          color="success"
                          size="small"
                          sx={{ mb: 2 }}
                        />
                        
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Download />}
                          onClick={() => handleViewDetails(donation)}
                          sx={{ width: '100%' }}
                        >
                          Download Receipt
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            {/* Active Donations */}
            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={3}>
                {activeDonations.map((donation) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={donation.id}>
                    <Card sx={{ height: '100%', border: 2, borderColor: 'primary.main' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          ${donation.amount}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {donation.purpose}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(donation.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        
                        <Chip
                          label="Active"
                          color="primary"
                          size="small"
                          sx={{ mb: 2 }}
                        />
                        
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Next payment: {new Date(donation.date).toLocaleDateString()}
                          </Typography>
                          <LinearProgress variant="indeterminate" sx={{ height: 6, borderRadius: 3 }} />
                        </Box>
                        
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleViewDetails(donation)}
                          sx={{ width: '100%' }}
                        >
                          Manage Donation
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </Container>
        </Box>

        {/* Giving Trends */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <SectionTitle
              title="Giving Trends"
              subtitle="Your Contribution Journey"
              align="center"
              showDivider={true}
            />
            
            <Card sx={{ p: 3 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Donation Types
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {['one-time', 'monthly', 'quarterly', 'yearly'].map((type) => {
                        const count = donationHistory.filter(d => d.type === type).length;
                        const percentage = donationHistory.length > 0 ? (count / donationHistory.length) * 100 : 0;
                        return (
                          <Box key={type}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2" textTransform="capitalize">
                                {type}
                              </Typography>
                              <Typography variant="body2">
                                {count} ({percentage.toFixed(1)}%)
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={percentage}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                          </Box>
                        );
                      })}
                    </Box>
                  </Grid>
                  
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Recent Activity
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {donationHistory.slice(0, 3).map((donation) => (
                        <Box key={donation.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 32, height: 32, backgroundColor: 'primary.main' }}>
                            <AttachMoney sx={{ fontSize: 16 }} />
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" fontWeight={500}>
                              ${donation.amount} • {donation.type}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(donation.date).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Chip
                            label={donation.status}
                            color={getStatusColor(donation.status) as 'success' | 'warning' | 'error' | 'default'}
                            size="small"
                          />
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Container>

      {/* Donation Details Dialog */}
      <Dialog open={detailDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedDonation && (
          <>
            <DialogTitle>
              <Typography variant="h6" fontWeight={600}>
                Donation Details
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" color="primary.main" fontWeight={700}>
                    ${selectedDonation.amount}
                  </Typography>
                  <Chip
                    icon={getStatusIcon(selectedDonation.status)}
                    label={selectedDonation.status.charAt(0).toUpperCase() + selectedDonation.status.slice(1)}
                    color={getStatusColor(selectedDonation.status) as 'success' | 'warning' | 'error' | 'default'}
                  />
                </Box>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Donation Type
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {selectedDonation.type.charAt(0).toUpperCase() + selectedDonation.type.slice(1)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Date
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {new Date(selectedDonation.date).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="body2" color="text.secondary">
                      Purpose
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {selectedDonation.purpose}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="body2" color="text.secondary">
                      Receipt Number
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {selectedDonation.receipt}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button variant="contained" startIcon={<Download />}>
                Download Receipt
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </AppLayout>
  );
}
