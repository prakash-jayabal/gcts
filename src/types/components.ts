// UI Component TypeScript Interfaces

export interface HeroBannerProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  primaryAction?: {
    label: string;
    href: string;
    variant?: 'contained' | 'outlined';
  };
  secondaryAction?: {
    label: string;
    href: string;
    variant?: 'contained' | 'outlined';
  };
  height?: 'small' | 'medium' | 'large';
  overlay?: boolean;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: boolean;
  actions?: Array<{
    label: string;
    href: string;
    variant?: 'contained' | 'outlined';
    icon?: React.ReactNode;
  }>;
}

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  description?: string;
  showDivider?: boolean;
}

export interface StatisticsCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  action?: {
    label: string;
    href: string;
  };
  variant?: 'default' | 'outlined' | 'elevated';
}

export interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  category?: string;
  price?: number;
  isFeatured?: boolean;
  showActions?: boolean;
}

export interface ProgramCardProps {
  id: string;
  title: string;
  description: string;
  ageGroup?: string;
  schedule?: string;
  instructor?: string;
  imageUrl?: string;
  price?: number;
  duration?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  showActions?: boolean;
}

export interface GalleryCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category?: string;
  date?: string;
  description?: string;
  showOverlay?: boolean;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface TestimonialCardProps {
  id: string;
  name: string;
  role?: string;
  content: string;
  rating?: number;
  avatar?: string;
  location?: string;
}

export interface SponsorData {
  id: string;
  name: string;
  logo: string;
  url?: string;
  tier?: 'platinum' | 'gold' | 'silver' | 'bronze';
}

export interface SponsorCarouselProps {
  sponsors: SponsorData[];
  title?: string;
  autoplay?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
}

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  type?: 'milestone' | 'event' | 'announcement';
  icon?: React.ReactNode;
  imageUrl?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  variant?: 'vertical' | 'horizontal';
  showDates?: boolean;
}

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onFilterChange?: (filters: Record<string, unknown>) => void;
  filters?: Array<{
    key: string;
    label: string;
    options: Array<{ label: string; value: unknown }>;
  }>;
  showFilters?: boolean;
  debounceMs?: number;
}

export interface FilterPanelProps {
  filters: Array<{
    key: string;
    label: string;
    type: 'checkbox' | 'radio' | 'select' | 'range';
    options?: Array<{ label: string; value: unknown }>;
    min?: number;
    max?: number;
  }>;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  onReset?: () => void;
  onApply?: () => void;
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'compact' | 'fullscreen';
}

export interface LoadingStateProps {
  message?: string;
  variant?: 'default' | 'skeleton' | 'spinner' | 'progress';
  size?: 'small' | 'medium' | 'large';
}

export interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  severity?: 'info' | 'success' | 'warning' | 'error';
}

export interface SnackbarMessage {
  id: string;
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface SnackbarContextType {
  showSnackbar: (message: string, severity?: SnackbarMessage['severity']) => void;
  closeSnackbar: (id: string) => void;
}
