'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import OnboardingView from '@/components/mockup/views/OnboardingView';

export default function OnboardingPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/map');
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <OnboardingView onCompleteOnboarding={handleComplete} />
    </div>
  );
}
