import type { Metadata } from 'next'
import './globals.css'
import { vi } from '../i18n/vi'

export const metadata: Metadata = {
  title: vi.app.title,
  description: vi.app.description,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>
}
