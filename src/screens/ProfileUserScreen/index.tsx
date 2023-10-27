import { images } from '@assets'
import { useStyles } from './styles'
import React, { useRef } from 'react'
import UserCard from './components/UserCard'
import { normalize, useTheme } from '@themes'
import HeaderAccount from './components/HeaderAccount'
import { Block, Container, LineChart, Text } from '@components'
import {
  View,
  Easing,
  Animated,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  FlatList,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import StatisticalComponent from './components/StatisticalComponent'
import { ListBadges, ListStatistical } from './const'
import BadgesComponent from './components/BadgesComponent'

export const ProfileUserScreen: React.FC = () => {
  const { colors } = useTheme()
  const styles = useStyles()
  const { t } = useTranslation()
  const scrollY = useRef(new Animated.Value(0)).current

  const color = scrollY.interpolate({
    inputRange: [0, 90],
    outputRange: [colors.white, colors.black],
  })
  const colorBackground = scrollY.interpolate({
    inputRange: [80, 150],
    outputRange: ['#FFDD76', colors.white],
  })
  const translateY = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -150],
  })
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
    { id: 3, label: 'Thu', x: 3, y: 4 },
    { id: 4, label: 'Fri', x: 4, y: 3 },
    { id: 5, label: 'Sat', x: 5, y: 2 },
    { id: 6, label: 'Sun', x: 6, y: 2 },
  ]
  const widthLineChart = Dimensions.get('window').width - normalize.m(40)
  const widthBackground = Dimensions.get('window').width
  const handleItemClick = () => {
    console.log('click')
  }
  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.timing(scrollY, {
      toValue: event.nativeEvent.contentOffset.y,
      duration: 0,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start()
  }
  return (
    <Container>
      <Animated.View
        style={[styles.boxBackground, { transform: [{ translateY }] }]}
      >
        <Animated.Image
          source={images.ProfileBackground}
          style={[styles.backgroundContainer, { width: widthBackground }]}
          tintColor={colorBackground}
          accessibilityIgnoresInvertColors
        />
      </Animated.View>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleOnScroll}
          stickyHeaderIndices={[0]}
        >
          <HeaderAccount
            opacity={opacityHeader}
            unOpacity={opacity}
            color={color}
          />
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

            <Text size={'h2'} fontFamily={'bold'} marginTop={20}>
              {t('statistical')}
            </Text>
            <FlatList
              scrollEnabled={false}
              data={ListStatistical}
              numColumns={2}
              renderItem={({ item }) => <StatisticalComponent {...item} />}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{
                gap: normalize.m(8),
                marginTop: normalize.m(20),
              }}
              columnWrapperStyle={{
                gap: normalize.m(8),
              }}
            />
            <Text size={'h2'} fontFamily={'bold'} marginTop={20}>
              {t('badges')}
            </Text>
            <FlatList
              scrollEnabled={false}
              data={ListBadges}
              renderItem={({ item }) => <BadgesComponent {...item} />}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{
                gap: normalize.m(10),
                marginTop: normalize.m(20),
                marginBottom: normalize.m(20),
              }}
            />
          </Block>
        </ScrollView>
      </View>
    </Container>
  )
}
