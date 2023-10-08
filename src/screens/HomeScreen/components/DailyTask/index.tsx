import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Block, Image, LinearGradient, Text } from '@components'
import { baseStyles, useTheme } from '@themes'
import { Icon, TIcon, images } from '@assets'
import { useTranslation } from 'react-i18next'

interface Props {
  icon: TIcon
  taskName: string
  finishedTask: number
  totalTask: number
  onPress: () => void
}

const DailyTask = (props: Props) => {
  const { icon, taskName, finishedTask, totalTask, onPress } = props
  const { colors } = useTheme()
  const { t } = useTranslation()
  return (
    <Pressable onPress={onPress}>
      <Block
        height={71}
        borderColor={colors.red}
        borderWidth={1}
        radius={10}
        backgroundColor="white"
      >
        <Block
          flex
          row
          alignCenter
          backgroundColor="transparent"
          paddingLeft={19}
        >
          <Icon state={icon} />
          <Text
            size={'h3'}
            fontFamily="bold"
            color={colors.black}
            marginLeft={15}
            lineHeight={80}
          >
            {taskName}
          </Text>
        </Block>
        <Block
          width={24}
          height={33}
          backgroundColor="transparent"
          justifyCenter
          alignCenter
          absolute
          right={20}
        >
          <Block
            style={baseStyles.absoluteFill}
            zIndex={1}
            backgroundColor="transparent"
            justifyCenter
            alignCenter
          >
            <Text size={'h5'} fontFamily="bold" color={colors.white}>
              {finishedTask}/{totalTask}
            </Text>
          </Block>

          <Image
            source={images.TaskFlag}
            width={'100%'}
            height={'100%'}
            resizeMode="contain"
          />
        </Block>
        <Block
          backgroundColor="transparent"
          style={[baseStyles.absoluteFill, { top: -10 }]}
          alignCenter
        >
          <Block
            backgroundColor="transparent"
            width={149}
            height={20}
            justifyCenter
            alignCenter
          >
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

export default DailyTask

const styles = StyleSheet.create({})
