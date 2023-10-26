import React from 'react'
import i18next from 'i18next'
import Tooltip from 'rn-tooltip'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Pressable } from 'react-native'

import { widthScreen } from '@utils/helpers'
import { Icon, TIcon, images } from '@assets'
import { normalize, useTheme } from '@themes'
import { Block, Image, ShadowButton, Text } from '@components/bases'

export interface ItemLessonProps {
  id: string
  thumbnail: string
  lessonTitle: string
  isEndItem?: boolean
  lessonDescription: string
  type?: 'normal' | 'checkpoint'
  status: 'complete' | 'lock' | 'current'
  onUnlockPress?: (lessonId: string) => void
  onStartExaminationPress?: (lessonId: string) => void
  onStartLessonPress?: (lessonId: string, isRestart?: boolean) => void
}

const getTypeOfModal = new Map([
  ['lock', i18next.t('lock_lesson')],
  ['current', i18next.t('new_lesson')],
  ['checkpoint', i18next.t('practice')],
  ['complete', i18next.t('old_lesson')],
])

const getIconByType = new Map([
  ['current', 'Lighter' as TIcon],
  ['complete', 'Lighter' as TIcon],
  ['lock', 'IconLockSmall' as TIcon],
  ['checkpoint', 'Question' as TIcon],
])

export const PopOver: React.FC<Partial<ItemLessonProps>> = ({
  id,
  type,
  status,
  lessonTitle,
  onUnlockPress,
  lessonDescription,
  onStartLessonPress,
  onStartExaminationPress,
}) => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  return (
    <Block width={'100%'}>
      <Block
        row
        alignCenter
        marginBottom={11}
        style={styles.typeModalContainer}
      >
        <Icon
          state={
            (type === 'normal'
              ? getIconByType.get(status || 'complete')
              : getIconByType.get('checkpoint')) as TIcon
          }
        />
        <Text fontFamily="bold" size={'h5'} style={styles.textTypeModal}>
          {type === 'normal'
            ? getTypeOfModal.get(status || 'complete')
            : getTypeOfModal.get('checkpoint')}
        </Text>
      </Block>

      <Text fontFamily="bold" size={'h4'} style={styles.titleModal}>
        {type === 'checkpoint'
          ? t('practice_title')
          : status === 'lock'
          ? t('lock_title')
          : lessonTitle}
      </Text>
      <Text size={'h5'}>
        {type === 'checkpoint'
          ? t('practice_description')
          : status === 'lock'
          ? t('lock_description')
          : lessonDescription}
      </Text>

      <Block row space="between" marginTop={25} alignCenter>
        {status === 'complete' ? (
          // button for old lesson
          <Block row space="between" marginLeft={-5}>
            <ShadowButton
              shadowHeight={3}
              buttonHeight={30}
              buttonRadius={10}
              buttonBorderSize={0.5}
              buttonColor={colors.yellowDark}
              buttonBorderColor={colors.orangePrimary}
              shadowButtonColor={colors.orangePrimary}
              onPress={() => onStartLessonPress?.(id!)}
            >
              <Text size={'h4'} fontFamily="bold" paddingHorizontal={10}>
                {t('continue_learn')}
              </Text>
            </ShadowButton>
            <ShadowButton
              shadowHeight={3}
              buttonHeight={30}
              buttonRadius={10}
              buttonBorderSize={0.5}
              buttonColor={colors.white}
              buttonBorderColor={colors.orangePrimary}
              shadowButtonColor={colors.orangePrimary}
              onPress={() => onStartLessonPress?.(id!, true)}
            >
              <Text size={'h4'} fontFamily="bold" paddingHorizontal={10}>
                {t('learn_again')}
              </Text>
            </ShadowButton>
          </Block>
        ) : (
          // button for current lesson
          <ShadowButton
            shadowHeight={3}
            buttonHeight={30}
            buttonRadius={10}
            buttonBorderSize={0.5}
            buttonColor={colors.yellowDark}
            containerStyle={styles.buttonStart}
            onPress={() =>
              type === 'checkpoint'
                ? onStartExaminationPress?.(id!)
                : status === 'lock'
                ? onUnlockPress?.(id!)
                : onStartLessonPress?.(id!)
            }
            buttonBorderColor={colors.orangePrimary}
            shadowButtonColor={colors.orangePrimary}
          >
            <Text size={'h4'} fontFamily="bold">
              {type === 'checkpoint'
                ? t('start_practice')
                : status === 'lock'
                ? t('unlock')
                : t('lets_start')}
            </Text>
          </ShadowButton>
        )}
        <Image
          style={styles.imageModal}
          source={images.BeeWithHoney}
          resizeMode="contain"
        />
      </Block>
    </Block>
  )
}

