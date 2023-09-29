
import React from 'react'
import { Block, Container, Image } from '@components'
import { images } from '../../assets/images/index'
import { useTheme } from '@themes'

export const SplashScreen = () => {
  const { colors } = useTheme()
  return (
    <Container>
      <Block justifyCenter alignCenter backgroundColor={colors.white} flex>
        <Image
          source={images.BeeEnglish}
          width={280}
          height={62}
          resizeMode="contain"
        />
      </Block>
    </Container>
  )
}

