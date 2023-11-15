import React from 'react'

import { Block, Container } from '@components'
import Sound from 'react-native-sound'
import { Button } from 'react-native'

Sound.setCategory('Playback')

const playRemote = new Sound(
  'https://bee2k3.blob.core.windows.net/bee-english/audios/76dd2d66-eee5-413b-9576-8204ff013060_1699288757277_advertising.mp3',
  Sound.MAIN_BUNDLE,
  (e) => {
    console.log(e)
  },
)

export const TestScreen = () => {
  return (
    <Container>
      <Block flex paddingHorizontal={20}>
        <Button
          title="Play Sound"
          onPress={() => {
            playRemote.play()
          }}
        />
        <Button
          title="Pause Sound"
          onPress={() => {
            playRemote.pause()
          }}
        />
      </Block>
    </Container>
  )
}
