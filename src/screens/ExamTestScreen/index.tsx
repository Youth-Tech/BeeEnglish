import {
  Text,
  Block,
  Image,
  Container,
  ShadowButton,
  ShadowBlock,
} from '@components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@themes'
import { Icon, images } from '@assets'
import { Pressable } from 'react-native'
import { goBack, navigate } from '@navigation'

export const ExamTestScreen = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const [activeBlock, setActiveBlock] = useState(0)
  const onPressChange = (blockNumber: React.SetStateAction<number>) => {
    setActiveBlock(blockNumber)
  }
  const goAboutTheTest = () => {
    if (activeBlock === 1) {
      navigate('ABOUT_THE_TEST_SCREEN')
    } else if (activeBlock === 2) {
      console.log('tôi chưa cập nhật màn hình này!')
    } else {
      console.log('Bạn phải chọn một trình độ trước khi tiếp tục!')
    }
  }

  return (
    <Container>
      <Block flex>
        <Block row paddingHorizontal={25}>
          <Icon state="Back" onPress={goBack} />
        </Block>
        <Block marginTop={25} paddingHorizontal={25}>
          <Text size={'heading'} fontFamily="bold">
            {t('your_current_level')}
          </Text>
        </Block>
        <Block marginTop={65} paddingHorizontal={25}>
          <Pressable onPress={() => onPressChange(1)}>
            <ShadowBlock
              row
              shadowColor={
                activeBlock === 1 ? colors.orangeDark : colors.greyDark
              }
              shadowHeight={3}
              width={'100%'}
              height={100}
              paddingHorizontal={13}
            >
              <Block paddingVertical={10}>
                <Image source={images.BeeDiscovery} width={66} height={80} />
              </Block>
              <Block paddingHorizontal={10} paddingVertical={25}>
                <Text fontFamily="semiBold" size={'h3'}>
                  {t('first_time_you_learn_english')}
                </Text>
                <Text lineHeight={40} fontFamily="regular" size={'h4'}>
                  {t('start_immediately')}
                </Text>
              </Block>
            </ShadowBlock>
          </Pressable>
          <Pressable onPress={() => onPressChange(2)}>
            <ShadowBlock
              shadowColor={
                activeBlock === 2 ? colors.orangeDark : colors.greyDark
              }
              shadowHeight={3}
              width={'100%'}
              height={100}
              row
              marginTop={30}
              paddingHorizontal={13}
            >
              <Block paddingVertical={10}>
                <Image source={images.BeeGraduated} width={66} height={80} />
              </Block>
              <Block paddingHorizontal={10} paddingVertical={25}>
                <Text fontFamily="semiBold" size={'h3'}>
                  {t('already_know_english_before')}
                </Text>
                <Text lineHeight={40} fontFamily="regular" size={'h4'}>
                  {t('lets_answer_some_questions')}
                </Text>
              </Block>
            </ShadowBlock>
          </Pressable>
        </Block>
      </Block>
      <Block marginBottom={80} paddingHorizontal={80}>
        <ShadowButton
          disabled={activeBlock == 0}
          buttonHeight={40}
          buttonBorderSize={2}
          buttonBorderColor={colors.orangePrimary}
          shadowHeight={6}
          buttonRadius={8}
          shadowButtonColor={colors.orangeLighter}
          buttonColor={colors.orangePrimary}
          onPress={goAboutTheTest}
        >
          <Text size={'h3'} fontFamily="bold" color={colors.white}>
            {t('continue_button')}
          </Text>
        </ShadowButton>
      </Block>
    </Container>
  )
}
