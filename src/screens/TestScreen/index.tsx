import React from 'react'
import { Block, Container } from '@components'
import { NewsItem, NewsProgress } from '@screens/HomeScreen/components'
import { images } from '@assets'

export const TestScreen = () => {
  return (
    <Container backgroundColor="white">
      <Block margin={30}>
        <NewsProgress
          title={'Family verry happy and children'}
          image={images.Flower2}
          progress={0}
        ></NewsProgress>
      </Block>

      <Block margin={20}>
        <NewsItem
          title={'The Future Uber of the Skies Lilium Jet Air Taxis'}
          image={images.Flower}
        ></NewsItem>
      </Block>
    </Container>
  )
}
