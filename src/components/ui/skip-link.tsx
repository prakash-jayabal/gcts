'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ACCESSIBILITY } from '@/constants/app';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <Button
      href={href}
      sx={{
        position: 'absolute',
        top: -40,
        left: 6,
        backgroundColor: 'primary.main',
        color: 'white',
        padding: 1,
        textDecoration: 'none',
        zIndex: 9999,
        '&:focus': {
          top: 6,
        },
      }}
    >
      {children}
    </Button>
  );
}

export function SkipToContent() {
  return (
    <SkipLink href={`#${ACCESSIBILITY.MAIN_CONTENT_ID}`}>
      Skip to main content
    </SkipLink>
  );
}

export function SkipToNavigation() {
  return (
    <SkipLink href="#navigation">
      Skip to navigation
    </SkipLink>
  );
}

// Announcement component for screen readers
export function ScreenReaderAnnouncement({ message }: { message: string }) {
  return (
    <Box
      id={ACCESSIBILITY.ANNOUNCEMENT_ID}
      sx={{
        position: 'absolute',
        left: -10000,
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <Typography sx={{ position: 'absolute', left: -10000, width: 1, height: 1, overflow: 'hidden' }}>
        {message}
      </Typography>
    </Box>
  );
}

// Focus management hook
export function useFocusManagement() {
  const trapFocus = (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            event.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    firstFocusable?.focus();

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  };

  return { trapFocus };
}
