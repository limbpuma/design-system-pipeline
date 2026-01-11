import type { Metadata } from 'next';
import './globals.css';

// Import design system styles
import '@limbpuma/design-system/styles';

export const metadata: Metadata = {
  title: 'Design System Example',
  description: 'Example app using @limbpuma/design-system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
