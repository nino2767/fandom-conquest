'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import MapView from '@/components/mockup/views/MapView';

export default function MapPage() {
  const router = useRouter();

  return <MapView onNavigateToVerif={() => router.push('/verify')} />;
}
