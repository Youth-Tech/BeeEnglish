import { useTranslation } from 'react-i18next'
import FastImage from 'react-native-fast-image'

import { useTheme } from '@themes'
import { Icon, images } from '@assets'
import React, { useState } from 'react'
import { goBack, RootStackParamList } from '@navigation'
import { ImageBackground, Pressable } from 'react-native'
import { Block, Container, Image, Text } from '@components'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ReviewService, UserService } from '@services'
import { useAppDispatch } from '@hooks'
import { updateBookmarkWords, updateReviewWords } from '@redux/reducers'

export type DetailLessonScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DETAIL_LESSON_SCREEN'
>

export const DetailLessonScreen: React.FC<DetailLessonScreenProps> = ({
  route,
  navigation,
}) => {
  const { lessonId, chapterId, nextLessonId } = route.params

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { colors, normalize } = useTheme()
  const [activeBlock, setActiveBlock] = useState(0)
  const getWordBookmarksByLesson = async () => {
    try {
      const response = await UserService.getWordsBookmark(lessonId)
      //TODO: add to redux
      dispatch(updateBookmarkWords(response.data.data.words))
    } catch (e) {
      console.log(e)
    }
  }
  const getWordReviewsByLesson = async () => {
    try {
      const response = await ReviewService.getAllWordReviews(lessonId)
      //TODO: add to redux
      dispatch(updateReviewWords(response.data.data.wordsReview))
    } catch (e) {
      console.log(e)
    }
  }
  const onPressChange = (blockNumber: number) => {
    setActiveBlock(blockNumber)
    if (blockNumber === 1) {
      navigation.navigate('VOCAB_SCREEN', { lessonId })
    } else if (blockNumber === 2) {
      navigation.navigate('GRAMMAR_SCREEN', {
        lessonId,
        chapterId,
        nextLessonId,
      })
    }
  }
  React.useEffect(() => {
    getWordBookmarksByLesson()
    getWordReviewsByLesson()
  })
  return (
    <Container>
      <ImageBackground
        source={images.BGDetailLesson}
        style={{ flex: 1, paddingTop: normalize.h(5.23) }}
      >
        <Block space="between" row paddingHorizontal={20}>
          <Icon state="Back" onPress={goBack}></Icon>
          <Icon state="MenuHeading" onPress={() => {}} />
        </Block>

        <Block
          shadow
          marginVertical={26}
          marginHorizontal={20}
          radius={10}
          backgroundColor={colors.white}
          flex
          alignCenter
        >
          <Block absolute alignSelf="center" top={-11} zIndex={1}>
            <FastImage
              source={images.StreakBox}
              style={{ width: normalize.h(210.5), height: normalize.h(37.84) }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text
              fontFamily="bold"
              size={'h2'}
              alignSelf="center"
              style={{ position: 'absolute', top: 10 }}
            >
              {t('lesson')}
            </Text>
          </Block>
          <Pressable onPress={() => onPressChange(1)}>
            <ImageBackground
              source={
                activeBlock === 1
                  ? images.OrangePrimaryFrame
                  : images.OrangeLightFrame
              }
              resizeMode="contain"
              style={{
                alignItems: 'center',
                paddingHorizontal: normalize.h(40),
                paddingVertical: normalize.v(40),
                marginTop: normalize.v(65),
              }}
            >
              <Block alignCenter>
                <Image
                  source={images.Vocabulary}
                  width={75}
                  height={75}
                ></Image>
                <Text center fontFamily="bold" size={'h3'}>
                  {t('vocabulary')}
                </Text>
              </Block>
            </ImageBackground>
          </Pressable>
          <Pressable onPress={() => onPressChange(2)}>
            <ImageBackground
              source={
                activeBlock === 2
                  ? images.OrangePrimaryFrame
                  : images.OrangeLightFrame
              }
              resizeMode="contain"
              style={{
                alignItems: 'center',
                paddingHorizontal: normalize.h(40),
                paddingVertical: normalize.v(40),
                marginTop: normalize.v(65),
              }}
            >
              <Block alignCenter>
                <Image source={images.MultipleChoice} width={75} height={75} />
                <Text center fontFamily="bold" size={'h3'}>
                  {t('multiple_choice')}
                </Text>
              </Block>
            </ImageBackground>
          </Pressable>
        </Block>
      </ImageBackground>
    </Container>
  )
}
