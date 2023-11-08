import ApiUtil from '@utils/AxiosInstance'
import { DefaultResponse } from '@services'

export interface UploadImageRes extends DefaultResponse {
  data: Attachment[]
}

export const MediaService = {
  upLoadImage(formData: FormData) {
    return ApiUtil.postFile<UploadImageRes>('/media/upload-images', formData)
  },
} as const
