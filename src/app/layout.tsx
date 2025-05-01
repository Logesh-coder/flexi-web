'use client'
import { Header } from '@/components/Header'
import { ThemeProvider } from '@/providers/theme-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import '../app.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FreeLancer - Find the Perfect Freelance Services',
  description: 'Connect with talented freelancers and get your projects done',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}