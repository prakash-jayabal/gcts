export const APP_NAME = 'Cincinnati Tamil Sangam';
export const APP_DESCRIPTION = 'Celebrating Tamil culture and heritage in Cincinnati';

export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About GCTS', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Membership', href: '/membership' },
  { label: 'Youth Programs', href: '/youth-programs' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'News', href: '/news' },
  { label: 'Donate', href: '/donate' },
  { label: 'Contact', href: '/contact' },
  { label: 'Login', href: '/login' },
] as const;

export const MOBILE_NAV_ITEMS = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'Events', href: '/events', icon: 'Event' },
  { label: 'Membership', href: '/membership', icon: 'People' },
  { label: 'Gallery', href: '/gallery', icon: 'Photo' },
  { label: 'Contact', href: '/contact', icon: 'Message' },
] as const;

export const SOCIAL_LINKS = [
  { platform: 'Facebook', url: 'https://facebook.com/cincinnatitamil' },
  { platform: 'Instagram', url: 'https://instagram.com/cincinnatitamil' },
  { platform: 'YouTube', url: 'https://youtube.com/cincinnatitamil' },
  { platform: 'Email', url: 'mailto:info@cincinnatitamil.org' },
] as const;

export const CONTACT_INFO = {
  email: 'info@cincinnatitamil.org',
  phone: '+1 (513) 123-4567',
  address: '123 Tamil Lane, Cincinnati, OH 45201',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
} as const;

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;
