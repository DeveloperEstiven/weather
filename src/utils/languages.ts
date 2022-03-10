export const supportedLanguages = ['en', 'ru', 'fr'] as const
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
    code: 'fr',
    name: 'Français',
    country_code: 'fr',
  },
]
