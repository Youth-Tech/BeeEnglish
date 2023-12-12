import { audio } from '@assets'
import Sound from 'react-native-sound'

const soundInstance = (url: string) => {
  return new Sound(url, '', (error) => {
    if (error) console.log('Fail to load sound')
  })
}
export const SoundUtil = {
  correct: soundInstance(audio.Correct),
  incorrect: soundInstance(audio.Incorrect),
  testSuccessful: soundInstance(audio.TestSuccessful),
  testFailure: soundInstance(audio.TestFailure),
} as const
