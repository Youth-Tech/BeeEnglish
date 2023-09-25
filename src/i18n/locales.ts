export const locales = {
  en: {
    nativeName: 'English',
    resource: {
      'sign-up': 'Sign up',
      'login': 'Login',
    },
  },
  vi: {
    nativeName: 'Tiếng Việt',
    resource: {
      'sign-up': 'Đăng ký',
      'login': 'Đăng nhập',
    },
  },
}
export type LanguageType = keyof typeof locales