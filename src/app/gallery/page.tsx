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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search,
  Close,
  CalendarToday,
  LocationOn,
  Category,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import GalleryCard from '@/components/ui/gallery-card';
import { mockGallery } from '@/data/components-mock';

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<(typeof mockGallery)[0] | null>(null);
  const [filteredGallery, setFilteredGallery] = useState(mockGallery);

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'events', label: 'Events' },
    { value: 'cultural', label: 'Cultural Programs' },
    { value: 'education', label: 'Education' },
    { value: 'community', label: 'Community' },
    { value: 'religious', label: 'Religious' },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterGallery(query, selectedCategory);
  };

  const handleCategoryChange = (event: { target: { value: unknown } }) => {
    const category = event.target.value as string;
    setSelectedCategory(category);
    filterGallery(searchQuery, category);
  };

  const filterGallery = (query: string, category: string) => {
    let filtered = mockGallery;

    // Filter by search query
    if (query) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    setFilteredGallery(filtered);
  };

  const handleImageClick = (image: typeof mockGallery[0]) => {
    setSelectedImage(image);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  const galleryStats = {
    totalPhotos: mockGallery.length,
    events: mockGallery.filter(item => item.category === 'events').length,
    cultural: mockGallery.filter(item => item.category === 'cultural').length,
    education: mockGallery.filter(item => item.category === 'education').length,
    community: mockGallery.filter(item => item.category === 'community').length,
    religious: mockGallery.filter(item => item.category === 'religious').length,
  };

  return (
    <AppLayout>
      <PageHeader
        title="Gallery"
        subtitle="Memories & Celebrations"
        actions={[
          {
            label: 'Share Photos',
            href: '#',
            variant: 'contained',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Gallery Stats */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <SectionTitle
            title="Our Photo Gallery"
            subtitle="Capturing Our Community Moments"
            description="Browse through our collection of photos from events, cultural programs, and community gatherings"
            align="center"
            showDivider={true}
          />
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main" fontWeight={700}>
                  {galleryStats.totalPhotos}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Photos
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main" fontWeight={700}>
                  {galleryStats.events}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Events
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main" fontWeight={700}>
                  {galleryStats.cultural}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cultural
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main" fontWeight={700}>
                  {galleryStats.education}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Education
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main" fontWeight={700}>
                  {galleryStats.community}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Community
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main" fontWeight={700}>
                  {galleryStats.religious}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Religious
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Search and Filter */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                placeholder="Search photos..."
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
            <Grid size={{ xs: 12, md: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setFilteredGallery(mockGallery);
                }}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Gallery Grid */}
        <Box sx={{ mb: 6 }}>
          {filteredGallery.length > 0 ? (
            <Grid container spacing={3}>
              {filteredGallery.map((item) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                  <Box
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleImageClick(item)}
                  >
                    <GalleryCard
                      {...item}
                      showOverlay={true}
                      aspectRatio="square"
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No photos found
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Try adjusting your search or filter criteria.
              </Typography>
            </Box>
          )}
        </Box>

        {/* Featured Albums */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Featured Albums"
              subtitle="Collections by Event"
              description="Explore our curated photo collections from major events and celebrations"
              align="center"
              showDivider={true}
            />
            
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ height: '100%', cursor: 'pointer', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
                  <Box
                    sx={{
                      height: 200,
                      backgroundImage: 'url(/images/gallery/pongal-2024.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '12px 12px 0 0',
                    }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Pongal Celebration 2024
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Our biggest annual celebration with traditional Pongal pot boiling, cultural performances, and community feast.
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                      <Typography variant="caption" color="text.secondary">
                        January 15, 2024
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                      <LocationOn sx={{ fontSize: 16, color: 'action.active' }} />
                      <Typography variant="caption" color="text.secondary">
                        CTS Cultural Center
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ height: '100%', cursor: 'pointer', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
                  <Box
                    sx={{
                      height: 200,
                      backgroundImage: 'url(/images/gallery/tamil-new-year.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '12px 12px 0 0',
                    }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Tamil New Year 2024
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Traditional Tamil New Year celebrations with cultural programs, special prayers, and festive activities.
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                      <Typography variant="caption" color="text.secondary">
                        April 14, 2024
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                      <LocationOn sx={{ fontSize: 16, color: 'action.active' }} />
                      <Typography variant="caption" color="text.secondary">
                        Hindu Temple of Cincinnati
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ height: '100%', cursor: 'pointer', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
                  <Box
                    sx={{
                      height: 200,
                      backgroundImage: 'url(/images/gallery/youth-competition.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '12px 12px 0 0',
                    }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Youth Cultural Competition
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Annual competition showcasing talents in music, dance, and oratory among our youth members.
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                      <Typography variant="caption" color="text.secondary">
                        March 10, 2024
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                      <LocationOn sx={{ fontSize: 16, color: 'action.active' }} />
                      <Typography variant="caption" color="text.secondary">
                        CTS Cultural Center
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Image Detail Dialog */}
        <Dialog
          open={!!selectedImage}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          {selectedImage && (
            <>
              <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={600}>
                  {selectedImage.title}
                </Typography>
                <Button onClick={handleCloseDialog} sx={{ minWidth: 'auto' }}>
                  <Close />
                </Button>
              </DialogTitle>
              <DialogContent>
                <Box
                  component="img"
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 400,
                    objectFit: 'contain',
                    borderRadius: 1,
                  }}
                />
                <Box sx={{ mt: 2 }}>
                  {selectedImage.description && (
                    <Typography variant="body1" paragraph>
                      {selectedImage.description}
                    </Typography>
                  )}
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    {selectedImage.category && (
                      <Chip
                        icon={<Category />}
                        label={selectedImage.category}
                        size="small"
                        variant="outlined"
                      />
                    )}
                    {selectedImage.date && (
                      <Chip
                        icon={<CalendarToday />}
                        label={new Date(selectedImage.date).toLocaleDateString()}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions sx={{ p: 3 }}>
                <Button onClick={handleCloseDialog}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </AppLayout>
  );
}
