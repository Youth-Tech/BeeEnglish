import ApiUtil from '@utils/AxiosInstance'
import { DefaultResponse } from '@services/index'

const SpeechEndPoint = {
  textToSpeech: '/speech/text-to-speech',
}

export interface TextToSpeechResponse extends DefaultResponse {
  data: string
}

export const SpeechService = {
  textToSpeech(postContent: string) {
    return ApiUtil.post<TextToSpeechResponse>(SpeechEndPoint.textToSpeech, {
      text: postContent,
    })
  },

  clearAudio(audioLink: string) {
    return ApiUtil.delete<DefaultResponse>(audioLink, undefined, {
      baseURL: '',
    })
  },
} as const
