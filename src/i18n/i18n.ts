import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { locales } from './locales'

const resources = {
  en: {
    translation: locales.en.resource,
  },
  vi: {
    translation: locales.vi.resource,
  },
}
i18next.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  compatibilityJSON:"v3",
})
export default i18next