export const ItemLesson: React.FC<ItemLessonProps> = ({
  id,
  status,
  thumbnail,
  isEndItem,
  lessonTitle,
  onUnlockPress,
  type = 'normal',
  lessonDescription,
  onStartLessonPress,
  onStartExaminationPress,
}) => {
  const { colors } = useTheme()
  const ref = React.useMemo(() => React.createRef<Tooltip>(), [])

  return (
    <Pressable
      onPress={() => {
        ref.current?.toggleTooltip()
      }}
    >
      <Block row style={styles.itemContainer}>
        <Block>
          <Tooltip
            ref={ref}
            height={'auto'}
            actionType="press"
            backgroundColor="white"
            width={widthScreen - 40}
            pointerColor="transparent"
            containerStyle={styles.tooltipStyle}
            popover={
              <PopOver
                id={id}
                type={type}
                status={status}
                lessonTitle={lessonTitle}
                onUnlockPress={onUnlockPress}
                lessonDescription={lessonDescription}
                onStartLessonPress={onStartLessonPress}
                onStartExaminationPress={onStartExaminationPress}
              />
            }
          >
            <Block
              width={68}
              height={68}
              radius={68}
              padding={5}
              borderWidth={2}
              borderColor={
                status === 'complete' ? colors.orangePrimary : '#DAE1EA'
              }
            >
              <Image
                style={styles.lessonImage}
                source={{
                  uri: thumbnail,
                }}
              />

              {status === 'lock' && type === 'normal' && (
                <Block
                  alignCenter
                  radius={68}
                  justifyCenter
                  style={StyleSheet.absoluteFill}
                  backgroundColor="rgba(255, 250, 250, 0.56)"
                >
                  <Icon state="Lock" fill="white" />
                </Block>
              )}

              {status === 'complete' && !isEndItem && (
                <Block absolute bottom={-8} alignSelf="center">
                  <Icon state="CheckSmall" />
                </Block>
              )}
            </Block>
          </Tooltip>

          {!isEndItem && (
            <Block
              width={2}
              height={20}
              radius={10}
              alignSelf="center"
              marginTop={status === 'complete' ? 6 : 4}
              backgroundColor={
                status === 'complete' ? colors.orangePrimary : '#DAE1EA'
              }
            />
          )}
        </Block>

        <Block
          flex
          height={68}
          justifyCenter
          backgroundColor={
            status === 'current'
              ? '#F3F8F3'
              : type === 'checkpoint'
              ? '#FFF2CE'
              : 'transparent'
          }
          style={styles.blockLabel}
        >
          <Text fontFamily="bold" size={'h3'} numberOfLines={1}>
            {lessonTitle}
          </Text>
          <Text fontFamily="regular" size={'h5'} numberOfLines={2}>
            {lessonDescription}
          </Text>
        </Block>
      </Block>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    gap: normalize.h(10),
    marginBottom: normalize.h(4),
  },
  lessonImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  blockLabel: {
    borderRadius: 8,
    gap: normalize.v(5),
    padding: normalize.h(12),
  },

  // style for modal
  imageModal: {
    width: normalize.h(37),
    height: normalize.v(37),
  },

  tooltipStyle: {
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E4E700',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    transform: [{ translateX: -20 }],
    paddingVertical: normalize.v(15),
    paddingHorizontal: normalize.h(20),
  },

  titleModal: {
    marginBottom: normalize.v(9),
  },
  textTypeModal: {
    marginTop: normalize.v(3),
  },
  typeModalContainer: {
    gap: normalize.h(9),
  },
  buttonStart: {
    flex: 1,
    marginStart: -5,
    marginEnd: normalize.h(20),
  },
})
