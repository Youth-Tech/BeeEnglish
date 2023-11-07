import { createAsyncThunk } from '@reduxjs/toolkit'
import { MediaService } from '@services'
import { ImagePickerResponse } from 'react-native-image-picker'
import { UserData, UserService } from '@services/UserService'

export interface UpdateUserAvatarPayload {
  data: UserData
  code: number | undefined
}

export const updateUserAvatar = createAsyncThunk<
  UpdateUserAvatarPayload | undefined,
  ImagePickerResponse
>('auth/getMe/updateAvatar', async (imagePickerData) => {
  try {
    if (imagePickerData.assets != undefined) {
      const formData = new FormData()
      console.log(imagePickerData.assets[0].uri)
      formData.append('file', imagePickerData.assets[0].uri)

      const resUpload = await MediaService.upLoadImage(formData)
      const resUpdateAvatar = await UserService.updateUserAvatar({
        avatar: resUpload.data.data[0],
      })

      return {
        code: resUpdateAvatar.status,
        data: resUpdateAvatar.data.data,
      }
    }
  } catch (error) {
    console.log(error)
  }

  return undefined
})
