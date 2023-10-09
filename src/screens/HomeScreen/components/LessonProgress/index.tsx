import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Block, CircleProgress, Image, ShadowBlock, Text } from '@components'
import { colors, normalize, useTheme } from '@themes'
import { Circle, Svg } from 'react-native-svg'

type TThemeColor = { primary: string; secondary: string }
const COLORS: Array<TThemeColor> = [
  {
    primary: colors.dark.orangePrimary,
    secondary: colors.dark.orangeLighter,
  },
  {
    primary: colors.dark.purpleLight,
    secondary: colors.dark.purpleLighter,
  },
  {
    primary: colors.dark.blue,
    secondary: colors.dark.bluePrimary,
  },
  {
    primary: colors.dark.greenDarkButton,
    secondary: colors.dark.greenLighter,
  },
  {
    primary: colors.dark.redThick,
    secondary: colors.dark.red,
  },
]
interface LessonProgressItemProps {
  index: number
  topicName: string
  topicImage: string
  lessonLabel: string
  progress: number
  onPress: () => void
}
export const LessonProgressItem = (props: LessonProgressItemProps) => {
  const { index, topicImage, topicName, lessonLabel, progress, onPress } = props
  const { colors } = useTheme()
  const [theme, setTheme] = React.useState<TThemeColor>()
  const getRandomColor = React.useCallback(() => {
    const randomIndex = Math.floor(Math.random() * COLORS.length)
    return COLORS[randomIndex]
  }, [])
  React.useEffect(() => {
    setTheme(getRandomColor())
  }, [])

  return (
    <Pressable
      style={[
        styles.container,
        index > 0 ? { marginStart: normalize.h(15) } : {},
      ]}
      onPress={onPress}
    >
      <Block
        backgroundColor="transparent"
        zIndex={1}
        absolute
        width={'100%'}
        height={'100%'}
        bottom={5}
        paddingHorizontal={13}
      >
        <Block row space="between">
          <Block flex paddingLeft={20} row alignEnd>
            <Image
              width={67}
              height={70}
              source={{ uri: topicImage }}
              backgroundColor="transparent"
              resizeMode="contain"
            />

            <Block flex>
              <Text
                numberOfLines={1}
                size={'h3'}
                fontFamily="bold"
                marginLeft={5}
                marginBottom={13}
              >
                {topicName}
              </Text>
            </Block>
          </Block>
          <Block
            alignSelf="flex-start"
            row
            alignCenter
            justifyCenter
            marginTop={10}
          >
            <Text
              size={'h5'}
              fontFamily="bold"
              color={theme?.primary}
              marginRight={3}
            >
              {progress}%
            </Text>

            <CircleProgress
              size={25}
              step={progress}
              totalSteps={100}
              strokeWidth={3}
              stepColor={theme?.primary}
              progressValueProps={{
                color: 'transparent',
                size: 0,
              }}
            />
          </Block>
        </Block>
        <Block
          backgroundColor={colors.white}
          shadow
          paddingHorizontal={11}
          paddingVertical={9}
          radius={10}
        >
          <Text size={'h5'} fontFamily="semiBold" color={colors.black}>
            {lessonLabel}
          </Text>
        </Block>
      </Block>
      <ShadowBlock
        shadowBackgroundColor={theme?.primary}
        width={'100%'}
        height={'100%'}
        overflow="hidden"
      >
        <Block width={53} height={53} absolute>
          <Svg width={'100%'} height={'100%'} viewBox="0 0 53 53">
            <Circle
              cx={53}
              cy={53}
              r={26.5}
              x={-50}
              y={-40}
              fill={theme?.secondary}
            />
          </Svg>
        </Block>
        <Block width={80} height={80} absolute right={-50} bottom={-40}>
          <Svg width={'100%'} height={'100%'} viewBox="0 0 80 80">
            <Circle
              cx={80}
              cy={80}
              r={40}
              x={-50}
              y={-40}
              fill={theme?.secondary}
            />
          </Svg>
        </Block>
      </ShadowBlock>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: normalize.h(262),
    height: normalize.h(107),
  },
})
