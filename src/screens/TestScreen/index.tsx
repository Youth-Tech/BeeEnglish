import React, { useRef } from 'react'

import { Block, Container } from '@components'
import Sound from 'react-native-sound'
import { Button, PermissionsAndroid, Platform } from 'react-native'
import { ModalFunction } from '@components/bases/Modal/type'
import RNFetchBlob from 'rn-fetch-blob'
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player/index'
import { SpeechService } from '@services'

Sound.setCategory('Playback')
//
// const playRemote = new Sound(
//   'https://bee2k3.blob.core.windows.net/bee-english/audios/76dd2d66-eee5-413b-9576-8204ff013060_1699288757277_advertising.mp3',
//   Sound.MAIN_BUNDLE,
//   (e) => {
//     console.log(e)
//   },
// )

export const TestScreen = () => {
  const modalRef = useRef<ModalFunction>(null)
  const dirs = RNFetchBlob.fs.dirs
  const path = Platform.select({
    ios: 'hello.4a',
    android: `${dirs.CacheDir}/${new Date().getTime()}.mp3`,
  })
  const audioRecorder = new AudioRecorderPlayer()
  audioRecorder.setSubscriptionDuration(0.5)
  const onStartRecord = async (): Promise<void> => {
    if (Platform.OS === 'android' && Platform.Version < 33) {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ])

        console.log('write external stroage', grants)

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted')
        } else {
          console.log('All required permissions not granted')

          return
        }
      } catch (err) {
        console.warn(err)

        return
      }
    }
    // for audio quality
    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    }
    console.log('audioSet', audioSet)
    try {
      const uri = await audioRecorder.startRecorder(path, audioSet)
      console.log('uri: ', uri)
    } catch (err) {
      console.log(err)
    }
  }
  const onStopRecord = async (): Promise<void> => {
    const result = await audioRecorder.stopRecorder()
    console.log('result: ', result)
    speechToText(result)
  }
  const speechToText = async (uri: string) => {
    try {
      const response = await SpeechService.speechToText(uri, 'hello')
      console.log('data', response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const playSound = async () => {
    // const sound = new Sound(path, '', (error) => {
    //   console.log(error)
    // })
    // sound.play()

    try {
      const msg = await audioRecorder.startPlayer(path)

      //? Default path
      // const msg = await this.audioRecorderPlayer.startPlayer();
      const volume = await audioRecorder.setVolume(1.0)
      console.log(`path: ${msg}`, `volume: ${volume}`)
    } catch (err) {
      console.log('startPlayer error', err)
    }
  }

  return (
    <Container>
      <Block flex paddingHorizontal={20}>
        {/*<Button*/}
        {/*  title="Open modal"*/}
        {/*  onPress={() => {*/}
        {/*    modalRef.current?.openModal()*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Button*/}
        {/*  title="Pause Sound"*/}
        {/*  onPress={() => {*/}
        {/*    playRemote.pause()*/}
        {/*  }}*/}
        {/*/>*/}
        <Button title={'start recording'} onPress={onStartRecord} />
        <Button title={'stop recording'} onPress={onStopRecord} />
        <Button title={'play sound'} onPress={playSound} />
      </Block>
    </Container>
  )
}
