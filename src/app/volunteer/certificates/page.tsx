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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  School,
  Download,
  Share,
  Visibility,
  CalendarToday,
  CheckCircle,
  MilitaryTech,
  WorkspacePremium,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import { mockVolunteerData } from '@/data/portal-mock';

export default function VolunteerCertificatesPage() {
  const { certificates } = mockVolunteerData;

  const getCertificateIcon = (title: string) => {
    if (title.includes('Service')) return <School />;
    if (title.includes('Teaching')) return <MilitaryTech />;
    return <WorkspacePremium />;
  };

  const getCertificateColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'expired':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const availableCertificates = [
    {
      title: 'Volunteer Service Certificate',
      description: 'Certificate of appreciation for volunteer service',
      requirements: 'Minimum 10 hours of service',
      icon: <School />,
    },
    {
      title: 'Tamil Language Teaching Certificate',
      description: 'Certificate for completing Tamil language teaching training',
      requirements: 'Complete teaching assistant program',
      icon: <MilitaryTech />,
    },
    {
      title: 'Event Management Certificate',
      description: 'Certificate for event coordination and management',
      requirements: 'Assist with 3+ events',
      icon: <WorkspacePremium />,
    },
    {
      title: 'Youth Mentor Certificate',
      description: 'Certificate for youth program mentorship',
      requirements: 'Complete youth mentor program',
      icon: <School />,
    },
  ];

  const handleDownload = (certificate: typeof certificates[0]) => {
    console.log('Downloading certificate:', certificate.title);
    // In a real app, this would trigger a download
  };

  const handleShare = (certificate: typeof certificates[0]) => {
    console.log('Sharing certificate:', certificate.title);
    // In a real app, this would open share dialog
  };

  const handleView = (certificate: typeof certificates[0]) => {
    console.log('Viewing certificate:', certificate.title);
    // In a real app, this would open certificate viewer
  };

  return (
    <AppLayout>
      <PageHeader
        title="Volunteer Certificates"
        subtitle="Your Service Certificates & Achievements"
        actions={[
          {
            label: 'Request Certificate',
            href: '#',
            variant: 'contained',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Your Certificates */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <SectionTitle
            title="Your Certificates"
            subtitle="Certificates you&apos;ve earned"
            align="center"
            showDivider={true}
          />
          
          {certificates.length > 0 ? (
            <Grid container spacing={3}>
              {certificates.map((certificate) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={certificate.id}>
                  <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            backgroundColor: 'primary.main',
                            color: 'white',
                          }}
                        >
                          {getCertificateIcon(certificate.title)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" gutterBottom fontWeight={600}>
                            {certificate.title}
                          </Typography>
                          <Chip
                            label={certificate.status}
                            color={getCertificateColor(certificate.status) as 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'error' | 'default'}
                            size="small"
                          />
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                        <Typography variant="body2" color="text.secondary">
                          Issued: {new Date(certificate.issueDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                      
                      {certificate.validUntil && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <CheckCircle sx={{ fontSize: 16, color: 'action.active' }} />
                          <Typography variant="body2" color="text.secondary">
                            Valid until: {new Date(certificate.validUntil).toLocaleDateString()}
                          </Typography>
                        </Box>
                      )}
                      
                      <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Visibility />}
                          onClick={() => handleView(certificate)}
                          sx={{ flex: 1 }}
                        >
                          View
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Download />}
                          onClick={() => handleDownload(certificate)}
                          sx={{ flex: 1 }}
                        >
                          Download
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Share />}
                          onClick={() => handleShare(certificate)}
                          sx={{ flex: 1 }}
                        >
                          Share
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <School sx={{ fontSize: 64, color: 'action.active', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No Certificates Yet
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Complete volunteer requirements to earn certificates for your service and achievements.
              </Typography>
              <Button variant="contained" href="/volunteer/opportunities" sx={{ mt: 2 }}>
                Find Opportunities
              </Button>
            </Card>
          )}
        </Box>

        {/* Available Certificates */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Available Certificates"
              subtitle="Certificates you can earn"
              align="center"
              showDivider={true}
            />
            
            <Grid container spacing={3}>
              {availableCertificates.map((cert, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <Card sx={{ height: '100', textAlign: 'center', p: 3 }}>
                    <CardContent>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          mx: 'auto',
                          mb: 2,
                          backgroundColor: 'primary.main',
                          color: 'white',
                        }}
                      >
                        {cert.icon}
                      </Avatar>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        {cert.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {cert.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {cert.requirements}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Certificate Program */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <SectionTitle
              title="Certificate Program"
              subtitle="How our certificate program works"
              align="center"
              showDivider={true}
            />
            
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ height: '100', p: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      How to Earn Certificates
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Our certificate program recognizes volunteers for their dedication and achievements in various areas of service.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Certificates are awarded based on completed hours, specific program participation, and demonstrated skills.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Each certificate includes your name, achievement details, and official recognition from Cincinnati Tamil Sangam.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ height: '100', p: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Certificate Benefits
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Typography variant="body2">
                        • Official recognition of your service
                      </Typography>
                      <Typography variant="body2">
                        • Professional development documentation
                      </Typography>
                      <Typography variant="body2">
                        • Resume enhancement for career opportunities
                      </Typography>
                      <Typography variant="body2">
                        • Shareable achievement on social media
                      </Typography>
                      <Typography variant="body2">
                        • Eligibility for advanced volunteer roles
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>

        {/* Certificate Types */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Certificate Types"
              subtitle="Different categories of recognition"
              align="center"
              showDivider={true}
            />
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ height: '100', p: 3 }}>
                  <CardContent>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        mb: 2,
                        backgroundColor: 'primary.main',
                        color: 'white',
                      }}
                    >
                      <School />
                    </Avatar>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Service Certificates
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Recognition for volunteer service hours and commitment to our community programs.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ height: '100', p: 3 }}>
                  <CardContent>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        mb: 2,
                        backgroundColor: 'secondary.main',
                        color: 'white',
                      }}
                    >
                      <MilitaryTech />
                    </Avatar>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Skill Certificates
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Recognition for developing specific skills like teaching, event management, and leadership.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ height: '100', p: 3 }}>
                  <CardContent>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        mb: 2,
                        backgroundColor: 'warning.main',
                        color: 'white',
                      }}
                    >
                      <WorkspacePremium />
                    </Avatar>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Achievement Certificates
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Recognition for special achievements, milestones, and outstanding contributions.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Request Certificate */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <SectionTitle
              title="Request a Certificate"
              subtitle="Need a certificate for your service?"
              align="center"
              showDivider={true}
            />
            
            <Card sx={{ p: 3, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="body1" paragraph>
                  If you believe you&apos;ve earned a certificate but haven&apos;t received it yet, or need a replacement, we&apos;re here to help!
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Our team will review your volunteer history and issue appropriate certificates within 5-7 business days.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
                  <Button variant="contained">
                    Request Certificate
                  </Button>
                  <Button variant="outlined">
                    Contact Support
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
