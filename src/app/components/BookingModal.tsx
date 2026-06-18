'use client';

import { useState, useEffect } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  dict: any;
}

export default function BookingModal({
  isOpen,
  onClose,
  dict,
}: BookingModalProps) {
  // Master form inputs
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Validation feedback triggers
  const [todayString, setTodayString] = useState('');
  const [isMonday, setIsMonday] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  // 1. Calculate today's date in local format (YYYY-MM-DD)
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    setTodayString(`${year}-${month}-${day}`);
  }, [isOpen]);

  // 2. Perform live structural checks when the date selection input alters
  useEffect(() => {
    if (!date) {
      setTimeOptions([]);
      setIsMonday(false);
      setDateError(false);
      return;
    }

    if (date < todayString) {
      setDateError(true);
      setTimeOptions([]);
      setTime('');
      return;
    }
    setDateError(false);

    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    setTime('');

    if (dayOfWeek === 1) {
      setIsMonday(true);
      setTimeOptions([]);
      return;
    }

    setIsMonday(false);
    const generatedTimes: string[] = [];

    if (dayOfWeek === 0) {
      // Sonntag & Feiertags: 12:00 - 21:00
      for (let hour = 12; hour <= 20; hour++) {
        for (let min of ['00', '15', '30', '45']) {
          if (hour === 20 && min !== '00') continue;
          generatedTimes.push(`${hour}:${min}`);
        }
      }
      generatedTimes.push('21:00');
    } else {
      // Dienstag bis Samstag: 18:00 - 22:00
      for (let hour = 18; hour <= 21; hour++) {
        for (let min of ['00', '15', '30', '45']) {
          generatedTimes.push(`${hour}:${min}`);
        }
      }
      generatedTimes.push('22:00');
    }

    setTimeOptions(generatedTimes);
  }, [date, todayString]);

  if (!isOpen) return null;

  // Determine form input validity state flag
  const isFormInvalid = !name || !date || !time || isMonday || dateError;

  // 3. Generate dynamic WhatsApp link text template safely
  const formattedDate = date ? date.split('-').reverse().join('.') : '';
  const messageTemplate = `Salve Trattoria Toscana,
Buon giorno! Ich möchte gerne einen Tisch reservieren / I would like to request a table:

• Name: ${name}
• Personen / Guests: ${guests}
• Datum / Date: ${formattedDate}
• Uhrzeit / Time: ${time} Uhr

Grazie mille! Bitte bestätigen Sie mir, ob dieser Termin frei ist.`;

  const restaurantPhoneNumber = '491725425856';
  const whatsAppLink = `https://wa.me/${restaurantPhoneNumber}?text=${encodeURIComponent(messageTemplate)}`;

  // 4. Handle standard form submission actions
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormInvalid) return;

    // Safely execute cross-platform anchor click pipeline
    const anchor = document.createElement('a');
    anchor.href = whatsAppLink;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
      <div className='bg-tuscan-ivory border border-tuscan-olive/20 rounded-xl p-6 max-w-md w-full shadow-xl animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh] supports-touch:overflow-scrolling-touch'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <h3 className='font-serif text-2xl font-bold text-tuscan-espresso'>
              {dict.bookingTitle}
            </h3>
            <p className='text-sm text-tuscan-espresso/70'>
              {dict.bookingSubtitle}
            </p>
          </div>

          {/* Name Box */}
          <div>
            <label className='block text-xs font-bold uppercase tracking-wider text-tuscan-espresso/80 mb-1'>
              {dict.inputName}
            </label>
            <input
              required
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='z.B. Maria Rossi'
              className='w-full bg-white border border-tuscan-olive/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-tuscan-clay text-tuscan-espresso'
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className='block text-xs font-bold uppercase tracking-wider text-tuscan-espresso/80 mb-1'>
              {dict.inputDate}
            </label>
            <input
              required
              type='date'
              min={todayString}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full bg-white border rounded px-3 py-2 text-sm focus:outline-none text-tuscan-espresso ${
                dateError
                  ? 'border-rose-400 focus:border-rose-400 bg-rose-50'
                  : 'border-tuscan-olive/20 focus:border-tuscan-clay'
              }`}
            />
          </div>

          {/* Guest Metric & Dropdown */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-xs font-bold uppercase tracking-wider text-tuscan-espresso/80 mb-1'>
                {dict.inputGuests}
              </label>
              <input
                required
                type='number'
                min='1'
                max='30'
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className='w-full bg-white border border-tuscan-olive/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-tuscan-clay text-tuscan-espresso'
              />
            </div>

            <div>
              <label className='block text-xs font-bold uppercase tracking-wider text-tuscan-espresso/80 mb-1'>
                {dict.inputTime}
              </label>
              <select
                required
                disabled={!date || isMonday || dateError}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className='w-full bg-white disabled:bg-gray-100 disabled:cursor-not-allowed border border-tuscan-olive/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-tuscan-clay text-tuscan-espresso h-[38px]'
              >
                <option value=''>--:--</option>
                {timeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t} Uhr
                  </option>
                ))}
              </select>
            </div>
          </div>

          {dateError && (
            <div className='p-2.5 text-xs font-medium bg-rose-50 border border-rose-200 text-rose-700 rounded'>
              ⚠️ Datum darf nicht in der Vergangenheit liegen. / Date cannot be
              in the past.
            </div>
          )}

          {isMonday && !dateError && (
            <div className='p-2.5 text-xs font-medium bg-rose-50 border border-rose-200 text-rose-700 rounded'>
              ⚠️{' '}
              {dict.hoursMon || 'Montag Ruhetag - Wir haben heute geschlossen.'}
            </div>
          )}

          {/* Action Confirm Buttons Footer */}
          <div className='flex gap-3 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 border border-tuscan-olive/30 text-tuscan-espresso/80 px-4 py-2 rounded text-sm font-medium hover:bg-black/5 transition-colors cursor-pointer'
            >
              {dict.btnCancel}
            </button>

            <button
              type='submit'
              disabled={isFormInvalid}
              className={`flex-1 text-center font-medium text-sm py-2 px-4 rounded shadow flex items-center justify-center gap-2 transition-colors ${
                isFormInvalid
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
              }`}
            >
              <svg
                className='h-4 w-4 fill-current shrink-0'
                viewBox='0 0 24 24'
              >
                <path d='M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.948 0c3.179.001 6.167 1.24 8.414 3.486 2.246 2.248 3.48 5.239 3.478 8.42-.004 6.59-5.34 11.938-11.89 11.938-2.008-.002-3.982-.51-5.735-1.474L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.747 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.506 1.982 14.051.952 11.945.952c-5.438 0-9.863 4.37-9.867 9.8-.001 1.957.513 3.868 1.491 5.56l-.994 3.63 3.733-.969-.261-.155z' />
              </svg>
              {dict.btnSubmit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
