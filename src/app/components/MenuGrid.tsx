interface MenuItem {
  num?: string;
  nameDe: string;
  nameEn: string;
  descDe?: string;
  descEn?: string;
  price: string;
}

async function getCachedMenu() {
  'use cache';
  return {
    carne: [
      {
        num: '47',
        nameDe: 'Scallopine Milanese',
        nameEn: 'Scallopine Milanese',
        descDe: 'Kalsschnitzel paniert',
        descEn: 'Breaded veal cutlet',
        price: '24,50',
      },
      {
        num: '48',
        nameDe: 'Scallopine al Vino Bianco',
        nameEn: 'Scallopine al Vino Bianco',
        descDe: 'Kalbsschnitzel mit Weißweinsoße',
        descEn: 'Veal cutlet with white wine sauce',
        price: '24,50',
      },
      {
        num: '49',
        nameDe: 'Rumpsteak',
        nameEn: 'Rump Steak',
        descDe: 'Argentinisches Rumpsteak vom Grill',
        descEn: 'Grilled Argentine rump steak',
        price: '26,50',
      },
      {
        num: '50',
        nameDe: 'Saltimbocca alla Romana',
        nameEn: 'Saltimbocca alla Romana',
        descDe: 'Kalbsschnitzel mit Parmaschinken und Salbei',
        descEn: 'Veal cutlet with Parma ham and sage',
        price: '24,50',
      },
    ] as MenuItem[],
    pesce: [
      {
        num: '51',
        nameDe: 'Scampi alla griglia',
        nameEn: 'Grilled Scampi',
        descDe: 'Garnelen vom Grill',
        descEn: 'Grilled prawns',
        price: '24,50',
      },
      {
        num: '52',
        nameDe: 'Pesce Misto',
        nameEn: 'Mixed Fish Platter',
        descDe: 'Gemischter Fischteller',
        descEn: 'Mixed fish platter',
        price: '24,50',
      },
      {
        num: '53',
        nameDe: 'Lupo di Mare alle erbe',
        nameEn: 'Sea Bass with Herbs',
        descDe: 'Wolfsbarschfilet mit Kräutern',
        descEn: 'Sea bass fillet with herbs',
        price: '24,50',
      },
      {
        num: '54',
        nameDe: 'Salmone fresco alla griglia',
        nameEn: 'Fresh Grilled Salmon',
        descDe: 'Frischer Lachs vom Grill',
        descEn: 'Fresh grilled salmon',
        price: '24,50',
      },
    ] as MenuItem[],
    dolci: [
      { num: '55', nameDe: 'Tiramisu', nameEn: 'Tiramisu', price: '8,50' },
      {
        num: '56',
        nameDe: 'Tartufo Eis',
        nameEn: 'Tartufo Ice Cream',
        price: '8,50',
      },
    ] as MenuItem[],
  };
}

export default async function MenuGrid({
  lng,
  dict,
}: {
  lng: 'de' | 'en';
  dict: any;
}) {
  const menu = await getCachedMenu();

  const renderSectionHeader = (title: string, subtitle: string | null) => (
    <div className='text-center mb-6'>
      <h3 className='font-serif italic text-2xl font-bold text-[#8B261E] tracking-wide'>
        {title}
      </h3>
      {subtitle && (
        <p className='text-xs italic text-[#5C4033]/80 mt-1 max-w-sm mx-auto leading-relaxed'>
          ({subtitle})
        </p>
      )}
      {/* Decorative multi-dot spacer design from the paper menu image */}
      <div className='flex justify-center items-center gap-1.5 mt-2 opacity-60'>
        <span className='w-1 h-1 rounded-full bg-[#8B261E]'></span>
        <span className='w-2 h-2 rotate-45 border border-[#8B261E] bg-[#8B261E]'></span>
        <span className='w-1 h-1 rounded-full bg-[#8B261E]'></span>
      </div>
    </div>
  );

  const renderItemsList = (items: MenuItem[]) => (
    <div className='space-y-5'>
      {items.map((item, index) => (
        <div key={index} className='text-[#2B1E16]'>
          <div className='flex justify-between items-baseline gap-4 font-serif text-[15px]'>
            <span className='font-sans font-medium'>
              {item.num ? `${item.num}. ` : ''}
              {lng === 'de' ? item.nameDe : item.nameEn}
            </span>
            <span className='font-sans whitespace-nowrap'>{item.price} €</span>
          </div>
          {item.descDe && (
            <p className='text-xs italic text-[#5C4033]/90 font-serif pl-5 mt-0.5 leading-normal'>
              {lng === 'de' ? item.descDe : item.descEn}
            </p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <section className='max-w-4xl mx-auto px-4 py-8'>
      <div className='relative bg-[#EFE6D5] bg-gradient-to-br from-[#F5ECD7] via-[#EFE6D5] to-[#E3D7BE] border border-[#D5C29D] shadow-xl rounded-sm p-8 md:p-12 font-serif text-[#2B1E16]'>
        {/* Subtle vignette inner shade overlay box */}
        <div className='absolute inset-0 border-[12px] border-transparent bg-radial from-transparent to-[#000000]/5 pointer-events-none rounded-sm'></div>

        {/* Master Multi-Column Grid Layout */}
        <div className='relative grid md:grid-cols-2 gap-x-12 gap-y-10'>
          {/* LEFT SIDE COLUMN */}
          <div className='space-y-12'>
            {/* Carne Block Section */}
            <div>
              {renderSectionHeader(dict.meatTitle, dict.meatSub)}
              {renderItemsList(menu.carne)}
            </div>

            {/* Pesce Block Section */}
            <div>
              {renderSectionHeader(dict.fishTitle, dict.fishSub)}
              {renderItemsList(menu.pesce)}
            </div>
          </div>

          {/* VISUAL CENTER SEPARATOR LINE (Hidden on mobile stack view displays) */}
          <div className='hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-[#8B261E]/20 -translate-x-1/2'></div>

          {/* RIGHT SIDE COLUMN */}
          <div className='space-y-12'>
            {/* Dolci Block Section */}
            <div>
              {renderSectionHeader(
                dict.dessertTitle || 'Dolci / Desserts',
                null,
              )}
              {renderItemsList(menu.dolci)}
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Footer Notice Block */}
        <div className='relative border-t border-[#8B261E]/20 mt-16 pt-6 text-center text-[11px] font-sans tracking-wide text-[#5C4033]/80 space-y-1'>
          <p className='font-semibold text-[#8B261E]/90'>
            {dict.allergenNotice.split('.')[0]}.
          </p>
          <p className='italic'>{dict.allergenNotice.split('.')[1]}</p>
        </div>
      </div>
    </section>
  );
}
