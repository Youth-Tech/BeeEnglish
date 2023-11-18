import React, { useRef } from 'react'

import { Block, Container, VoiceDectectorModal } from '@components'
import Sound from 'react-native-sound'
import { Button } from 'react-native'
import { ModalFunction } from '@components/bases/Modal/type'

Sound.setCategory('Playback')

const playRemote = new Sound(
  'https://bee2k3.blob.core.windows.net/bee-english/audios/76dd2d66-eee5-413b-9576-8204ff013060_1699288757277_advertising.mp3',
  Sound.MAIN_BUNDLE,
  (e) => {
    console.log(e)
  },
)

export const TestScreen = () => {
  const modalRef = useRef<ModalFunction>(null)
  return (
    <Container>
      <Block flex paddingHorizontal={20}>
        <Button
          title="Open modal"
          onPress={() => {
            modalRef.current?.openModal()
          }}
        />
        {/*<Button*/}
        {/*  title="Pause Sound"*/}
        {/*  onPress={() => {*/}
        {/*    playRemote.pause()*/}
        {/*  }}*/}
        {/*/>*/}
      </Block>
    </Container>
  )
}
