export const locales = {
  en: {
    nativeName: 'English',
    resource: {
      'sign-up': 'Sign up',
      login: 'Login',
      vi: 'Vietnamese',
      en: 'English',
      verify_account: 'Verify Account',
      sub_label_verify_account:
        'Please enter your phone number to verify your account',
      label_code_verify: 'Verify Code',
      sub_label_code_verify:
        'Please enter your verify code is sent to email {{val}}',
      send_again: 'Send again',
      without_code: 'I did not receive the code!',
      //label_button
      continue_button: 'Continue',
    },
  },
  vi: {
    nativeName: 'Tiếng Việt',
    resource: {
      'sign-up': 'Đăng ký',
      login: 'Đăng nhập',
      vi: 'Tiếng Việt',
      en: 'Tiếng Anh',
      verify_account: 'Xác thực tài khoản',
      sub_label_verify_account:
        'Nhập số điện thoại để xác thực tài khoản của bạn',
      label_code_verify: 'Mã xác thực',
      sub_label_code_verify:
        'Vui lòng nhập mã xác thực được gửi tới email {{val}}',
      send_again: 'Gửi lại',
      without_code: 'Tôi không nhận được mã code!',

      //label_button
      continue_button: 'Tiếp tục',
    },
  },
} as const
export type LanguageType = keyof typeof locales
