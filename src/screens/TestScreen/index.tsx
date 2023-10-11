import React from 'react'
import { Block, Container } from '@components'
import { Icon, SoundProgress, SoundProgressFcRef } from '@assets'
import { useTheme } from '@themes'

export const TestScreen = () => {
  const { colors } = useTheme()
  const iconRef = React.useRef<SoundProgressFcRef>(null)

  return (
    <Container>
      <Block flex padding={10}>
        <SoundProgress
          ref={iconRef}
          fill={colors.blue}
          size={50}
          onPress={() => {
            iconRef.current?.start()
            console.log('chayj nef')
          }}
        />

        <Icon
          state="Cancel"
          onPress={() => {
            iconRef.current?.pause()
          }}
        />
      </Block>
    </Container>
  )
}
