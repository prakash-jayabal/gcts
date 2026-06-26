export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  category: EventCategory;
  isFeatured?: boolean;
  ticketPrice?: number;
  maxAttendees?: number;
  currentAttendees?: number;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  membershipType: MembershipType;
  joinDate: string;
  isBoardMember?: boolean;
  position?: string;
  profileImage?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: GalleryCategory;
  uploadDate: string;
  tags?: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface NewsletterSubscription {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export type EventCategory = 
  | 'cultural'
  | 'religious'
  | 'educational'
  | 'social'
  | 'fundraiser'
  | 'workshop';

export type MembershipType = 
  | 'individual'
  | 'family'
  | 'student'
  | 'senior'
  | 'lifetime';

export type GalleryCategory = 
  | 'events'
  | 'cultural'
  | 'community'
  | 'temple'
  | 'education';

export type ThemeMode = 'light' | 'dark';
