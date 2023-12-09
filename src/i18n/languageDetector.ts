import { LanguageDetectorModule } from 'i18next'

import { MMKVStore } from '@redux/store'
import { getDeviceLanguage } from '@utils/helpers'

const RNLanguageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  init: () => {},
  detect: () => {
    const lang = MMKVStore.getString('config.lang')
    if (lang) {
      return lang
    }

    return getDeviceLanguage()
  },
  cacheUserLanguage: (lang) => {
    MMKVStore.set('config.lang', lang)
  },
}

export default RNLanguageDetector
