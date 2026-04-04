'use client';

import dynamic from 'next/dynamic';

const PeruScrollyMap = dynamic(
  () => import('@/components/scrolly/PeruScrollyMap'),
  { ssr: false }
);

export function PeruStorySection() {
  return (
    <section className="relative w-full bg-white">
      
      {/* Intro */}
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-red-700/70">
          Explore the Culture
        </p>

        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-red-900">
          Discover dance traditions across Peru
        </h2>

        <p className="mt-4 text-gray-600">
          Scroll through regions to explore how movement, music, and tradition vary across the country.
        </p>
      </div>

      {/* Scrolly Map */}
      <div className="relative">
        <PeruScrollyMap />
      </div>

    </section>
  );
}