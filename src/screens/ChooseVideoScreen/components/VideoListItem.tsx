import React from 'react'
import { Block, BlockAnimated, Image, ShadowButton, Text } from '@components'
import { useTheme } from '@themes'
import { useTranslation } from 'react-i18next'
import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'

export interface VideoListItemProps {
  id: string
  src?: string
  title?: string
  description?: string
  onPress?: () => void
  index?: number
  scrollX?: SharedValue<number>
}
const VideoListItem: React.FC<VideoListItemProps> = (props) => {
  const { src, title, description, onPress, index, scrollX } = props
  const { colors, normalize } = useTheme()
  const { t } = useTranslation()
  const WIDTH_ITEM = normalize.h(279)
  const translateYAnimation = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollX!.value,
      [
        (index! - 2) * WIDTH_ITEM,
        (index! - 1) * WIDTH_ITEM,
        index! * WIDTH_ITEM,
      ],
      [0, -50, 0],
      Extrapolation.CLAMP,
    )
    return {
      transform: [{ translateY }],
    }
  })
  return (
    <BlockAnimated
      width={279}
      radius={10}
      height={350}
      overflow={'hidden'}
      paddingBottom={15}
      backgroundColor={colors.white}
      shadow
      style={translateYAnimation}
    >
      <Block flex>
        <Image
          source={{
            uri: src,
          }}
          width={'100%'}
          height={198.18}
          resizeMode={'cover'}
        />
        <Block paddingHorizontal={10} alignStart>
          <Text
            size={'h3'}
            fontFamily={'semiBold'}
            color={colors.black}
            marginTop={10}
          >
            {title}
          </Text>
          <Text
            size={'h4'}
            fontFamily={'regular'}
            color={colors.black}
            marginTop={20}
          >
            {description}
          </Text>
        </Block>
      </Block>
      <ShadowButton
        buttonWidth={238}
        buttonHeight={46}
        buttonRadius={15}
        buttonColor={colors.orangeLight}
        buttonBorderColor={colors.orangePrimary}
        shadowButtonColor={colors.orangePrimary}
        containerStyle={{
          alignSelf: 'center',
          marginTop: 20,
        }}
        onPress={onPress}
      >
        <Text size={'h3'} fontFamily={'semiBold'}>
          {t('watch_video')}
        </Text>
      </ShadowButton>
    </BlockAnimated>
  )
}
export default VideoListItem
