import Animated, {
  withRepeat,
  withTiming,
  useSharedValue,
  cancelAnimation,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { Pressable } from 'react-native'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import FastImage from 'react-native-fast-image'

import {
  TaskItem,
  StreakDay,
  TaskItemProps,
  WeekCalendar,
} from '@screens/StreakScreen/components'
import { useTheme } from '@themes'
import { Icon, images } from '@assets'
import { getStreak } from '@redux/selectors'
import { updateStreakThunk } from '@redux/actions'
import { useAppDispatch, useAppSelector } from '@hooks'
import { ModalFunction } from '@components/bases/Modal/type'
import { Block, Container, Modal, ShadowButton, Text } from '@components'

const TaskData: TaskItemProps[] = [
  {
    taskType: 'money',
    taskName: 'Nạp 1 triệu vô tài khoản',
    honeyAmount: 100,
  },
  {
    taskType: 'learning',
    taskName: 'Học 2 bài học',
    honeyAmount: 30,
  },
  {
    taskType: 'game',
    taskName: 'Nạp 1 triệu vô tài khoản',
    honeyAmount: 10,
  },
  {
    taskType: 'game',
    taskName: 'Hạ 2 đối thủ',
    honeyAmount: 30,
  },
  {
    taskType: 'learning',
    taskName: 'Học 5 từ vựng mới',
    honeyAmount: 56,
  },
  {
    taskType: 'learning',
    taskName: 'Học 5 từ vựng mới',
    honeyAmount: 56,
  },
  {
    taskType: 'learning',
    taskName: 'Học 5 từ vựng mới',
    honeyAmount: 56,
  },
  {
    taskType: 'learning',
    taskName: 'Học 5 từ vựng mới',
    honeyAmount: 56,
  },
]

const AnimatedBlock = Animated.createAnimatedComponent(Block)
export const StreakScreen = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { colors, normalize } = useTheme()

  const modalRef = React.useRef<ModalFunction>(null)

  const rotateModal = useSharedValue(0)
  const streakDays = useAppSelector(getStreak).streaks

  const isPresent = !!streakDays.find(
    (item) =>
      new Date(item.date).toLocaleDateString() === new Date().toLocaleDateString() &&
      item.type === 'isAttendance',
  )

  const handleOpenModal = useCallback(() => {
    rotateModal.value = withRepeat(withTiming(180, { duration: 1000 }), -1)
    modalRef.current?.openModal()
  }, [])

  const onCloseModal = () => {
    cancelAnimation(rotateModal)
    rotateModal.value = 0
  }

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotateModal.value}deg` }],
    }
  })

  const handleAttend = () => {
    dispatch(updateStreakThunk())
  }


  return (
    <Container hasScroll>
      <Block paddingHorizontal={20} paddingTop={15}>
        <Block row space={'between'}>
          <Text
            size={'h3'}
            lineHeight={20}
            fontFamily={'bold'}
            color={colors.black}
          >
            {t('streak')}
          </Text>
          <Icon state={'Present'} onPress={handleOpenModal} />
        </Block>
        <Pressable onPress={handleOpenModal}>
          <Block marginTop={15}>
            <WeekCalendar data={streakDays} />
          </Block>
        </Pressable>
        <Block marginTop={20} row space={'between'}>
          <Text size={'h3'} fontFamily={'bold'} color={colors.black}>
            {t('mission')}
          </Text>
          <Block row justifyCenter alignCenter>
            <Text size={'h5'} fontFamily={'bold'} lineHeight={18}>
              200
            </Text>
            <Icon state={'Honey'} />
          </Block>
        </Block>
        <Block marginBottom={14}>
          {TaskData.map((item, index) => (
            <Block marginTop={14} key={`item-task-${index}`}>
              <TaskItem
                taskType={item.taskType}
                taskName={item.taskName}
                honeyAmount={item.honeyAmount}
              />
            </Block>
          ))}
        </Block>
      </Block>
      <Modal ref={modalRef} position={'center'} onDismiss={onCloseModal}>
        <Block
          backgroundColor={'white'}
          marginHorizontal={20}
          height={365}
          radius={10}
          padding={6}
        >
          <Block
            flex
            radius={10}
            alignCenter
            borderWidth={1}
            borderColor={colors.orangeDark}
          >
            <Block marginTop={29} row>
              {streakDays.map((item, index) => (
                <Block
                  key={`item-date-${index}`}
                  marginLeft={index > 0 ? 10 : 0}
                >
                  <StreakDay date={item.date} type={item.type} />
                </Block>
              ))}
            </Block>
            <Block justifyCenter alignCenter>
              <AnimatedBlock style={rStyle}>
                <FastImage
                  source={images.Light}
                  style={{
                    width: normalize.h(191.92),
                    height: normalize.h(195.02),
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </AnimatedBlock>
              <FastImage
                source={images.ChestBox}
                style={{
                  width: normalize.h(76),
                  height: normalize.h(76),
                  position: 'absolute',
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </Block>
            <Text size={'h3'} fontFamily={'bold'} color={colors.black}>
              {isPresent ? t('comeback_tomorrow') : t('welcome_back')}
            </Text>
            <ShadowButton
              shadowHeight={7}
              buttonHeight={40}
              buttonWidth={263}
              buttonRadius={10}
              containerStyle={{
                alignSelf: 'center',
                marginTop: normalize.v(26),
              }}
              disabled={isPresent}
              onPress={handleAttend}
              buttonColor={colors.orangePrimary}
              shadowButtonColor={colors.orangeLighter}
            >
              <Text color="white" fontFamily="bold" size={'h3'}>
                {t('attend')}
              </Text>
            </ShadowButton>
          </Block>
        </Block>
        <Block
          absolute
          top={-10}
          alignCenter
          justifyCenter
          alignSelf={'center'}
        >
          <FastImage
            source={images.StreakBox}
            resizeMode={FastImage.resizeMode.contain}
            style={{ width: normalize.h(210.5), height: normalize.h(37.04) }}
          />
          <Text
            size={'h3'}
            fontFamily={'bold'}
            color={colors.orangeDark}
            style={{ position: 'absolute' }}
          >
            {t('attendance')}
          </Text>
        </Block>
      </Modal>
    </Container>
  )
}
