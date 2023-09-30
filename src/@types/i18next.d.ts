import 'i18next'
import { vi } from '@i18n/lang'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: (typeof vi)['resource']
    }
  }
}
