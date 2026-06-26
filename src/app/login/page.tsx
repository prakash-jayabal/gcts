'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  FormControlLabel,
  Checkbox,
  Divider,
  Link,
  Grid,
} from '@mui/material';
import {
  Person,
  Lock,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string) => (event: { target: { value: unknown } }) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value as string,
    }));
  };

  const handleCheckboxChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Login submitted:', formData);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Member Login"
        subtitle="Access Your Account"
        actions={[
          {
            label: 'Create Account',
            href: '/membership',
            variant: 'contained',
          },
        ]}
      />

      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <SectionTitle
            title="Welcome Back"
            subtitle="Sign In to Your Account"
            description="Access your member dashboard, register for events, and manage your membership"
            align="center"
            showDivider={true}
          />
          
          <Box sx={{ maxWidth: 500, mx: 'auto' }}>
            <Card sx={{ p: 4 }}>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />,
                    }}
                    sx={{ mb: 3 }}
                    required
                  />
                  
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    InputProps={{
                      startAdornment: <Lock sx={{ mr: 1, color: 'action.active' }} />,
                      endAdornment: (
                        <Button
                          onClick={handleTogglePassword}
                          sx={{ minWidth: 'auto', p: 1 }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      ),
                    }}
                    sx={{ mb: 2 }}
                    required
                  />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.rememberMe}
                          onChange={handleCheckboxChange('rememberMe')}
                        />
                      }
                      label="Remember me"
                    />
                    <Link href="#" variant="body2" color="primary">
                      Forgot password?
                    </Link>
                  </Box>
                  
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ borderRadius: 2, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  
                  <Divider sx={{ my: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      OR
                    </Typography>
                  </Divider>
                  
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Don&apos;t have an account?
                    </Typography>
                    <Button
                      variant="outlined"
                      href="/membership"
                      sx={{ borderRadius: 2 }}
                    >
                      Become a Member
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
            
            {/* Quick Links */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Link href="/membership" variant="body2" color="primary">
                  Membership
                </Link>
                <Link href="/events" variant="body2" color="primary">
                  Events
                </Link>
                <Link href="/youth-programs" variant="body2" color="primary">
                  Youth Programs
                </Link>
                <Link href="/volunteer" variant="body2" color="primary">
                  Volunteer
                </Link>
                <Link href="/contact" variant="body2" color="primary">
                  Contact
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Help Section */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Need Help?"
              subtitle="Get Support"
              description="If you&apos;re having trouble accessing your account or have questions about membership"
              align="center"
              showDivider={true}
            />
            
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card sx={{ height: '100', textAlign: 'center', p: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        First Time User?
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        If you&apos;re a new member, you&apos;ll receive your login credentials via email after registration.
                      </Typography>
                      <Button
                        variant="outlined"
                        href="/membership"
                        sx={{ borderRadius: 2 }}
                      >
                        Register Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card sx={{ height: '100', textAlign: 'center', p: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        Forgot Password?
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Reset your password using your registered email address.
                      </Typography>
                      <Button
                        variant="outlined"
                        href="#"
                        sx={{ borderRadius: 2 }}
                      >
                        Reset Password
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card sx={{ height: '100', textAlign: 'center', p: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        Account Issues?
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Contact our support team for assistance with login or membership issues.
                      </Typography>
                      <Button
                        variant="outlined"
                        href="/contact"
                        sx={{ borderRadius: 2 }}
                      >
                        Contact Support
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Container>
    </AppLayout>
  );
}
