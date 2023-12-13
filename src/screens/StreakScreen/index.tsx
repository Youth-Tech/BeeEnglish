import {
  withTiming,
  withRepeat,
  useSharedValue,
  cancelAnimation,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { Pressable } from 'react-native'
import React, { useCallback } from 'react'
import Toast from 'react-native-toast-message'
import { useTranslation } from 'react-i18next'
import FastImage from 'react-native-fast-image'

import {
  Text,
  Block,
  Modal,
  Container,
  ShadowButton,
  BlockAnimated,
} from '@components'
import {
  TaskItem,
  StreakDay,
  WeekCalendar,
} from '@screens/StreakScreen/components'
import { useTheme } from '@themes'
import { Icon, images } from '@assets'
import { UserService } from '@services'
import { Task } from '@services/TaskService'
import { getStreak, getTask } from '@redux/selectors'
import { useAppDispatch, useAppSelector } from '@hooks'
import { ModalFunction } from '@components/bases/Modal/type'
import { getTaskThunk, updateStreakThunk } from '@redux/actions'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'

export const StreakScreen = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const taskData = useAppSelector(getTask)
  const { colors, normalize } = useTheme()
  const [userCoins, setUserCoins] = React.useState(0)
  const modalRef = React.useRef<ModalFunction>(null)

  const rotateModal = useSharedValue(0)
  const streakDays = useAppSelector(getStreak).streaks

  const isPresent = !!streakDays?.find(
    (item) =>
      new Date(item.date).toLocaleDateString() ===
        new Date().toLocaleDateString() && item.type === 'isAttendance',
  )

  React.useEffect(() => {
    if (taskData === undefined) {
      dispatch(getTaskThunk())
    }
  }, [taskData])

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

  const renderTaskItem = ({ index, item }: ListRenderItemInfo<Task>) => {
    return (
      <Block marginTop={14} key={`item-task-${index}`}>
        <TaskItem data={item} />
      </Block>
    )
  }
  const getCoins = async () => {
    try {
      const response = await UserService.getCoins()
      setUserCoins(response.data.data.coin)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    getCoins()
  }, [])
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
            <WeekCalendar data={streakDays ?? []} />
          </Block>
        </Pressable>
        <Block marginTop={20} row space={'between'}>
          <Text size={'h3'} fontFamily={'bold'} color={colors.black}>
            {t('mission')}
          </Text>
          <Block row justifyCenter alignCenter>
            <Text size={'h5'} fontFamily={'bold'} lineHeight={18}>
              {userCoins}
            </Text>
            <Icon state={'Honey'} />
          </Block>
        </Block>
        <Block marginBottom={14} style={{ minWidth: 5, minHeight: 5 }}>
          <FlashList
            data={taskData}
            estimatedItemSize={69}
            renderItem={renderTaskItem}
            keyExtractor={(_, index) => `item-task-${index}`}
          />
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
              {streakDays?.map((item, index) => (
                <Block
                  key={`item-date-${index}`}
                  marginLeft={index > 0 ? 10 : 0}
                >
                  <StreakDay date={item.date} type={item.type} />
                </Block>
              ))}
            </Block>
            <Block justifyCenter alignCenter>
              <BlockAnimated style={rStyle}>
                <FastImage
                  source={images.Light}
                  style={{
                    width: normalize.h(191.92),
                    height: normalize.h(195.02),
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </BlockAnimated>
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
      <Toast />
    </Container>
  )
}
