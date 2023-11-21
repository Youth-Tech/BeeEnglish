import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Block, Text } from '@components'
import RewindIcon from './RewindIcon'
import { useTheme } from '@themes'
import { widthScreen } from '@utils/helpers'
import BackButton from '@screens/ChooseVideoScreen/components/BackButton'
import NextIcon from '@screens/ChooseVideoScreen/components/NextIcon'
export interface SubtitleItemProps {
  onPressRewind?: () => void
  subtitle: string
  positionText: string
  onPressPrevious?: () => void
  onPressNext?: () => void
}
const SubtitleItem = ({
  onPressRewind,
  subtitle,
  positionText,
  onPressPrevious,
  onPressNext,
}: SubtitleItemProps) => {
  const { colors } = useTheme()
  return (
    <Block
      width={340}
      borderWidth={1}
      height={224}
      borderColor={colors.greyPrimary}
      radius={10}
      padding={15}
      space={'between'}
    >
      <Block>
        <Block
          width={40}
          height={40}
          padding={8}
          borderWidth={1}
          borderColor={colors.greyPrimary}
          radius={20}
        >
          <RewindIcon onPress={onPressRewind} />
        </Block>
        <Block alignCenter marginTop={24}>
          <Text size={'h2'} fontFamily={'bold'} color={colors.black}>
            {subtitle}
          </Text>
        </Block>
      </Block>
      <Block row space={'between'} alignCenter height={50}>
        <Text>{positionText}</Text>
        <Block
          row
          radius={20}
          borderWidth={1}
          borderColor={colors.greyPrimary}
          style={{ alignSelf: 'baseline' }}
        >
          <Pressable onPress={onPressPrevious}>
            <Block
              borderRightWidth={1}
              borderColor={colors.greyPrimary}
              paddingVertical={6}
              paddingHorizontal={14}
            >
              <BackButton stroke={colors.black} />
            </Block>
          </Pressable>
          <Pressable onPress={onPressNext}>
            <Block paddingVertical={6} paddingHorizontal={14}>
              <NextIcon stroke={colors.black} />
            </Block>
          </Pressable>
        </Block>
      </Block>
    </Block>
  )
}
export default SubtitleItem
const styles = StyleSheet.create({
  container: {},
})
