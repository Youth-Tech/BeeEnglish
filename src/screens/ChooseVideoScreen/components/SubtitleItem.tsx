import React from 'react'
import { useTheme } from '@themes'
import RewindIcon from './RewindIcon'
import { Pressable } from 'react-native'
import { Block, Text } from '@components'
import BackButton from '@screens/ChooseVideoScreen/components/BackButton'
import NextIcon from '@screens/ChooseVideoScreen/components/NextIcon'

export interface SubtitleItemProps {
  subtitle: string
  positionText: string
  onPressNext?: () => void
  onPressRewind?: () => void
  onPressPrevious?: () => void
}
const SubtitleItem = ({
  subtitle,
  onPressNext,
  positionText,
  onPressRewind,
  onPressPrevious,
}: SubtitleItemProps) => {
  const { colors } = useTheme()
  return (
    <Block
      width={340}
      radius={10}
      height={224}
      padding={15}
      borderWidth={1}
      space={'between'}
      borderColor={colors.greyPrimary}
    >
      <Block>
        <Block
          width={40}
          height={40}
          padding={8}
          radius={20}
          borderWidth={1}
          borderColor={colors.greyPrimary}
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
              paddingVertical={6}
              borderRightWidth={1}
              paddingHorizontal={14}
              borderColor={colors.greyPrimary}
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
