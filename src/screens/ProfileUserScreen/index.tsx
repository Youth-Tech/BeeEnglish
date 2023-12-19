import {
  View,
  Easing,
  FlatList,
  Animated,
  Dimensions,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

import {
  statisticField,
  getStatisticContent,
  ItemStatisticalProps,
} from './const'
import { images } from '@assets'
import { useStyles } from './styles'
import { useAppSelector } from '@hooks'
import { UserService } from '@services'
import { LangType } from '@utils/helpers'
import UserCard from './components/UserCard'
import { normalize, useTheme } from '@themes'
import HeaderAccount from './components/HeaderAccount'
import { getLangConfig, getUserData } from '@redux/selectors'
import { getDateName, getDatesOfWeek } from '@utils/dateUtils'
import { Block, Container, LineChart, Text } from '@components'
import StatisticalComponent from './components/StatisticalComponent'

const widthLineChart = Dimensions.get('window').width - normalize.m(40)
const widthBackground = Dimensions.get('window').width
//
// const defaultStatsData = [
//   { id: 0, label: 'Mon', x: 0, y: 0 },
//   { id: 1, label: 'Tue', x: 1, y: 0 },
//   { id: 2, label: 'Wed', x: 2, y: 0 },
//   { id: 3, label: 'Thu', x: 3, y: 0 },
//   { id: 4, label: 'Fri', x: 4, y: 0 },
//   { id: 5, label: 'Sat', x: 5, y: 0 },
//   { id: 6, label: 'Sun', x: 6, y: 0 },
// ]

export interface StatsData {
  id: string
  label: string
  x: number
  y: number
}

const parseStatsData = (
  data: Array<number>,
  lang: LangType,
): Array<StatsData> => {
  const currentWeek = getDatesOfWeek(new Date())
  return data.map((item, index) => ({
    y: item,
    x: index,
    label: getDateName(new Date(currentWeek[index]), lang, 'short').split(
      ',',
    )[0],
    id: index.toString(),
  }))
}

export const ProfileUserScreen: React.FC = () => {
  const userProfile = useAppSelector(getUserData)
  const lang = useAppSelector(getLangConfig)

  const { colors } = useTheme()
  const styles = useStyles()
  const { t } = useTranslation()
  const scrollY = React.useRef(new Animated.Value(0)).current

  const [statsData, setStatsData] = React.useState<Array<StatsData>>(
    parseStatsData([0, 0, 0, 0, 0, 0, 0], lang),
  )

  const prepareStatisticData = React.useMemo((): ItemStatisticalProps[] => {
    const userDataMap = new Map(Object.entries(userProfile))
    return statisticField.map((item, index) => {
      let content = getStatisticContent.get(item)
      const value = userDataMap.get(item)
      const finalValue = Array.isArray(value)
        ? value.length
        : typeof value === 'object'
        ? value?.['name'] ?? '_'
        : value ?? 0

      return {
        id: index,
        label: content?.label ?? '',
        state: content?.state ?? 'StreakIcon',
        value: finalValue,
      }
    })
  }, [userProfile])

  React.useEffect(() => {
    if (userProfile._id !== '') {
      getUserLearningStats()
    }
  }, [userProfile])

  React.useEffect(() => {
    setStatsData((prev) => {
      return parseStatsData(
        prev.map((item) => item.y),
        lang,
      )
    })
  }, [lang])

  const getUserLearningStats = async () => {
    try {
      const response = await UserService.getLearningStats()
      setStatsData(parseStatsData(response.data.data, lang))
    } catch (e) {
      console.log(e)
    }
  }

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
          tintColor={colorBackground}
          accessibilityIgnoresInvertColors
          source={images.ProfileBackground}
          style={[styles.backgroundContainer, { width: widthBackground }]}
        />
      </Animated.View>
      <View style={styles.container}>
        <ScrollView
          onScroll={handleOnScroll}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
        >
          <HeaderAccount
            color={color}
            unOpacity={opacity}
            opacity={opacityHeader}
          />
          <UserCard />
          <Block paddingHorizontal={20}>
            <Text size={'h2'} fontFamily={'bold'} marginTop={20}>
              {t('process')}
            </Text>
            <LineChart
              haveDots
              haveXAxis
              height={300}
              data={statsData}
              lineColor="#FFEFAD"
              haveHorizontalGuides
              width={widthLineChart}
              onItemClick={handleItemClick}
            />

            <Text size={'h2'} fontFamily={'bold'} marginTop={20}>
              {t('statistical')}
            </Text>
            <FlatList
              numColumns={2}
              scrollEnabled={false}
              data={prepareStatisticData}
              columnWrapperStyle={styles.columnWrapper}
              contentContainerStyle={styles.statisticContainer}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => <StatisticalComponent {...item} />}
            />
            {/*<Text size={'h2'} fontFamily={'bold'} marginTop={20}>*/}
            {/*  {t('badges')}*/}
            {/*</Text>*/}
            {/*<FlatList*/}
            {/*  scrollEnabled={false}*/}
            {/*  data={userProfile.badges}*/}
            {/*  contentContainerStyle={styles.listBadgesStyle}*/}
            {/*  keyExtractor={(item) => item.id.toString()}*/}
            {/*  renderItem={({ item }) => <BadgesComponent {...item} />}*/}
            {/*/>*/}
          </Block>
        </ScrollView>
      </View>
    </Container>
  )
}
