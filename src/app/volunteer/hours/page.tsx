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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Avatar,
} from '@mui/material';
import {
  AccessTime,
  CalendarToday,
  CheckCircle,
  Pending,
  Add,
  TrendingUp,
  Star,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import { mockVolunteerData } from '@/data/portal-mock';

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
      id={`hours-tabpanel-${index}`}
      aria-labelledby={`hours-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function VolunteerHoursPage() {
  const { volunteerHours } = mockVolunteerData;
  const [tabValue, setTabValue] = useState(0);
  const [logDialogOpen, setLogDialogOpen] = useState(false);
  const [selectedHours, setSelectedHours] = useState<typeof volunteerHours[0] | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    opportunity: '',
    date: '',
    hours: '',
    category: '',
    description: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogHours = () => {
    setLogDialogOpen(true);
  };

  const handleViewDetails = (hours: typeof volunteerHours[0]) => {
    setSelectedHours(hours);
    setDetailDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setLogDialogOpen(false);
    setDetailDialogOpen(false);
    setSelectedHours(null);
  };

  const handleInputChange = (field: string) => (event: { target: { value: unknown } }) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value as string,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Logging hours:', formData);
    handleCloseDialog();
    // Reset form
    setFormData({
      opportunity: '',
      date: '',
      hours: '',
      category: '',
      description: '',
    });
  };

  const verifiedHours = volunteerHours.filter(hours => hours.verified);
  const pendingHours = volunteerHours.filter(hours => !hours.verified);
  const thisMonthHours = volunteerHours
    .filter(hours => new Date(hours.date).getMonth() === new Date().getMonth())
    .reduce((sum, hours) => sum + hours.hours, 0);

  const totalHours = volunteerHours.reduce((sum, hours) => sum + hours.hours, 0);

  const categories = [
    { value: 'Education', label: 'Education' },
    { value: 'Events', label: 'Events' },
    { value: 'Communications', label: 'Communications' },
    { value: 'Administration', label: 'Administration' },
    { value: 'Community Service', label: 'Community Service' },
    { value: 'Leadership', label: 'Leadership' },
    { value: 'Finance', label: 'Finance' },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Education':
        return 'primary';
      case 'Events':
        return 'secondary';
      case 'Communications':
        return 'info';
      case 'Administration':
        return 'warning';
      case 'Community Service':
        return 'success';
      case 'Leadership':
        return 'error';
      case 'Finance':
        return 'default';
      default:
        return 'default';
    }
  };

  const getHoursProgress = () => {
    const nextMilestone = 200;
    return (totalHours / nextMilestone) * 100;
  };

  return (
    <AppLayout>
      <PageHeader
        title="Volunteer Hours"
        subtitle="Track Your Service Hours"
        actions={[
          {
            label: 'Log Hours',
            href: '#',
            variant: 'contained',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Hours Stats */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <SectionTitle
            title="Your Service Impact"
            subtitle="Thank You for Your Dedication"
            align="center"
            showDivider={true}
          />
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <CardContent>
                  <AccessTime sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" color="primary.main" fontWeight={700}>
                    {totalHours}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Hours
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <CardContent>
                  <CalendarToday sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" color="primary.main" fontWeight={700}>
                    {thisMonthHours}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This Month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <CardContent>
                  <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
                  <Typography variant="h4" color="success.main" fontWeight={700}>
                    {verifiedHours.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Verified
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <CardContent>
                  <Pending sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
                  <Typography variant="h4" color="warning.main" fontWeight={700}>
                    {pendingHours.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Progress to Next Milestone */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Progress to Next Milestone"
              subtitle="You&apos;re on your way to the next achievement!"
              align="center"
              showDivider={true}
            />
            
            <Card sx={{ p: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    200 Hours - Gold Level
                  </Typography>
                  <Typography variant="h6" color="primary.main" fontWeight={600}>
                    {totalHours} / 200 hours
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={getHoursProgress()}
                  sx={{ height: 12, borderRadius: 6, mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {200 - totalHours} hours to go!
                </Typography>
              </CardContent>
            </Card>
          </Container>
        </Box>

        {/* Hours Tabs */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <SectionTitle
              title="Hours History"
              subtitle="View and manage your volunteer hours"
              align="center"
              showDivider={true}
            />
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
              >
                <Tab label={`All (${volunteerHours.length})`} />
                <Tab label={`Verified (${verifiedHours.length})`} />
                <Tab label={`Pending (${pendingHours.length})`} />
              </Tabs>
            </Box>

            {/* All Hours */}
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                {volunteerHours.map((hours) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={hours.id}>
                    <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography variant="h6" gutterBottom fontWeight={600}>
                            {hours.opportunity}
                          </Typography>
                          <Typography variant="h5" color="primary.main" fontWeight={700}>
                            {hours.hours}h
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {hours.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(hours.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <Chip
                            label={hours.category}
                            color={getCategoryColor(hours.category) as 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'error' | 'default'}
                            size="small"
                          />
                          {hours.verified ? (
                            <Chip
                              icon={<CheckCircle />}
                              label="Verified"
                              color="success"
                              size="small"
                            />
                          ) : (
                            <Chip
                              icon={<Pending />}
                              label="Pending"
                              color="warning"
                              size="small"
                            />
                          )}
                        </Box>
                        
                        {hours.verified && hours.verifiedBy && (
                          <Typography variant="caption" color="text.secondary">
                            Verified by {hours.verifiedBy}
                          </Typography>
                        )}
                        
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleViewDetails(hours)}
                          sx={{ mt: 2, width: '100%' }}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            {/* Verified Hours */}
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3}>
                {verifiedHours.map((hours) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={hours.id}>
                    <Card sx={{ height: '100%', border: 2, borderColor: 'success.light' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          {hours.opportunity}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {hours.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(hours.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        
                        <Chip
                          icon={<CheckCircle />}
                          label="Verified"
                          color="success"
                          size="small"
                          sx={{ mb: 2 }}
                        />
                        
                        <Typography variant="h5" color="success.main" fontWeight={700}>
                          {hours.hours} hours
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            {/* Pending Hours */}
            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={3}>
                {pendingHours.map((hours) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={hours.id}>
                    <Card sx={{ height: '100%', border: 2, borderColor: 'warning.light' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          {hours.opportunity}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {hours.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(hours.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        
                        <Chip
                          icon={<Pending />}
                          label="Pending Verification"
                          color="warning"
                          size="small"
                          sx={{ mb: 2 }}
                        />
                        
                        <Typography variant="h5" color="warning.main" fontWeight={700}>
                          {hours.hours} hours
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </Box>
        </Container>

        {/* Hours Trends */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Service Trends"
              subtitle="Your volunteer journey over time"
              align="center"
              showDivider={true}
            />
            
            <Card sx={{ p: 3 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Hours by Category
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {categories.map((category) => {
                        const categoryHours = volunteerHours
                          .filter(hours => hours.category === category.value)
                          .reduce((sum, hours) => sum + hours.hours, 0);
                        const percentage = totalHours > 0 ? (categoryHours / totalHours) * 100 : 0;
                        return (
                          <Box key={category.value}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2">
                                {category.label}
                              </Typography>
                              <Typography variant="body2">
                                {categoryHours}h ({percentage.toFixed(1)}%)
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
                      {volunteerHours.slice(0, 4).map((hours) => (
                        <Box key={hours.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 32, height: 32, backgroundColor: 'primary.main' }}>
                            <AccessTime sx={{ fontSize: 16 }} />
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" fontWeight={500}>
                              {hours.hours}h • {hours.category}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(hours.date).toLocaleDateString()}
                            </Typography>
                          </Box>
                          {hours.verified ? (
                            <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                          ) : (
                            <Pending sx={{ fontSize: 16, color: 'warning.main' }} />
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Container>

      {/* Log Hours Dialog */}
      <Dialog open={logDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Log Volunteer Hours</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Box sx={{ pt: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Opportunity</InputLabel>
                <Select
                  value={formData.opportunity}
                  label="Opportunity"
                  onChange={handleInputChange('opportunity')}
                  required
                >
                  <MenuItem value="Tamil Language Teaching Assistant">Tamil Language Teaching Assistant</MenuItem>
                  <MenuItem value="Event Setup Crew">Event Setup Crew</MenuItem>
                  <MenuItem value="Photography Assistant">Photography Assistant</MenuItem>
                  <MenuItem value="Community Service">Community Service</MenuItem>
                  <MenuItem value="Cultural Program">Cultural Program</MenuItem>
                  <MenuItem value="Administrative Support">Administrative Support</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={formData.date}
                onChange={handleInputChange('date')}
                required
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              
              <TextField
                fullWidth
                label="Hours"
                type="number"
                value={formData.hours}
                onChange={handleInputChange('hours')}
                required
                sx={{ mb: 2 }}
                inputProps={{ min: 0.5, step: 0.5 }}
              />
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={handleInputChange('category')}
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleInputChange('description')}
                placeholder="Describe your volunteer activities..."
                required
                sx={{ mb: 2 }}
              />
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit Hours
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hours Details Dialog */}
      <Dialog open={detailDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedHours && (
          <>
            <DialogTitle>Hours Details</DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {selectedHours.opportunity}
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Date
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {new Date(selectedHours.date).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Hours
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {selectedHours.hours} hours
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Category
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {selectedHours.category}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {selectedHours.verified ? 'Verified' : 'Pending'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="body2" color="text.secondary">
                      Description
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {selectedHours.description}
                    </Typography>
                  </Grid>
                  {selectedHours.verified && selectedHours.verifiedBy && (
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="body2" color="text.secondary">
                        Verified by
                      </Typography>
                      <Typography variant="body1">
                        {selectedHours.verifiedBy}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </AppLayout>
  );
}
