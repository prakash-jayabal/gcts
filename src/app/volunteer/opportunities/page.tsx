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
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search,
  Schedule,
  LocationOn,
  VolunteerActivism,
  Star,
  Email,
  Work,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import { mockVolunteerData } from '@/data/portal-mock';

export default function VolunteerOpportunitiesPage() {
  const { opportunities, profile } = mockVolunteerData;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUrgency, setSelectedUrgency] = useState('all');
  const [selectedOpportunity, setSelectedOpportunity] = useState<typeof opportunities[0] | null>(null);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Education', label: 'Education' },
    { value: 'Events', label: 'Events' },
    { value: 'Communications', label: 'Communications' },
    { value: 'Administration', label: 'Administration' },
    { value: 'Community Service', label: 'Community Service' },
    { value: 'Leadership', label: 'Leadership' },
    { value: 'Finance', label: 'Finance' },
  ];

  const urgencyLevels = [
    { value: 'all', label: 'All Urgencies' },
    { value: 'high', label: 'High Urgency' },
    { value: 'medium', label: 'Medium Urgency' },
    { value: 'low', label: 'Low Urgency' },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (event: { target: { value: unknown } }) => {
    setSelectedCategory(event.target.value as string);
  };

  const handleUrgencyChange = (event: { target: { value: unknown } }) => {
    setSelectedUrgency(event.target.value as string);
  };

  const handleApply = (opportunity: typeof opportunities[0]) => {
    setSelectedOpportunity(opportunity);
    setApplyDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setApplyDialogOpen(false);
    setSelectedOpportunity(null);
  };

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = !searchQuery || 
      opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || opportunity.category === selectedCategory;
    const matchesUrgency = selectedUrgency === 'all' || opportunity.urgency === selectedUrgency;
    
    return matchesSearch && matchesCategory && matchesUrgency;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <Star />;
      default:
        return null;
    }
  };

  const isSkillMatch = (opportunity: typeof opportunities[0]) => {
    return opportunity.requiredSkills.some(skill => 
      profile.skills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
  };

  return (
    <AppLayout>
      <PageHeader
        title="Volunteer Opportunities"
        subtitle="Find Ways to Contribute"
        actions={[
          {
            label: 'Log Hours',
            href: '/volunteer/hours',
            variant: 'outlined',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Search and Filter */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <SectionTitle
            title="Available Opportunities"
            subtitle="Find the perfect volunteer role for you"
            align="center"
            showDivider={true}
          />
          
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Urgency</InputLabel>
                <Select
                  value={selectedUrgency}
                  label="Urgency"
                  onChange={handleUrgencyChange}
                >
                  {urgencyLevels.map((urgency) => (
                    <MenuItem key={urgency.value} value={urgency.value}>
                      {urgency.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Your Skills Match */}
          <Card sx={{ p: 3, mb: 4, backgroundColor: 'primary.50', border: '2px solid', borderColor: 'primary.200' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Opportunities Matching Your Skills
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Based on your profile skills: {profile.skills.join(', ')}
              </Typography>
              <Grid container spacing={2}>
                {opportunities.filter(isSkillMatch).slice(0, 3).map((opportunity) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={opportunity.id}>
                    <Card sx={{ p: 2, height: '100%' }}>
                      <CardContent sx={{ p: 0 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1rem' }}>
                            {opportunity.title}
                          </Typography>
                          <Chip
                            label="Match"
                            color="success"
                            size="small"
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {opportunity.timeCommitment}
                        </Typography>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleApply(opportunity)}
                          sx={{ width: '100%' }}
                        >
                          Apply Now
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>

        {/* All Opportunities */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="All Opportunities"
              subtitle={`${filteredOpportunities.length} positions available`}
              align="center"
              showDivider={true}
            />
            
            <Grid container spacing={3}>
              {filteredOpportunities.map((opportunity) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={opportunity.id}>
                  <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          {opportunity.title}
                        </Typography>
                        <Chip
                          icon={getUrgencyIcon(opportunity.urgency) || undefined}
                          label={opportunity.urgency.charAt(0).toUpperCase() + opportunity.urgency.slice(1)}
                          color={getUrgencyColor(opportunity.urgency) as 'error' | 'warning' | 'success' | 'default'}
                          size="small"
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {opportunity.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Schedule sx={{ fontSize: 16, color: 'action.active' }} />
                        <Typography variant="body2" color="text.secondary">
                          {opportunity.timeCommitment}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <LocationOn sx={{ fontSize: 16, color: 'action.active' }} />
                        <Typography variant="body2" color="text.secondary">
                          {opportunity.location}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Work sx={{ fontSize: 16, color: 'action.active' }} />
                        <Typography variant="body2" color="text.secondary">
                          {opportunity.category}
                        </Typography>
                      </Box>
                      
                      {isSkillMatch(opportunity) && (
                        <Box sx={{ mb: 2 }}>
                          <Chip
                            label="Skills Match"
                            color="success"
                            size="small"
                            sx={{ mb: 1 }}
                          />
                        </Box>
                      )}
                      
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        {opportunity.requiredSkills.slice(0, 2).map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                        {opportunity.requiredSkills.length > 2 && (
                          <Chip
                            label={`+${opportunity.requiredSkills.length - 2} more`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>
                      
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleApply(opportunity)}
                        sx={{ width: '100%' }}
                      >
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            {filteredOpportunities.length === 0 && (
              <Card sx={{ textAlign: 'center', p: 4 }}>
                <VolunteerActivism sx={{ fontSize: 64, color: 'action.active', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  No opportunities found
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Try adjusting your search or filter criteria to find volunteer opportunities that match your interests.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedUrgency('all');
                  }}
                >
                  Clear Filters
                </Button>
              </Card>
            )}
          </Container>
        </Box>

        {/* How It Works */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <SectionTitle
              title="How It Works"
              subtitle="Simple Steps to Get Started"
              align="center"
              showDivider={true}
            />
            
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      1. Find Opportunity
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Browse available volunteer roles that match your skills and interests
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      2. Apply Online
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Submit your application through our simple online form
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      3. Get Matched
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Our team will review your application and match you with the right role
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      4. Start Volunteering
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Begin making a difference in our community
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>

      {/* Apply Dialog */}
      <Dialog open={applyDialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedOpportunity && (
          <>
            <DialogTitle>
              <Typography variant="h6" fontWeight={600}>
                Apply for {selectedOpportunity.title}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" paragraph>
                  {selectedOpportunity.description}
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Time Commitment
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {selectedOpportunity.timeCommitment}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {selectedOpportunity.location}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="body2" color="text.secondary">
                      Required Skills
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      {selectedOpportunity.requiredSkills.map((skill: string) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="body2" color="text.secondary">
                      Contact
                    </Typography>
                    <Typography variant="body1">
                      {selectedOpportunity.contact}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              
              <Typography variant="h6" gutterBottom>
                Your Information
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                We&apos;ll use your profile information to process your application.
              </Typography>
              <Typography variant="body2">
                Name: {profile.firstName} {profile.lastName}<br />
                Email: {profile.email}<br />
                Phone: {profile.phone}<br />
                Skills: {profile.skills.join(', ')}<br />
                Interests: {profile.interests.join(', ')}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button variant="contained" onClick={handleCloseDialog}>
                Submit Application
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </AppLayout>
  );
}
