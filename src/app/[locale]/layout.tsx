import LandingNavBar from '@/components/LandingNavBar'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import { jostMedium, jostRegular } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import FooterPage from './footer'

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen w-full text-verde-oscuro">
      <div className="flex w-full justify-end">
        <LocaleSwitcher />
      </div>

      <main className="flex-grow">{children}</main>
      
      <FooterPage />
    </div>
  )
}
