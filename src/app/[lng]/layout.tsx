import '../globals.css';

export async function generateStaticParams() {
  return [{ lng: 'de' }, { lng: 'en' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // CHANGED: Next.js needs this to be string instead of 'de' | 'en'
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;

  // SAFE GUARD: Ensures the HTML tag only ever gets 'de' or 'en'
  const validLng = lng === 'en' ? 'en' : 'de';

  return (
    <html lang={validLng}>
      <body className='bg-tuscan-ivory text-tuscan-espresso font-sans antialiased'>
        {children}
      </body>
    </html>
  );
}
