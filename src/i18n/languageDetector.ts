import { LanguageDetectorModule } from 'i18next'
import { Platform, NativeModules } from 'react-native'

import { MMKVStore } from '@redux/store'
import { supportedLanguages } from '@redux/reducers'

const defaultLanguage = 'vi'

const RNLanguageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  init: () => {},
  detect: () => {
    const lang = MMKVStore.getString('config.lang')
    if (lang) {
      return lang
    }

    const locale =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier

    const [lowerCaseLocale] = locale.split('_')

    if (supportedLanguages.includes(lowerCaseLocale)) {
      return lowerCaseLocale
    }
    return defaultLanguage
  },
  cacheUserLanguage: (lang) => {
    MMKVStore.set('config.lang', lang)
  },
}

export default RNLanguageDetector
