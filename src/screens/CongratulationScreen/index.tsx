import React from 'react'
import LottieView from 'lottie-react-native'
import { useTranslation } from 'react-i18next'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { animation } from '@assets'
import { useAppDispatch } from '@hooks'
import { SoundUtil } from '@utils/soundUtils'
import { makeStyles, useTheme } from '@themes'
import { updateProfile } from '@redux/actions'
import { updateFetchNewLessonState } from '@redux/reducers'
import { Block, Container, ShadowButton, Text } from '@components'
import { navigateAndReset, pop, RootStackParamList } from '@navigation'

export type CongratulationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CONGRATULATION_SCREEN'
>

export const CongratulationScreen: React.FC<CongratulationScreenProps> = ({
  route,
}) => {
  const { status, point, type } = route.params

  const dispatch = useAppDispatch()
  const styles = useStyle()
  const { t } = useTranslation()
  const { colors, normalize } = useTheme()

  if (status === 'success') {
    SoundUtil.testSuccessful.play()
  } else {
    SoundUtil.testFailure.play()
  }

  const onContinuePress = () => {
    if (status === 'success') {
      dispatch(updateProfile())
      dispatch(updateFetchNewLessonState(true))
      navigateAndReset(
        [
          {
            name: 'BOTTOM_TAB',
          },
        ],
        0,
      )
    } else {
      pop(1)
    }
  }

  return (
    <Container>
      <Block flex paddingHorizontal={25} space="between">
        <LottieView
          autoPlay
          source={animation.beeCongratulation}
          style={styles.animationStyle}
        />

        <Block alignCenter>
          <Text size={'h2'} fontFamily="bold" color={colors.redThick}>
            {t('congratulation')}
          </Text>
          <Text size={'h2'} fontFamily="bold" center marginTop={10}>
            {status === 'success'
              ? t('congratulation_desc')
              : t('congratulation_desc_failure', {
                  point: Math.floor((type === 'checkpoint' ? 80 : 60) - point),
                })}
          </Text>
        </Block>

        <Block
          width={300}
          radius={20}
          backgroundColor={colors.orangePrimary}
          padding={10}
        >
          <Text
            size={'h3'}
            color="white"
            fontFamily="bold"
            center
            marginBottom={10}
          >
            {t('reward')}
          </Text>

          <Block
            backgroundColor="white"
            paddingVertical={25}
            paddingHorizontal={20}
            radius={20 - 7}
          >
            <Text size={'h3'} fontFamily="bold" center marginBottom={10}>
              Bạn nhận được 10 star points ✨
            </Text>
          </Block>
        </Block>

        <ShadowButton
          buttonHeight={40}
          shadowHeight={6}
          containerStyle={{
            marginBottom: normalize.v(30),
          }}
          buttonRadius={10}
          buttonColor={'#58CC02'}
          onPress={onContinuePress}
          shadowButtonColor={'#58A700'}
        >
          <Text size={'h3'} fontFamily="bold" color="white">
            {t('continue_button')}
          </Text>
        </ShadowButton>
      </Block>
    </Container>
  )
}

const useStyle = makeStyles()(({ normalize }) => ({
  animationStyle: {
    aspectRatio: 1,
    alignSelf: 'center',
    width: normalize.h(250),
  },
}))
