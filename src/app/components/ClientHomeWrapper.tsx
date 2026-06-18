'use client';

import { useState } from 'react';
import Link from 'next/link';
import BookingModal from './BookingModal';

interface ClientHomeWrapperProps {
  lng: 'de' | 'en';
  dict: any;
  children: React.ReactNode;
}

export default function ClientHomeWrapper({
  lng,
  dict,
  children,
}: ClientHomeWrapperProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const scrollToMenu = () => {
    document
      .getElementById('menu-section')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Header */}
      <header className='border-b border-tuscan-olive/10 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50'>
        <span className='font-serif text-2xl font-bold text-tuscan-olive tracking-tight'>
          {dict.brand}
        </span>
        <div className='flex items-center gap-6'>
          <div className='text-sm font-semibold tracking-wide flex gap-2'>
            <Link
              href='/de'
              className={
                lng === 'de'
                  ? 'text-tuscan-clay underline font-bold'
                  : 'text-tuscan-espresso/60'
              }
            >
              DE
            </Link>
            <span className='text-tuscan-espresso/20'>|</span>
            <Link
              href='/en'
              className={
                lng === 'en'
                  ? 'text-tuscan-clay underline font-bold'
                  : 'text-tuscan-espresso/60'
              }
            >
              EN
            </Link>
          </div>
          <button
            onClick={() => setIsBookingOpen(true)}
            className='bg-tuscan-clay text-white px-5 py-2 rounded font-medium shadow-sm hover:bg-tuscan-clay/90 transition-colors cursor-pointer'
          >
            {dict.ctaBook}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className='py-24 px-4 max-w-4xl mx-auto text-center'>
        <h1 className='font-serif text-5xl md:text-6xl font-bold tracking-tight mb-6 text-tuscan-espresso leading-tight'>
          {dict.heroTitle}
        </h1>
        <p className='text-sm font-semibold tracking-wider text-tuscan-clay uppercase mb-4'>
          {dict.owners}
        </p>
        <p className='text-lg md:text-xl text-tuscan-espresso/80 max-w-2xl mx-auto mb-10'>
          {dict.heroSubtitle}
        </p>
        <div className='flex flex-wrap justify-center gap-4'>
          <button
            onClick={scrollToMenu}
            className='bg-tuscan-olive text-white px-6 py-3 rounded-md font-medium shadow-md hover:bg-tuscan-olive/90 transition-all cursor-pointer'
          >
            {dict.ctaMenu}
          </button>
          <button
            onClick={() => setIsBookingOpen(true)}
            className='bg-white border border-tuscan-olive/30 text-tuscan-espresso px-6 py-3 rounded-md font-medium shadow-sm hover:bg-black/5 transition-all cursor-pointer'
          >
            {dict.ctaBook}
          </button>
        </div>
      </section>

      {/* Render the server layout node safely here directly */}
      <div id='menu-section' className='scroll-mt-24 max-w-5xl mx-auto py-12'>
        {children}
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        dict={dict}
      />
    </>
  );
}
