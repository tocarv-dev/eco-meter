import clsx from 'clsx';
// Styles
import '@/stylesheets/globals.css';
import '@/stylesheets/fonts.css';

let title = 'Cooler World - Carbon Footprint Calculator';
let description =
  'This is a carbon footprint calculator for Portuguese residents.';

export const metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-faint-green font-ubuntu h-full flex flex-col justify-start lg:justify-center items-center">
        <main className="font-normal relative w-full max-w-lg lg:max-w-[940px]">
          {children}
        </main>
      </body>
    </html>
  );
}
