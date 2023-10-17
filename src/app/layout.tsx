import './theme-config.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@radix-ui/themes/styles.css';
import { Container, Theme, ThemePanel } from '@radix-ui/themes';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/Providers/AuthProvider';
import ReactQueryProvider from '@/Providers/ReactQueryProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '600', '800'],
});

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Issue Tracker for tracking issues',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ReactQueryProvider>
          <AuthProvider>
            <Theme scaling="105%" accentColor="violet">
              <Navbar />
              <main className="pb-5">
                <Container>{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
