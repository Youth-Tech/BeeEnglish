import { Pressable } from 'react-native'
import React from 'react'
import { Block, Image, LinearGradient, Text } from '@components'
import { baseStyles, useTheme } from '@themes'
import { Icon, TIcon, images } from '@assets'
import { useTranslation } from 'react-i18next'
import { Task } from '@services/TaskService'

interface Props {
  data: Task[]
  onPress: () => void
}

export const DailyTask = (props: Props) => {
  const { data, onPress } = props
  const { colors } = useTheme()
  const { t } = useTranslation()
  const finishedTaskNumber = () => {
    let finishedNumber = 0
    data.forEach((e) => {
      if (e.status === 'done') {
        finishedNumber++
      }
    })
    return finishedNumber
  }
  const currentIcon = (type: string) => {
    switch (type) {
      case 'learn':
        return 'LearnBook'
      case 'read':
        return 'LearnBook'
      case 'time':
        return 'Clock'

      default:
        return 'LearnBook'
    }
  }
  const renderCurrentTask = () => {
    const currentTask = { title: t('you_finished_all_tasks'), icon: 'Firework' }

    data.find((e) => {
      if (e.status === 'pending') {
        currentTask.title = e.title
        currentTask.icon = currentIcon(e.type)
        return true
      }
      return false
    })
    return currentTask
  }
  return (
    <Pressable onPress={onPress}>
      <Block
        height={90}
        borderColor={colors.red}
        borderWidth={1}
        radius={10}
        backgroundColor="white"
      >
        <Block flex row justifyCenter alignCenter paddingHorizontal={10}>
          <Icon state={renderCurrentTask().icon as TIcon} />
          <Block justifyCenter alignCenter>
            <Text
              size={'h3'}
              fontFamily="bold"
              color={colors.black}
              numberOfLines={1}
              marginLeft={15}
            >
              {renderCurrentTask().title}
            </Text>
          </Block>
        </Block>
        <Block
          width={24}
          height={33}
          justifyCenter
          alignCenter
          absolute
          right={20}
        >
          <Block
            style={baseStyles.absoluteFill}
            zIndex={1}
            justifyCenter
            alignCenter
          >
            <Text size={'h5'} fontFamily="bold" color={colors.white}>
              {finishedTaskNumber()}/{data.length}
            </Text>
          </Block>

          <Image
            source={images.TaskFlag}
            width={'100%'}
            height={'100%'}
            resizeMode="contain"
          />
        </Block>
        <Block style={[baseStyles.absoluteFill, { top: -10 }]} alignCenter>
          <Block width={149} height={20} justifyCenter alignCenter>
            <Text
              size={'h5'}
              fontFamily="bold"
              style={{ zIndex: 1 }}
              color={colors.white}
            >
              {t('daily_task')}
            </Text>
            <LinearGradient
              colors={['#FFC107', '#E9733F']}
              containerStyle={{
                width: 149,
                height: '100%',
                position: 'absolute',
                borderRadius: 32,
                overflow: 'hidden',
              }}
            />
          </Block>
        </Block>
      </Block>
    </Pressable>
  )
}
