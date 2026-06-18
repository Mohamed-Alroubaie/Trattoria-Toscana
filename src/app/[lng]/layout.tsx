import '../globals.css';

export async function generateStaticParams() {
  return [{ lng: 'de' }, { lng: 'en' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: 'de' | 'en' }>;
}) {
  const { lng } = await params;

  return (
    <html lang={lng}>
      <body className='bg-tuscan-ivory text-tuscan-espresso font-sans antialiased'>
        {children}
      </body>
    </html>
  );
}
