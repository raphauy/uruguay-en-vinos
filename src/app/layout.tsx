import SessionProvider from '@/components/SessionProvider'
import { TailwindIndicator } from '@/components/shadcn/tailwind-indicator'
import { ThemeProvider } from '@/components/shadcn/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import getSession from '@/lib/auth'
import { jostRegular } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Uruguay en Vinos',
  description: 'Uruguay en vinos es un proyecto independiente de comunicación, creado por Gabi Zimmer, que tiene por objetivo difundir conocimiento sobre la vitivinicultura uruguaya a través de contenido y experiencias formativas virtuales y presenciales.',
  icons: {
    icon: "/favicon.ico",
  },  
}

export const viewport: Viewport = {
  themeColor: "light",  
}

interface RootLayoutProps {  
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session= await getSession()

  return (    
    <>
      <html lang="es" suppressHydrationWarning>
        <head />
        <body className={cn("min-h-screen bg-background font-sans antialiased", jostRegular)}>
            <SessionProvider session={session}>
          

            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex flex-col min-h-screen text-verde-oscuro dark:text-verde-claro">

                <div className="flex flex-col items-center flex-1">
                  {children}
                  <Toaster />
                </div>
              </div>            
              <TailwindIndicator />
            </ThemeProvider>

            </SessionProvider>
        </body>
      </html>
    </>
  )
}
