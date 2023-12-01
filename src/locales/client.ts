import { createI18nClient } from 'next-international/client'

export const {useI18n, useScopedI18n, useChangeLocale, I18nProviderClient, useCurrentLocale} = createI18nClient(
  {
    es: () => import('./es'),
    en: () => import('./en'),
    pt: () => import('./pt'),
    fr: () => import('./fr'),
  }
)
