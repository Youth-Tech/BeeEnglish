import React from 'react'
import { Block, Container } from '@components'
import { NewsItem, NewsProgress } from '@screens/HomeScreen/components'
import { images } from '@assets'

export const TestScreen = () => {
  return (
    <Container backgroundColor="white">
      <Block paddingHorizontal={20}>
        <NewsItem
          title={'The Future Uber of the Skies Lilium Jet Air Taxis'}
          image={'https://i.pinimg.com/736x/9b/88/51/9b88513699abae664fc34b23c3d0a6d3.jpg'}
        ></NewsItem>
        <NewsItem
          title={'The Future Uber of the Skies Lilium Jet Air Taxis'}
          image={'https://i.pinimg.com/736x/9b/88/51/9b88513699abae664fc34b23c3d0a6d3.jpg'}
          onPress={() => {
            console.log('pressed')
          }}
        ></NewsItem>
        <NewsProgress
          title={
            'Family verry happy and childrenFamily verry happy and childrenFamily verry happy and childrenFamilFamily verry happy and childrenFamily verry happy and childrenFamily verry happy and childreny verry happy and children'
          }
          image={'https://static.wikia.nocookie.net/nisekoi/images/c/c6/Chitoge-nisekoi.png/revision/latest?cb=20150603043239'}
          progress={0}
        />
      </Block>
    </Container>
  )
}
