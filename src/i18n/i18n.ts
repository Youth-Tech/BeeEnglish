import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { locales } from './locales'
import RNLanguageDetector from './languageDetector'

const resources = {
  en: {
    translation: locales.en.resource,
  },
  vi: {
    translation: locales.vi.resource,
  },
}
i18next.use(initReactI18next).use(RNLanguageDetector).init({
  resources,
  compatibilityJSON: 'v3',
})
export default i18next
