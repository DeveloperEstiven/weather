export const supportedLanguages = ['en', 'ru', 'es'] as const
export type SupportedLanguages = typeof supportedLanguages[number]

export const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
  {
    code: 'ru',
    name: 'Русский',
    country_code: 'ru',
  },
  {
    code: 'es',
    name: 'Español',
    country_code: 'es',
  },
]
