import ApiUtil from '@utils/AxiosInstance'
import { DefaultResponse } from '@services'

const MediaEndPoint = {
  uploadImage: '/media/upload-images',
} as const

export interface UploadImageRes extends DefaultResponse {
  data: Attachment[]
}

export const MediaService = {
  upLoadImage(formData: FormData) {
    return ApiUtil.postFile<UploadImageRes>(MediaEndPoint.uploadImage, formData)
  },
} as const
