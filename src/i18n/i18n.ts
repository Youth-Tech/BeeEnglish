import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import { en, vi } from './lang'
import RNLanguageDetector from './languageDetector'

i18next
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: en['resource'],
      },
      vi: {
        translation: vi['resource'],
      },
    },
  })

export default i18next
