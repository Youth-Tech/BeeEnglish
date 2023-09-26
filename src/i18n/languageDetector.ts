import { LanguageDetectorModule } from 'i18next';
import { Platform, NativeModules } from 'react-native';

const defaultLanguage = "vi"

const RNLanguageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  init: () => {},
  detect: () => {
    const supportedLanguages = ['en', 'vi'];
      const locale = Platform.OS === 'ios' ? (
        NativeModules.SettingsManager?.settings?.AppleLocale
        || NativeModules.SettingsManager?.settings?.AppleLanguages[0]
        || ''
      ) : (
        NativeModules.I18nManager?.localeIdentifier || ''
      );
      
      const [lowerCaseLocale] = locale.split('_');
      
      if (supportedLanguages.includes(lowerCaseLocale)) {
        return lowerCaseLocale;
      }
    return defaultLanguage;
  },
  cacheUserLanguage: () => {},
};

export default RNLanguageDetector;