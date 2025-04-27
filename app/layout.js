import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Image from 'next/image'; // <-- Import next/image

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Budget Buddy',
  description: 'Track your expenses and income with ease',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ margin: 0, padding: 0 }}
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          {/* Logo */}
          <Image
            src="/logo.png" // Place your logo inside public/logo.png
            alt="Budget Buddy Logo"
            width={40}
            height={40}
          />
          <h1 style={{ marginLeft: '10px', fontSize: '1.5rem' }}>
            Budget Buddy
          </h1>
        </header>

        {/* Actual page content */}
        <main style={{ padding: '20px' }}>{children}</main>
      </body>
    </html>
  );
}
