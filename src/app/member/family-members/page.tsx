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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Person,
  Edit,
  Add,
  Email,
  Cake,
  FamilyRestroom,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import { mockMemberData } from '@/data/portal-mock';

export default function FamilyMembersPage() {
  const { profile, familyMembers } = mockMemberData;
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState<typeof familyMembers[0] | null>(null);

  const handleEditMember = (member: typeof familyMembers[0]) => {
    setSelectedMember(member);
    setEditDialogOpen(true);
  };

  const handleAddMember = () => {
    setAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
    setAddDialogOpen(false);
    setSelectedMember(null);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Family Members"
        subtitle="Manage Your Family Membership"
        actions={[
          {
            label: 'Add Family Member',
            href: '#',
            variant: 'contained',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Primary Member */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <SectionTitle
            title="Primary Member"
            subtitle="Account Holder"
            align="center"
            showDivider={true}
          />
          
          <Card sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Avatar
                  src={profile.avatar}
                  sx={{ width: 80, height: 80 }}
                >
                  {profile.firstName[0]}{profile.lastName[0]}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    {profile.firstName} {profile.lastName}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Chip
                      label="Primary Member"
                      color="primary"
                      size="small"
                    />
                    <Chip
                      label={profile.membershipType.charAt(0).toUpperCase() + profile.membershipType.slice(1)}
                      color="secondary"
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Member since {new Date(profile.memberSince).toLocaleDateString()}
                  </Typography>
                </Box>
                <IconButton color="primary">
                  <Edit />
                </IconButton>
              </Box>
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Email sx={{ fontSize: 20, color: 'action.active' }} />
                    <Typography variant="body2">
                      {profile.email}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Person sx={{ fontSize: 20, color: 'action.active' }} />
                    <Typography variant="body2">
                      {profile.phone}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="body2" color="text.secondary">
                    {profile.address.street}, {profile.address.city}, {profile.address.state} {profile.address.zipCode}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>

        {/* Family Members */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Family Members"
              subtitle={`${familyMembers.length} members on your family plan`}
              align="center"
              showDivider={true}
            />
            
            {familyMembers.length > 0 ? (
              <Grid container spacing={3}>
                {familyMembers.map((member) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={member.id}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Avatar sx={{ width: 60, height: 60 }}>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" gutterBottom fontWeight={600}>
                              {member.name}
                            </Typography>
                            <Chip
                              label={member.relationship}
                              color="primary"
                              size="small"
                            />
                          </Box>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditMember(member)}
                          >
                            <Edit />
                          </IconButton>
                        </Box>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Cake sx={{ fontSize: 18, color: 'action.active' }} />
                            <Typography variant="body2" color="text.secondary">
                              Age: {member.age}
                            </Typography>
                          </Box>
                          
                          {member.email && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Email sx={{ fontSize: 18, color: 'action.active' }} />
                              <Typography variant="body2" color="text.secondary">
                                {member.email}
                              </Typography>
                            </Box>
                          )}
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FamilyRestroom sx={{ fontSize: 18, color: 'action.active' }} />
                            <Typography variant="body2" color="text.secondary">
                              Member since {new Date(member.memberSince).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Card sx={{ textAlign: 'center', p: 4 }}>
                <FamilyRestroom sx={{ fontSize: 64, color: 'action.active', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  No Family Members Added
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Add family members to your membership plan to share benefits and register for events together.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAddMember}
                >
                  Add Family Member
                </Button>
              </Card>
            )}
          </Container>
        </Box>

        {/* Family Benefits */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <SectionTitle
              title="Family Benefits"
              subtitle="What Your Family Membership Includes"
              align="center"
              showDivider={true}
            />
            
            <Card sx={{ p: 3 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary.main" fontWeight={700}>
                        {familyMembers.length + 1}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Members
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary.main" fontWeight={700}>
                        Unlimited
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Event Registrations
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary.main" fontWeight={700}>
                        20%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Class Discounts
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary.main" fontWeight={700}>
                        Priority
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Registration
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Container>

      {/* Edit Member Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Family Member</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              defaultValue={selectedMember?.name}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Relationship"
              defaultValue={selectedMember?.relationship}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Age"
              type="number"
              defaultValue={selectedMember?.age}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              defaultValue={selectedMember?.email}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Add Member Dialog */}
      <Dialog open={addDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Family Member</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Relationship"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Age"
              type="number"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>Add Member</Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
}
