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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore,
  School,
  MusicNote,
  SportsSoccer,
  Palette,
  Language,
  People,
  Star,
  AccessTime,
  AttachMoney,
} from '@mui/icons-material';
import AppLayout from '@/components/layout/app-layout';
import PageHeader from '@/components/ui/page-header';
import SectionTitle from '@/components/ui/section-title';
import ProgramCard from '@/components/ui/program-card';
import { mockPrograms } from '@/data/components-mock';

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
      id={`youth-program-tabpanel-${index}`}
      aria-labelledby={`youth-program-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function YouthProgramsPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const programCategories = [
    {
      id: 0,
      label: 'All Programs',
      icon: <School />,
    },
    {
      id: 1,
      label: 'Language Classes',
      icon: <Language />,
    },
    {
      id: 2,
      label: 'Music & Arts',
      icon: <MusicNote />,
    },
    {
      id: 3,
      label: 'Sports & Activities',
      icon: <SportsSoccer />,
    },
    {
      id: 4,
      label: 'Cultural Workshops',
      icon: <Palette />,
    },
  ];

  const getFilteredPrograms = (categoryId: number) => {
    if (categoryId === 0) return mockPrograms;
    
    // Filter programs based on category
    switch (categoryId) {
      case 1: // Language Classes
        return mockPrograms.filter(p => p.title.toLowerCase().includes('language') || p.title.toLowerCase().includes('tamil'));
      case 2: // Music & Arts
        return mockPrograms.filter(p => p.title.toLowerCase().includes('music') || p.title.toLowerCase().includes('dance'));
      case 3: // Sports & Activities
        return mockPrograms.filter(p => p.title.toLowerCase().includes('workshop'));
      case 4: // Cultural Workshops
        return mockPrograms.filter(p => p.title.toLowerCase().includes('classical'));
      default:
        return mockPrograms;
    }
  };

  const youthBenefits = [
    {
      title: 'Cultural Identity',
      description: 'Help children connect with their Tamil heritage and develop a strong cultural identity.',
      icon: '🎭',
    },
    {
      title: 'Language Skills',
      description: 'Learn to read, write, and speak Tamil fluently while connecting with family and community.',
      icon: '📚',
    },
    {
      title: 'Social Development',
      description: 'Build friendships and social skills in a supportive, culturally-rich environment.',
      icon: '👥',
    },
    {
      title: 'Confidence Building',
      description: 'Develop self-confidence through performances, presentations, and cultural activities.',
      icon: '⭐',
    },
    {
      title: 'Family Connection',
      description: 'Strengthen family bonds through shared cultural experiences and activities.',
      icon: '🏠',
    },
    {
      title: 'Leadership Skills',
      description: 'Develop leadership qualities through group activities and community involvement.',
      icon: '🎯',
    },
  ];

  const faqs = [
    {
      question: 'What age groups do you serve?',
      answer: 'Our programs are designed for children and youth ages 5-18. We offer age-appropriate classes and activities for different developmental stages.',
    },
    {
      question: 'Are parents required to stay during classes?',
      answer: 'For younger children (ages 5-8), we recommend parents stay on-site. For older children, parents are welcome to drop off and pick up at scheduled times.',
    },
    {
      question: 'Do you offer trial classes?',
      answer: 'Yes! We offer a free trial class for new students. This allows your child to experience the program before committing.',
    },
    {
      question: 'Are there any prerequisites for enrollment?',
      answer: 'No prior knowledge of Tamil is required for beginner classes. We welcome students at all skill levels, from complete beginners to advanced learners.',
    },
    {
      question: 'How do I register my child for a program?',
      answer: 'You can register online through our website or in person at our cultural center. Early registration is recommended as classes fill up quickly.',
    },
    {
      question: 'Do you offer financial assistance?',
      answer: 'Yes, we offer scholarships and financial assistance for families who need support. Please contact us for more information about our assistance programs.',
    },
  ];

  return (
    <AppLayout>
      <PageHeader
        title="Youth Programs"
        subtitle="Nurturing the Next Generation"
        actions={[
          {
            label: 'Register Now',
            href: '/membership',
            variant: 'contained',
          },
          {
            label: 'Contact Us',
            href: '/contact',
            variant: 'outlined',
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <SectionTitle
            title="Empowering Tamil Youth"
            subtitle="Learn, Grow, and Celebrate"
            description="Our youth programs provide a nurturing environment where children can learn Tamil language, explore cultural traditions, and build lasting friendships"
            align="center"
            showDivider={true}
          />
          
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {youthBenefits.map((benefit) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={benefit.title}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <Box sx={{ fontSize: 48, mb: 2 }}>{benefit.icon}</Box>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Program Categories */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Our Programs"
              subtitle="Something for Every Age and Interest"
              description="Explore our diverse range of programs designed to engage, educate, and inspire young minds"
              align="center"
              showDivider={true}
            />
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Youth program categories"
              >
                {programCategories.map((category) => (
                  <Tab
                    key={category.id}
                    label={category.label}
                    icon={category.icon}
                    iconPosition="start"
                  />
                ))}
              </Tabs>
            </Box>

            {programCategories.map((category) => (
              <TabPanel key={category.id} value={tabValue} index={category.id}>
                <Grid container spacing={4}>
                  {getFilteredPrograms(category.id).map((program) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={program.id}>
                      <ProgramCard {...program} />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
            ))}
          </Container>
        </Box>

        {/* Program Schedule */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 6, md: 8 } }}>
            <SectionTitle
              title="Program Schedule"
              subtitle="When We Meet"
              description="Our programs run throughout the year with flexible scheduling options"
              align="center"
              showDivider={true}
            />
            
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ p: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Weekly Classes
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccessTime sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">
                          Saturdays: 10:00 AM - 2:00 PM
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccessTime sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">
                          Sundays: 2:00 PM - 6:00 PM
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTime sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">
                          Weekdays: 4:00 PM - 7:00 PM (select programs)
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ p: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Special Programs
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" paragraph>
                        • Summer Camp: June-August<br />
                        • Cultural Competition: March<br />
                        • Tamil New Year Celebration: April<br />
                        • Youth Leadership Summit: July<br />
                        • Community Service Projects: Year-round
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>

        {/* FAQ Section */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Frequently Asked Questions"
              subtitle="Get Your Questions Answered"
              description="Find answers to common questions about our youth programs"
              align="center"
              showDivider={true}
            />
            
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
              {faqs.map((faq, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6" fontWeight={600}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Call to Action */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 6, md: 8 } }}>
            <Box
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                borderRadius: 4,
                p: { xs: 4, md: 6 },
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" gutterBottom fontWeight={600}>
                Ready to Join Our Youth Programs?
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                Give your child the gift of cultural connection and lifelong friendships. 
                Register today and watch them thrive in our vibrant Tamil community.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  href="/membership"
                  sx={{
                    backgroundColor: 'secondary.main',
                    color: 'secondary.contrastText',
                    '&:hover': {
                      backgroundColor: 'secondary.dark',
                    },
                    borderRadius: 2,
                    px: 4,
                  }}
                >
                  Register for Programs
                </Button>
                <Button
                  variant="outlined"
                  href="/contact"
                  sx={{
                    borderColor: 'common.white',
                    color: 'common.white',
                    '&:hover': {
                      borderColor: 'common.white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    borderRadius: 2,
                    px: 4,
                  }}
                >
                  Schedule a Visit
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Container>
    </AppLayout>
  );
}
