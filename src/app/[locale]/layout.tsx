"use client"

import { I18nProviderClient, useCurrentLocale } from '@/locales/client'
import { SheetMenu } from './(menu)/menu-sheet'
import FooterPage from './footer'

export default function LandingLayout({ children }: { children: React.ReactNode }) {

  const locale= useCurrentLocale()
  return (
    <div className="flex flex-col w-full text-verde-oscuro">
          <I18nProviderClient locale={locale}>
            <SheetMenu />
          </I18nProviderClient>

        <main className="">{children}</main>
        
    </div>
  )
}
