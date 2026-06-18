'use client';

import { useEffect, useState } from 'react';

interface StatusProps {
  lng: 'de' | 'en';
  dict: {
    statusOpen: string;
    statusClosed: string;
    statusClosingSoon: string;
    weWelcomeYou: string;
    kitchenClosed: string;
  };
}

export default function OpeningStatus({ lng, dict }: StatusProps) {
  const [status, setStatus] = useState<'open' | 'closed' | 'closing-soon'>(
    'closed',
  );

  useEffect(() => {
    const checkStatus = () => {
      // Get current local time adjusted to Germany/Europe/Berlin time zone
      const now = new Date();
      const localizedTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }),
      );

      const day = localizedTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hours = localizedTime.getHours();
      const minutes = localizedTime.getMinutes();
      const currentTimeInMinutes = hours * 60 + minutes;

      // Monday is Ruhetag (Closed)
      if (day === 1) {
        setStatus('closed');
        return;
      }

      // Sunday hours: 6:00 PM - 10:00 PM (720 to 1260 minutes)
      if (day === 0) {
        if (currentTimeInMinutes >= 720 && currentTimeInMinutes < 1260) {
          setStatus(
            1260 - currentTimeInMinutes <= 30 ? 'closing-soon' : 'open',
          );
        } else {
          setStatus('closed');
        }
        return;
      }

      // Tuesday to Saturday hours: 6:00 PM - 9:00 PM (1080 to 1260 minutes)
      if (currentTimeInMinutes >= 1080 && currentTimeInMinutes < 1260) {
        setStatus(1260 - currentTimeInMinutes <= 30 ? 'closing-soon' : 'open');
      } else {
        setStatus('closed');
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Re-verify status every minute
    return () => clearInterval(interval);
  }, []);

  const config = {
    open: {
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-700',
      dotColor: 'bg-emerald-500',
      label: dict.statusOpen,
      sub: dict.weWelcomeYou,
    },
    'closing-soon': {
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-700',
      dotColor: 'bg-amber-500',
      label: dict.statusClosingSoon,
      sub: dict.kitchenClosed,
    },
    closed: {
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      textColor: 'text-rose-700',
      dotColor: 'bg-rose-500',
      label: dict.statusClosed,
      sub: dict.kitchenClosed,
    },
  };

  const currentConfig = config[status];

  return (
    <div
      className={`max-w-xl mx-auto mb-8 p-4 rounded-lg border flex items-center gap-4 transition-all duration-300 ${currentConfig.bgColor} ${currentConfig.borderColor}`}
    >
      <span className='relative flex h-3 w-3'>
        {status !== 'closed' && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentConfig.dotColor}`}
          ></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-3 w-3 ${currentConfig.dotColor}`}
        ></span>
      </span>
      <div>
        <h5
          className={`font-sans font-bold text-sm uppercase tracking-wider ${currentConfig.textColor}`}
        >
          {currentConfig.label}
        </h5>
        <p className='text-xs text-tuscan-espresso/70 mt-0.5'>
          {currentConfig.sub}
        </p>
      </div>
    </div>
  );
}
