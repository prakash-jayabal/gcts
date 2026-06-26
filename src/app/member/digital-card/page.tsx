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
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CreditCard,
  Person,
  Email,
  Phone,
  CalendarToday,
  Download,
  Share,
  QrCode2,
  CheckCircle,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import { mockMemberData } from '@/data/portal-mock';

export default function DigitalMembershipCardPage() {
  const { profile, familyMembers } = mockMemberData;
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState('primary');

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setShareDialogOpen(false);
  };

  const handleDownload = () => {
    // In a real app, this would download the card as an image
    console.log('Downloading membership card...');
  };

  const generateCardNumber = () => {
    return `CTS-${profile.id}-${profile.membershipType.toUpperCase()}`;
  };

  const formatExpiryDate = () => {
    const expiryDate = new Date(profile.renewalDate);
    return `${expiryDate.getMonth() + 1}/${expiryDate.getFullYear().toString().slice(2)}`;
  };

  const memberCards = [
    {
      id: 'primary',
      title: 'Primary Member Card',
      name: `${profile.firstName} ${profile.lastName}`,
      membershipType: profile.membershipType,
      memberSince: profile.memberSince,
      validUntil: profile.renewalDate,
      cardNumber: generateCardNumber(),
      avatar: profile.avatar,
    },
    ...familyMembers.map((member, index) => ({
      id: `family-${index}`,
      title: `Family Member Card`,
      name: member.name,
      membershipType: profile.membershipType,
      memberSince: member.memberSince,
      validUntil: profile.renewalDate,
      cardNumber: generateCardNumber(),
      avatar: null,
    })),
  ];

  const currentCard = memberCards.find(card => card.id === selectedCard) || memberCards[0];

  return (
    <AppLayout>
      <PageHeader
        title="Digital Membership Card"
        subtitle="Your CTS Membership Card"
        actions={[
          {
            label: 'Share Card',
            href: '#',
            variant: 'outlined',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Card Selection */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <SectionTitle
            title="Select Card"
            subtitle="Choose which membership card to display"
            align="center"
            showDivider={true}
          />
          
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {memberCards.map((card) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.id}>
                <Button
                  variant={selectedCard === card.id ? 'contained' : 'outlined'}
                  onClick={() => setSelectedCard(card.id)}
                  sx={{ p: 2, width: '100%' }}
                >
                  <Typography variant="body2">
                    {card.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {card.name}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Digital Card Display */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <Box sx={{ maxWidth: 600, mx: 'auto' }}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 50%, #42a5f5 100%)',
                  color: 'white',
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                  minHeight: 350,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Card Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                    <Box>
                      <Typography variant="caption" sx={{ opacity: 0.8, mb: 1 }}>
                        Cincinnati Tamil Sangam
                      </Typography>
                      <Typography variant="h5" fontWeight={600} gutterBottom>
                        {currentCard.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip
                          label={currentCard.membershipType.charAt(0).toUpperCase() + currentCard.membershipType.slice(1)}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                          }}
                        />
                        <Chip
                          label="Active"
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(76, 175, 80, 0.8)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                          }}
                        />
                      </Box>
                    </Box>
                    <Avatar
                      src={currentCard.avatar || undefined}
                      sx={{
                        width: 60,
                        height: 60,
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      {currentCard.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                  </Box>

                  {/* Card Number */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="caption" sx={{ opacity: 0.8, mb: 1 }}>
                      Membership Number
                    </Typography>
                    <Typography variant="h6" sx={{ letterSpacing: 2, fontFamily: 'monospace' }}>
                      {currentCard.cardNumber}
                    </Typography>
                  </Box>

                  {/* Card Details */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Box>
                      <Typography variant="caption" sx={{ opacity: 0.8, mb: 1 }}>
                        Member Since
                      </Typography>
                      <Typography variant="body2">
                        {new Date(currentCard.memberSince).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" sx={{ opacity: 0.8, mb: 1 }}>
                        Valid Until
                      </Typography>
                      <Typography variant="body2">
                        {new Date(currentCard.validUntil).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Card Watermark */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      opacity: 0.1,
                      fontSize: 120,
                      fontWeight: 700,
                      pointerEvents: 'none',
                    }}
                  >
                    CTS
                  </Box>
                </CardContent>
              </Card>

              {/* Card Actions */}
              <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  onClick={handleDownload}
                  sx={{ borderRadius: 2 }}
                >
                  Download Card
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Share />}
                  onClick={handleShare}
                  sx={{ borderRadius: 2 }}
                >
                  Share Card
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Card Features */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <SectionTitle
              title="Card Benefits"
              subtitle="What Your Digital Card Offers"
              align="center"
              showDivider={true}
            />
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Event Access
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Show your card for free or discounted entry to CTS events
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <QrCode2 sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      QR Code
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quick verification at events and programs
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <CreditCard sx={{ fontSize: 48, color: 'info.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Digital Format
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Always accessible on your mobile device
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <Person sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Family Cards
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Individual cards for all family members
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>

        {/* Usage Instructions */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="How to Use Your Digital Card"
              subtitle="Simple Steps for Verification"
              align="center"
              showDivider={true}
            />
            
            <Card sx={{ p: 3 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Avatar sx={{ backgroundColor: 'primary.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                        <QrCode2 />
                      </Avatar>
                    </Box>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      1. Show QR Code
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Display your digital card with QR code for quick scanning
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Avatar sx={{ backgroundColor: 'primary.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                        <Person />
                      </Avatar>
                    </Box>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      2. Verify Identity
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Staff will verify your membership status and details
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Avatar sx={{ backgroundColor: 'primary.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                        <CheckCircle />
                      </Avatar>
                    </Box>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      3. Access Granted
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Enjoy your member benefits and event access
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Container>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Share Membership Card</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body2" color="text.secondary" paragraph>
              Share your digital membership card with family members or save it for quick access
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="outlined" startIcon={<Email />}>
                Send via Email
              </Button>
              <Button variant="outlined" startIcon={<Phone />}>
                Send via SMS
              </Button>
              <Button variant="outlined" startIcon={<Download />}>
                Save to Device
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
}
