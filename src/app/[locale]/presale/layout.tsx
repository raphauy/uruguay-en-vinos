'use client'

import { I18nProviderClient, useCurrentLocale } from '@/locales/client'

export default function HomeLayout({ children }: {children: React.ReactNode}) {
  const locale= useCurrentLocale()
  return (
    <I18nProviderClient locale={locale}>
      {children}
    </I18nProviderClient>
  )
}
