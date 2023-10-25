import React from 'react'
import { useStyles } from './styles'
import { Container, Image, Text } from '@components'
import { images } from '@assets'

export const ProfileUserScreen: React.FC = () => {
  const styles = useStyles()
  return (
    <Container>
        <Text>Hello</Text>
      <Image
        source={images.ProfileBackground}
        resizeMode={'contain'}
        width={"100%"}
        style={{
            aspectRatio: 1,
            position: 'absolute',
        }}
      />
    </Container>
  )
}
