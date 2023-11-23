import { createAsyncThunk } from '@reduxjs/toolkit'
import { ImagePickerResponse } from 'react-native-image-picker'

import { MediaService } from '@services'
import { UserData, UserService } from '@services/UserService'

export interface UpdateUserAvatarPayload {
  data: UserData
  code: number | undefined
}

export const updateProfile = createAsyncThunk<UserData | undefined>(
  'user/getMe',
  async () => {
    try {
      const res = await UserService.getUserData()
      return res.data.data

    } catch (e) {
      console.log(e)
    }

    return undefined
  },
)

export const updateUserAvatar = createAsyncThunk<
  UpdateUserAvatarPayload | undefined,
  ImagePickerResponse
>('auth/getMe/updateAvatar', async (imagePickerData) => {
  try {
    if (imagePickerData.assets != undefined) {
      const formData = new FormData()
      formData.append('file', {
        uri: imagePickerData.assets[0].uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      })

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
