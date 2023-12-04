import { AccessToken, LoginManager } from 'react-native-fbsdk-next'
import { GoogleSignin as GoogleSignIn } from '@react-native-google-signin/google-signin'

import { DeviceInfoConfig, Provider } from '@configs'
import DeviceInfo from 'react-native-device-info'

export const signingWithGoogle = async () => {
  try {
    // Check if your device supports Google Play
    await GoogleSignIn.hasPlayServices({ showPlayServicesUpdateDialog: true })
    // Get the users ID token
    const { idToken } = await GoogleSignIn.signIn()

    return idToken
  } catch (error) {
    console.log('Error signing with google', error)
    return Error('Error signing with google: ' + error)
  }
}

export const signingWithFacebook = async () => {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ])

    if (result.isCancelled) {
      throw Error('User cancelled the login process')
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken()

    if (!data) {
      throw Error('Something went wrong obtaining access token')
    }

    return data.accessToken
  } catch (error) {
    console.log('Error signing with facebook', error)
    return Error('Error signing with facebook: ' + error)
  }
}

export const oAuthSignOut = (
  providerId: Provider | undefined,
  onSignOutComplete: () => void,
) => {
  try {
    if (providerId === Provider.google) {
      GoogleSignIn.signOut()
    } else if (providerId === Provider.facebook) {
      LoginManager.logOut()
    }

    onSignOutComplete()
  } catch (error) {
    console.log('Error signing with google', error)
    // return Error('Error signing with google: ' + error)
  }
}

//get init device info
export const initRun = async function () {
  DeviceInfoConfig.deviceName = DeviceInfo.getDeviceNameSync()
  const deviceId = await DeviceInfo.getUniqueId()
  DeviceInfoConfig.deviceId = deviceId.concat(new Date().getTime().toString())
}

