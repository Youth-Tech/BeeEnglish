import ApiUtil from '@utils/AxiosInstance'
import { DefaultResponse } from '@services/index'

const SpeechEndPoint = {
  textToSpeech: '/speech/text-to-speech',
  speechToText: '/speech/speech-to-text',
}
export interface SpeechData {
  fluency: number
  feedback: {
    correct: Array<string>
    incorrect: Array<string>
  }
  userTranscription: string
}
export interface TextToSpeechResponse extends DefaultResponse {
  data: string
}
export interface SpeechToTextResponse extends DefaultResponse {
  data: SpeechData
}
export const SpeechService = {
  textToSpeech(postContent: string) {
    return ApiUtil.post<TextToSpeechResponse>(SpeechEndPoint.textToSpeech, {
      text: postContent,
    })
  },
  speechToText(uri: string, text: string) {
    const formDataBody = new FormData()

    formDataBody.append('file', {
      uri: uri,
      name: 'audio.mp3',
      type: 'audio/mp3',
    })
    formDataBody.append('text', text)
    return ApiUtil.postFile<SpeechToTextResponse>(
      SpeechEndPoint.speechToText,
      formDataBody,
    )
  },
  clearAudio(audioLink: string) {
    return ApiUtil.delete<DefaultResponse>(audioLink, undefined, {
      baseURL: '',
    })
  },
} as const
