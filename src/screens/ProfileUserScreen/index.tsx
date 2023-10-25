import React, { useRef } from 'react'
import { useStyles } from './styles'
import { Block, Container, Image, LineChart, Text } from '@components'
import { images } from '@assets'
import HeaderAccount from './components/HeaderAccount'
import UserCard from './components/UserCard'
import {normalize} from '@themes'
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'

export const ProfileUserScreen: React.FC = () => {
  const styles = useStyles()
  const { t } = useTranslation()
  const scrollY = useRef(new Animated.Value(0)).current

  const opacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
  })
  const opacityHeader = scrollY.interpolate({
    inputRange: [80, 150],
    outputRange: [0, 1],
  })
  const data = [
    { id: 0, label: 'Mon', x: 0, y: 3 },
    { id: 1, label: 'Tue', x: 1, y: 1 },
    { id: 2, label: 'Wed', x: 2, y: 2 },
    { id: 3, label: 'Thu', x: 3, y: 3 },
    { id: 4, label: 'Fri', x: 4, y: 3 },
    { id: 5, label: 'Sat', x: 5, y: 2 },
    { id: 6, label: 'Sun', x: 6, y: 2 },
  ]
  const widthLineChart = Dimensions.get('window').width - normalize.m(40)
  const handleItemClick = () => {
    console.log('click')
  }
  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.timing(scrollY, {
      toValue: event.nativeEvent.contentOffset.y,
      duration: 10,
      useNativeDriver: false,
    }).start()
  }
  return (
    <Container>
      <Animated.View style={[styles.boxBackground, { opacity }]}>
        <Image
          source={images.ProfileBackground}
          style={[styles.backgroundContainer,]}
        />
      </Animated.View>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleOnScroll}
          stickyHeaderIndices={[0]}
        >
          <HeaderAccount opacity={opacityHeader} />
          <UserCard />
          <Block paddingHorizontal={20}>
            <Text size={'h2'} fontFamily={'bold'} marginTop={20}>
              {t('process')}
            </Text>
            <LineChart
              width={widthLineChart}
              height={300}
              data={data}
              haveDots
              haveXAxis
              haveHorizontalGuides
              lineColor="#FFEFAD"
              onItemClick={handleItemClick}
            />
            <LineChart
              width={widthLineChart}
              height={300}
              data={data}
              haveDots
              haveXAxis
              haveHorizontalGuides
              lineColor="#FFEFAD"
              onItemClick={handleItemClick}
            />
            <LineChart
              width={widthLineChart}
              height={300}
              data={data}
              haveDots
              haveXAxis
              haveHorizontalGuides
              lineColor="#FFEFAD"
              onItemClick={handleItemClick}
            />
            <LineChart
              width={widthLineChart}
              height={300}
              data={data}
              haveDots
              haveXAxis
              haveHorizontalGuides
              lineColor="#FFEFAD"
              onItemClick={handleItemClick}
            />
            <Text size={'h2'} fontFamily={'bold'} marginTop={20}>
              {t('process')}
            </Text>
            <Text size={'h2'} fontFamily={'bold'} marginTop={20}>
              {t('process')}
            </Text>
          </Block>
        </ScrollView>
      </View>
    </Container>
  )
}
