import { LoginManager, AccessToken } from 'react-native-fbsdk-next'
import { GoogleSignin as GoogleSignIn } from '@react-native-google-signin/google-signin'
import { Provider } from '@configs'

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

export const signOut = (
  providerId: Provider | undefined,
  onSignOutComplete: () => void,
) => {
  try {
    if (providerId === 0) {
      GoogleSignIn.signOut()
    } else {
      LoginManager.logOut()
    }

    onSignOutComplete()

    return 1
  } catch (error) {
    console.log('Error signing with google', error)
    return Error('Error signing with google: ' + error)
  }
}
