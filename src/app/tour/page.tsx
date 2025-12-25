'use client';

import { useRouter } from 'next/navigation';
import { ScrollytellingTour } from '@/components/concept/ScrollytellingTour';

export default function TourPage() {
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  const handleContact = () => {
    // Navigate to home and trigger contact view
    router.push('/?view=contact');
  };

  return (
    <ScrollytellingTour
      onClose={handleClose}
      onContact={handleContact}
    />
  );
}
