import { GoogleSignin as GoogleSignIn } from '@react-native-google-signin/google-signin'
import DeviceInfoConfig from './deviceInfo'

export * from './enums'
export * from './constants'
export { DeviceInfoConfig }

GoogleSignIn.configure({
  webClientId:
    '576584192864-iggba821mdf1k736mi4f002ghe55j1ir.apps.googleusercontent.com',
})
