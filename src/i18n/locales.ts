export const locales = {
  en: {
    nativeName: 'English',
    resource: {
      'sign-up': 'Sign up',
      login: 'Login',
      vi: 'Vietnamese',
      en: 'English',
    },
  },
  vi: {
    nativeName: 'Tiếng Việt',
    resource: {
      'sign-up': 'Đăng ký',
      login: 'Đăng nhập',
      vi: 'Tiếng Việt',
      en: 'Tiếng Anh',
    },
  },
}
export type LanguageType = keyof typeof locales
