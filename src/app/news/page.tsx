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
  Avatar,
  Divider,
} from '@mui/material';
import {
  Search,
  CalendarToday,
  Person,
  ArrowForward,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const newsArticles = [
    {
      id: '1',
      title: 'Pongal Celebration 2024 - Record Attendance!',
      excerpt: 'Our annual Pongal celebration saw over 300 community members gathering to celebrate the harvest festival with traditional food, cultural performances, and family activities.',
      content: 'The Cincinnati Tamil Sangam&apos;s annual Pongal celebration was a tremendous success this year, with record attendance of over 300 community members. The event featured traditional Pongal pot boiling ceremonies, authentic Tamil cuisine, cultural performances by local talent, and engaging activities for children of all ages. Families gathered to share in the joy of this important harvest festival, strengthening community bonds and preserving our cultural heritage for future generations.',
      author: 'Priya Ranganathan',
      authorRole: 'Cultural Programs Director',
      date: '2024-01-15',
      category: 'events',
      imageUrl: '/images/news/pongal-2024.jpg',
      readTime: '5 min read',
      featured: true,
    },
    {
      id: '2',
      title: 'New Tamil Language Class Schedule Announced',
      excerpt: 'We&apos;re excited to announce expanded class schedules for both children and adults, with new beginner-level classes starting this February.',
      content: 'Cincinnati Tamil Sangam is pleased to announce an expanded schedule for our Tamil language classes. Starting this February, we will offer additional beginner-level classes for both children and adults to accommodate growing demand. The new schedule includes weekend classes, weekday evening options, and special intensive workshops during school breaks. Our experienced instructors are committed to making Tamil language learning accessible and enjoyable for students of all ages and skill levels.',
      author: 'Dr. Arun Kumar',
      authorRole: 'Education Committee Chair',
      date: '2024-01-28',
      category: 'education',
      imageUrl: '/images/news/tamil-classes.jpg',
      readTime: '3 min read',
      featured: false,
    },
    {
      id: '3',
      title: 'Youth Cultural Competition Registration Open',
      excerpt: 'Registration is now open for our annual youth cultural competition featuring music, dance, and oratory categories for children aged 5-18.',
      content: 'Registration for our annual youth cultural competition is now open! This prestigious event showcases the incredible talents of our community&apos;s youth in categories including classical music, traditional dance, folk arts, and Tamil oratory. Children aged 5-18 are encouraged to participate and develop their cultural skills while building confidence and friendships. The competition will be held on March 10th at our cultural center, with prizes and recognition for outstanding performers.',
      author: 'Anita Venkatesh',
      authorRole: 'Youth Programs Director',
      date: '2024-02-05',
      category: 'youth',
      imageUrl: '/images/news/youth-competition.jpg',
      readTime: '4 min read',
      featured: false,
    },
    {
      id: '4',
      title: 'Community Service Initiative Launch',
      excerpt: 'CTS launches new community service program to give back to the broader Cincinnati community through volunteer activities.',
      content: 'In line with our commitment to being good neighbors and contributing positively to our adopted home, Cincinnati Tamil Sangam is launching a new community service initiative. This program will organize regular volunteer activities, food drives, and cultural exchange programs with other community organizations. Our goal is to share our rich culture while making meaningful contributions to the broader Cincinnati community through service and collaboration.',
      author: 'Rajesh Menon',
      authorRole: 'Community Outreach Coordinator',
      date: '2024-02-12',
      category: 'community',
      imageUrl: '/images/news/community-service.jpg',
      readTime: '6 min read',
      featured: true,
    },
    {
      id: '5',
      title: 'Tamil New Year Celebrations Planned',
      excerpt: 'Join us for traditional Tamil New Year celebrations with cultural programs, special prayers, and festive activities for the whole family.',
      content: 'Mark your calendars for our Tamil New Year celebration on April 14th! This year&apos;s festivities will include traditional cultural performances, special prayers for prosperity and well-being, authentic Tamil cuisine, and activities for children. The celebration will be held at the Hindu Temple of Cincinnati, followed by a community gathering at our cultural center. All community members are invited to participate in this important cultural event.',
      author: 'Mohan Balasubramanian',
      authorRole: 'Cultural Director',
      date: '2024-02-20',
      category: 'events',
      imageUrl: '/images/news/tamil-new-year.jpg',
      readTime: '5 min read',
      featured: false,
    },
    {
      id: '6',
      title: 'Membership Drive Success',
      excerpt: 'Our recent membership drive exceeded expectations with 50+ new families joining our growing community.',
      content: 'Thanks to the incredible efforts of our volunteer team and the warm welcome from existing members, our recent membership drive was a tremendous success. Over 50 new families have joined Cincinnati Tamil Sangam, bringing our total membership to more than 500 families. This growth reflects the vibrant and welcoming nature of our community and the importance of preserving our Tamil heritage in Cincinnati.',
      author: 'Lakshmi Srinivasan',
      authorRole: 'Membership Coordinator',
      date: '2024-02-25',
      category: 'membership',
      imageUrl: '/images/news/membership-drive.jpg',
      readTime: '4 min read',
      featured: false,
    },
  ];

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'events', label: 'Events' },
    { value: 'education', label: 'Education' },
    { value: 'youth', label: 'Youth Programs' },
    { value: 'community', label: 'Community' },
    { value: 'membership', label: 'Membership' },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (event: { target: { value: unknown } }) => {
    const category = event.target.value as string;
    setSelectedCategory(category);
  };

  const filteredNews = newsArticles.filter(article => {
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = newsArticles.filter(article => article.featured);
  const recentArticles = filteredNews.filter(article => !article.featured);

  return (
    <AppLayout>
      <PageHeader
        title="News & Updates"
        subtitle="Stay Connected with Our Community"
        actions={[
          {
            label: 'Subscribe to Newsletter',
            href: '#newsletter',
            variant: 'contained',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Featured Articles */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <SectionTitle
            title="Featured Stories"
            subtitle="Highlights from Our Community"
            description="Important announcements and featured stories from Cincinnati Tamil Sangam"
            align="center"
            showDivider={true}
          />
          
          <Grid container spacing={4}>
            {featuredArticles.map((article) => (
              <Grid size={{ xs: 12, md: 6 }} key={article.id}>
                <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
                  <Box
                    sx={{
                      height: 200,
                      backgroundImage: `url(${article.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '12px 12px 0 0',
                    }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Chip label={article.category} size="small" color="primary" variant="outlined" />
                      <Typography variant="caption" color="text.secondary">
                        {article.readTime}
                      </Typography>
                    </Box>
                    <Typography variant="h5" gutterBottom fontWeight={600}>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {article.excerpt}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                          {article.author.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Typography variant="caption" fontWeight={500}>
                            {article.author}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {article.authorRole}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(article.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      variant="text"
                      endIcon={<ArrowForward />}
                      sx={{ mt: 2, p: 0 }}
                    >
                      Read Full Article
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Search and Filter */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                placeholder="Search news articles..."
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
                }}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Recent Articles */}
        <Box sx={{ mb: 6 }}>
          <SectionTitle
            title="Recent News"
            subtitle="Latest Updates"
            description="Stay informed with the latest news and announcements from our community"
            align="left"
            showDivider={true}
          />
          
          {recentArticles.length > 0 ? (
            <Grid container spacing={4}>
              {recentArticles.map((article) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
                  <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
                    <Box
                      sx={{
                        height: 150,
                        backgroundImage: `url(${article.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '12px 12px 0 0',
                      }}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Chip label={article.category} size="small" color="primary" variant="outlined" />
                        <Typography variant="caption" color="text.secondary">
                          {article.readTime}
                        </Typography>
                      </Box>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {article.excerpt}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <CalendarToday sx={{ fontSize: 16, color: 'action.active' }} />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(article.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Button
                        variant="text"
                        endIcon={<ArrowForward />}
                        sx={{ p: 0 }}
                      >
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No articles found
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Try adjusting your search or filter criteria.
              </Typography>
            </Box>
          )}
        </Box>

        {/* Newsletter Signup */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Box
              id="newsletter"
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                borderRadius: 4,
                p: { xs: 4, md: 6 },
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" gutterBottom fontWeight={600}>
                Stay Updated
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                Subscribe to our newsletter to receive the latest news, event announcements, and community updates directly in your inbox.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  maxWidth: 500,
                  mx: 'auto',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <TextField
                  placeholder="Enter your email"
                  variant="outlined"
                  fullWidth
                  sx={{
                    backgroundColor: 'common.white',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'secondary.main',
                    color: 'secondary.contrastText',
                    '&:hover': {
                      backgroundColor: 'secondary.dark',
                    },
                    borderRadius: 2,
                    px: 4,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>
    </AppLayout>
  );
}
