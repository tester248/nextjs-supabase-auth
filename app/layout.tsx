import './globals.css';
import { AuthProvider } from './auth-provider';

export const metadata = {
  title: 'Next.js + Supabase Auth POC',
  description: 'A proof of concept for Next.js and Supabase authentication',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
