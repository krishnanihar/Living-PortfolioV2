'use client';

import { useEffect } from 'react';
import { trackCaseStudyView } from '@/lib/personalization';

interface CaseStudyTrackerProps {
  slug: string;
}

/**
 * Client component that tracks case study views for personalization.
 * Add this component to any case study page to track when users view it.
 */
export function CaseStudyTracker({ slug }: CaseStudyTrackerProps) {
  useEffect(() => {
    trackCaseStudyView(slug);
  }, [slug]);

  // This component renders nothing
  return null;
}
