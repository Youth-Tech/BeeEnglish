import React from 'react'
import { Block, Image, Text } from '@components'
import { baseStyles, useTheme } from '@themes'
import { Icon, SoundProgress, withSpringConfig } from '@assets'
import { Pressable } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

interface FlipVocabularyProps {}
const AnimatedBlock = Animated.createAnimatedComponent(Block)
const FlipVocabulary: React.FC<FlipVocabularyProps> = (props) => {
  const { colors, normalize } = useTheme()
  const rotateY = useSharedValue(0)
  const rotateYValue = useDerivedValue(() => {
    return withSpring(rotateY.value === 0 ? 0 : 180, withSpringConfig)
  })

  const rStyleRotate = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotateYValue.value}deg` }],
    }
  })

  const handleClickVocab = () => {
    console.log('clicked')
    if (rotateY.value <= 180 && rotateY.value != 0) {
      rotateY.value = 0
    } else {
      rotateY.value = 1
    }
  }
  const rotateContentStyleFront = useAnimatedStyle(() => {
    const rotateYContent = interpolate(rotateYValue.value, [0, 180], [1, 0], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP,
    })
    return {
      opacity: rotateYContent,
    }
  })
  const rotateContentStyleBack = useAnimatedStyle(() => {
    const rotateYContent = interpolate(rotateYValue.value, [0, 180], [0, 1], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP,
    })
    return {
      opacity: rotateYContent,
    }
  })
  const zIndexContentStyleBack = useAnimatedStyle(() => {
    const rotateYContent = interpolate(rotateYValue.value, [0, 180], [-1, 0], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP,
    })
    return {
      zIndex: rotateYContent,
    }
  })
  return (
    <Pressable onPress={handleClickVocab}>
      <AnimatedBlock
        width={320}
        height={423}
        radius={10}
        style={[
          rStyleRotate,
          { borderWidth: 1, borderColor: colors.borderColor },
        ]}
        backgroundColor={'white'}
        overflow={'hidden'}
      >
        <Block>
          <AnimatedBlock
            row
            space={'between'}
            paddingHorizontal={15}
            paddingTop={16}
            style={rotateContentStyleFront}
          >
            <Icon state={'QuestionMark'} />
            <Icon state={'Bookmark'} size={24} strokeWidth={1} />
          </AnimatedBlock>
          <Block alignCenter>
            <Image
              source={{
                uri: 'https://t3.ftcdn.net/jpg/01/63/57/24/360_F_163572450_kNmeqPDO9EO2X2J97LCEqncKpEDImw3N.jpg',
              }}
              width={199}
              height={199}
              resizeMode={'contain'}
            />
            <AnimatedBlock style={rotateContentStyleFront} alignCenter>
              <Block marginTop={14} row alignCenter>
                <Text size={'heading'} fontFamily={'bold'} color={colors.black}>
                  Chicken
                </Text>
                <Pressable
                  onPress={() => {
                    console.log('alo')
                  }}
                >
                  <SoundProgress fill={colors.orangeDark} />
                </Pressable>
              </Block>
              <Text
                size={'h1'}
                fontFamily={'regular'}
                color={colors.greyPrimary}
                marginTop={5}
              >
                /ˈtʃɪk.ɪn/
              </Text>
              <Text
                size={'h2'}
                fontFamily={'regular'}
                paddingHorizontal={27}
                marginTop={20}
              >
                "The chicken in the backyard laid a fresh egg this morning."
              </Text>
            </AnimatedBlock>
          </Block>
        </Block>
        <AnimatedBlock
          style={[
            { transform: [{ rotateY: '-180deg' }] },
            baseStyles.absoluteFill,
            zIndexContentStyleBack,
          ]}
        >
          <AnimatedBlock
            row
            space={'between'}
            paddingHorizontal={15}
            paddingTop={16}
            style={[rotateContentStyleBack]}
          >
            <Icon state={'QuestionMark'} />
            <Icon state={'Bookmark'} size={24} strokeWidth={1} />
          </AnimatedBlock>
          <Block alignCenter flex>
            <Block width={199} height={199} />
            <AnimatedBlock
              flex
              space={'between'}
              alignCenter
              style={[rotateContentStyleBack]}
              paddingHorizontal={18}
            >
              <Block alignCenter>
                <Block marginTop={14} row alignCenter>
                  <Text
                    size={'heading'}
                    fontFamily={'bold'}
                    color={colors.black}
                  >
                    Con gà
                  </Text>
                  <Pressable
                    style={{
                      marginBottom: normalize.v(5),
                      marginStart: normalize.h(5),
                    }}
                    onPress={() => {
                      console.log('alo')
                    }}
                  >
                    <SoundProgress fill={colors.orangeDark} />
                  </Pressable>
                </Block>

                <Text
                  size={'h2'}
                  fontFamily={'regular'}
                  paddingHorizontal={27}
                  marginTop={20}
                >
                  "Con gà ở sân sau đã đẻ trứng vào buổi sáng"
                </Text>
              </Block>
              <Text
                size={'h4'}
                color={colors.bluePrimary}
                marginBottom={18}
                style={{ alignSelf: 'flex-start' }}
              >
                Xem thêm ví dụ
              </Text>
            </AnimatedBlock>
          </Block>
        </AnimatedBlock>
      </AnimatedBlock>
    </Pressable>
  )
}

export default FlipVocabulary
