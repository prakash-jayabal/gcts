'use client';

import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Visibility,
  Block,
  CheckCircle,
  Person,
  Email,
  Phone,
  CalendarToday,
  AttachMoney,
  AccessTime,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import { mockUsers } from '@/data/admin-mock';

export default function UsersPage() {
  const [users] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRoleChange = (event: { target: { value: unknown } }) => {
    setSelectedRole(event.target.value as string);
  };

  const handleStatusChange = (event: { target: { value: unknown } }) => {
    setSelectedStatus(event.target.value as string);
  };

  const handleViewUser = (user: typeof users[0]) => {
    setSelectedUser(user);
    setViewDialogOpen(true);
  };

  const handleEditUser = (user: typeof users[0]) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setEditDialogOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchQuery || 
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'volunteer':
        return 'primary';
      case 'member':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={params.row.avatar} sx={{ width: 32, height: 32 }}>
            {params.row.firstName[0]}{params.row.lastName[0]}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {params.row.firstName} {params.row.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getRoleColor(params.value) as any}
          size="small"
        />
      ),
    },
    {
      field: 'membershipType',
      headerName: 'Membership',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" textTransform="capitalize">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value) as any}
          size="small"
        />
      ),
    },
    {
      field: 'memberSince',
      headerName: 'Member Since',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          {new Date(params.value).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      field: 'totalDonations',
      headerName: 'Donations',
      width: 100,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={500}>
          ${params.value}
        </Typography>
      ),
    },
    {
      field: 'totalHours',
      headerName: 'Hours',
      width: 80,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={500}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          key="view"
          icon={<Visibility />}
          label="View"
          onClick={() => handleViewUser(params.row)}
        />,
        <GridActionsCellItem
          key="edit"
          icon={<Edit />}
          label="Edit"
          onClick={() => handleEditUser(params.row)}
        />,
      ],
    },
  ];

  return (
    <AppLayout>
      <PageHeader
        title="User Management"
        subtitle="Manage all users and their roles"
        actions={[
          {
            label: 'Add User',
            href: '#',
            variant: 'contained',
          },
        ]}
      />

      <Container maxWidth="xl">
        {/* Filters and Search */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <SectionTitle
            title="User Directory"
            subtitle={`${filteredUsers.length} users found`}
            align="left"
            showDivider={false}
          />
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                placeholder="Search users..."
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
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={selectedRole}
                  label="Role"
                  onChange={handleRoleChange}
                >
                  <MenuItem value="all">All Roles</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="member">Member</MenuItem>
                  <MenuItem value="volunteer">Volunteer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedStatus}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* User Statistics */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Person sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h5" color="primary.main" fontWeight={700}>
                    {users.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Users
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <CheckCircle sx={{ fontSize: 32, color: 'success.main', mb: 1 }} />
                  <Typography variant="h5" color="success.main" fontWeight={700}>
                    {users.filter(u => u.status === 'active').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Users
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <AttachMoney sx={{ fontSize: 32, color: 'warning.main', mb: 1 }} />
                  <Typography variant="h5" color="warning.main" fontWeight={700}>
                    ${users.reduce((sum, u) => sum + u.totalDonations, 0).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Donations
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <AccessTime sx={{ fontSize: 32, color: 'info.main', mb: 1 }} />
                  <Typography variant="h5" color="info.main" fontWeight={700}>
                    {users.reduce((sum, u) => sum + u.totalHours, 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Hours
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Data Grid */}
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'grey.50',
                borderBottom: '2px solid',
                borderColor: 'divider',
              },
              '& .MuiDataGrid-row': {
                '&:hover': {
                  backgroundColor: 'grey.50',
                },
              },
            }}
          />
        </Box>
      </Container>

      {/* View User Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedUser && (
          <>
            <DialogTitle>User Details</DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                  <Avatar
                    src={selectedUser.avatar}
                    sx={{ width: 64, height: 64 }}
                  >
                    {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" gutterBottom fontWeight={600}>
                      {selectedUser.firstName} {selectedUser.lastName}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <Chip
                        label={selectedUser.role}
                        color={getRoleColor(selectedUser.role) as any}
                        size="small"
                      />
                      <Chip
                        label={selectedUser.status}
                        color={getStatusColor(selectedUser.status) as any}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Member since {new Date(selectedUser.memberSince).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Email sx={{ fontSize: 16, color: 'action.active' }} />
                      <Typography variant="body2">{selectedUser.email}</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Phone sx={{ fontSize: 16, color: 'action.active' }} />
                      <Typography variant="body2">{selectedUser.phone}</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Person sx={{ fontSize: 16, color: 'action.active' }} />
                      <Typography variant="body2">
                        {selectedUser.membershipType} membership
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                      <Typography variant="body2">
                        Last login: {new Date(selectedUser.lastLogin).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <AttachMoney sx={{ fontSize: 16, color: 'action.active' }} />
                      <Typography variant="body2">
                        Total donations: ${selectedUser.totalDonations}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <AccessTime sx={{ fontSize: 16, color: 'action.active' }} />
                      <Typography variant="body2">
                        Volunteer hours: {selectedUser.totalHours}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button variant="contained" onClick={() => handleEditUser(selectedUser)}>
                Edit User
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedUser && (
          <>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
              <Typography variant="body2" color="text.secondary" paragraph>
                Edit user information and permissions.
              </Typography>
              {/* Edit form would go here - simplified for prototype */}
              <Typography variant="body1">
                User editing functionality would be implemented here with form fields for:
                - Personal information
                - Role and permissions
                - Membership details
                - Contact information
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button variant="contained" onClick={handleCloseDialog}>
                Save Changes
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </AppLayout>
  );
}
