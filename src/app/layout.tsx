import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
  
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + "h-full w-full bg-gray-50"}>{children}</body>
    </html>
  )
}
