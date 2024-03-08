import { primaryFont } from '../theme/typography';
import './global.css';

// ----------------------------------------------------------------------

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: 'rfjs',
  description: 'Welcome to rfjs web',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (   
    <html lang="en" className={primaryFont.className}>
      <body>{children}</body>
    </html>
  );
}
