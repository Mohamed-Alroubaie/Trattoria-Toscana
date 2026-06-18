import { getDictionary } from '../dictionaries';
import MenuGrid from '../components/MenuGrid';
import ClientHomeWrapper from '../components/ClientHomeWrapper';

export default async function Page({
  params,
}: {
  // Next.js strictly requires dynamic folder params to be 'string'
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;

  // Safe validation check for your dictionary lookups
  const safeLng = lng === 'en' ? 'en' : 'de';
  const dict = await getDictionary(safeLng);

  return (
    <main className='bg-tuscan-ivory min-h-screen'>
      <ClientHomeWrapper lng={safeLng} dict={dict}>
        <MenuGrid lng={safeLng} dict={dict} />
      </ClientHomeWrapper>

      <footer className='bg-tuscan-espresso text-tuscan-ivory/90 mt-24 py-16 px-6 border-t border-tuscan-olive/20 text-sm'>
        <div className='max-w-6xl mx-auto grid md:grid-cols-3 gap-10 items-start'>
          <div>
            <h4 className='font-serif text-xl font-bold text-white mb-2'>
              {dict.brand}
            </h4>
            <p className='text-tuscan-clay font-medium mb-4'>{dict.owners}</p>
            <p className='opacity-80 leading-relaxed'>{dict.address}</p>
          </div>
          <div>
            <h4 className='font-serif text-lg font-bold text-white mb-3'>
              Kontakt & Reservierung
            </h4>
            <p className='opacity-80 mb-2'>
              Telefon:{' '}
              <a
                href={`tel:${dict.phone}`}
                className='hover:text-tuscan-clay transition-colors font-mono'
              >
                {dict.phone}
              </a>
            </p>
            <p className='opacity-80'>
              Mobil / WhatsApp:{' '}
              {/* FIXED: Corrected syntax template literal for the footer link */}
              <a
                href={`https://wa.me{dict.mobile}`}
                className='hover:text-tuscan-clay transition-colors font-mono'
              >
                {dict.mobile}
              </a>
            </p>
          </div>
          <div>
            <h4 className='font-serif text-lg font-bold text-white mb-3'>
              {dict.hoursTitle}
            </h4>
            <p className='opacity-80 mb-1'>{dict.hoursWeek}</p>
            <p className='opacity-80 mb-1'>{dict.hoursSun}</p>
            <p className='opacity-80 text-tuscan-clay font-semibold'>
              {dict.hoursMon}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
