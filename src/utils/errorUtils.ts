import Toast from 'react-native-toast-message'
import { t } from 'i18next'

const showErrorMessage = (message: string) => {
  Toast.show({
    type: 'error',
    text1: t('error_occured'),
    text2: message,
  })
}

const keyValueError: [string, string][] = [
  ['FAIL_AUTHENTICATE_403', t('fail_authenticate')],
  ['PLEASE_VERIFY_EMAIL_403', t('please_verify_email')],
  ['WRONG_PASSWORD_400', t('wrong_password')],
  ['EMAIL_NOT_AVAILABLE_403', t('email_not_available')],
  ['INVALID_CODE_403', t('invalid_code')],
  ['INVALID_AUTH_403', t('invalid_auth')],
  ['LOG_OUT_FAILED_403', t('log_out_failed')],
  ['NO_PERMISSION_403', t('no_permission')],
  ['UPLOAD_FAILED_500', t('upload_failed')],
  ['RESEND_LIMIT_403', t('resend_limit')],
  ['USER_NOT_FOUND_400', t('user_not_found')],
]

const ERRORS: Map<string, string> = new Map(keyValueError)

type TErrorStatus =
  | 'FAIL_AUTHENTICATE_403'
  | 'PLEASE_VERIFY_EMAIL_403'
  | 'WRONG_PASSWORD_400'
  | 'EMAIL_NOT_AVAILABLE_403'
  | 'INVALID_CODE_403'
  | 'INVALID_AUTH_403'
  | 'LOG_OUT_FAILED_403'
  // | 'NO_PERMISSION_403'
  | 'UPLOAD_FAILED_500'
  | 'RESEND_LIMIT_403'
// | 'USER_NOT_FOUND_400'

const exceptionErrors = ['READ POST_ALREADY_EXIST_400']
export const handleErrorMessage = (
  subMessage: string | TErrorStatus,
  messageFromServer: string,
) => {
  console.log('submessage' + subMessage)
  console.log('message' + messageFromServer)
  if (exceptionErrors.includes(subMessage)) return
  const message = ERRORS.get(subMessage)
  if (message) {
    showErrorMessage(message)
  } else {
    console.log(messageFromServer)
    // showErrorMessage(messageFromServer)
  }
}
