import React from 'react'
import i18next from 'i18next'
import Tooltip from 'rn-tooltip'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Pressable } from 'react-native'

import { Quiz } from '@services'
import { widthScreen } from '@utils/helpers'
import { Icon, TIcon, images } from '@assets'
import { normalize, useTheme } from '@themes'
import { Block, Image, ShadowButton, Text } from '@components/bases'

export interface ItemLessonProps {
  id: string
  thumbnail: string
  chapterId?: string
  checkpoint?: Quiz[]
  lessonTitle: string
  isEndItem?: boolean
  nextLessonId: string
  lessonDescription: string
  type?: 'normal' | 'checkpoint'
  chapterStatus: 'lock' | 'unlock'
  status: 'completed' | 'lock' | 'current'
  onUnlockPress?: (item: Partial<ItemLessonProps>) => void
  onTogglePopOver?: () => void
  onStartExaminationPress?: (item: Partial<ItemLessonProps>) => void
  onStartLessonPress?: (
    item: Partial<ItemLessonProps & { isRestart: boolean }>,
  ) => void
}

const getTypeOfModal = new Map([
  ['lock', i18next.t('lock_lesson')],
  ['current', i18next.t('new_lesson')],
  ['checkpoint', i18next.t('practice')],
  ['completed', i18next.t('old_lesson')],
])

const getIconByType = new Map([
  ['current', 'Lighter' as TIcon],
  ['completed', 'Lighter' as TIcon],
  ['lock', 'IconLockSmall' as TIcon],
  ['checkpoint', 'Question' as TIcon],
])

export const PopOver: React.FC<Partial<ItemLessonProps>> = (props) => {
  const {
    type,
    status,
    lessonTitle,
    onUnlockPress,
    chapterStatus,
    onTogglePopOver,
    lessonDescription,
    onStartLessonPress,
    onStartExaminationPress,
  } = props
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
              ? getIconByType.get(status || 'completed')
              : getIconByType.get('checkpoint')) as TIcon
          }
        />
        <Text fontFamily="bold" size={'h5'} style={styles.textTypeModal}>
          {type === 'normal' && chapterStatus === 'lock'
            ? getTypeOfModal.get(status || 'completed')
            : type === 'normal'
            ? getTypeOfModal.get(status || 'completed')
            : getTypeOfModal.get('checkpoint')}
        </Text>
      </Block>

      <Text fontFamily="bold" size={'h4'} style={styles.titleModal}>
        {(type === 'checkpoint' && chapterStatus === 'lock') ||
        status === 'lock'
          ? t('lock_title')
          : type === 'checkpoint'
          ? t('practice_title')
          : lessonTitle}
      </Text>

      <Text size={'h5'}>
        {(type === 'checkpoint' && chapterStatus === 'lock') ||
        status === 'lock'
          ? t('lock_description')
          : type === 'checkpoint'
          ? t('practice_description')
          : lessonDescription}
      </Text>

      <Block row space="between" marginTop={25} alignCenter>
        {status === 'completed' ? (
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
              onPress={() => {
                onStartLessonPress?.({
                  ...props,
                  isRestart: false,
                })
                onTogglePopOver?.()
              }}
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
              onPress={() => {
                onStartLessonPress?.({
                  ...props,
                  isRestart: true,
                })
                onTogglePopOver?.()
              }}
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
            onPress={() => {
              type === 'checkpoint' && chapterStatus === 'unlock'
                ? onStartExaminationPress?.(props)
                : status === 'lock' || chapterStatus === 'lock'
                ? onUnlockPress?.(props)
                : onStartLessonPress?.(props)

              onTogglePopOver?.()
            }}
            buttonBorderColor={colors.orangePrimary}
            shadowButtonColor={colors.orangePrimary}
          >
            <Text size={'h4'} fontFamily="bold">
              {(type === 'checkpoint' || status === 'current') &&
              chapterStatus === 'unlock'
                ? t('lets_start')
                : t('unlock')}
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
  chapterId,
  thumbnail,
  isEndItem,
  lessonTitle,
  checkpoint,
  type = 'normal',
  nextLessonId,
  chapterStatus,
  onUnlockPress,
  lessonDescription,
  onStartLessonPress,
  onStartExaminationPress,
}) => {
  const { colors } = useTheme()
  const ref = React.useMemo(() => React.createRef<Tooltip>(), [])

  const onTogglePopOver = () => {
    ref.current?.toggleTooltip()
  }

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
                chapterId={chapterId}
                checkpoint={checkpoint}
                lessonTitle={lessonTitle}
                nextLessonId={nextLessonId}
                chapterStatus={chapterStatus}
                onUnlockPress={onUnlockPress}
                onTogglePopOver={onTogglePopOver}
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
                status === 'completed' ? colors.orangePrimary : '#DAE1EA'
              }
            >
              {type === 'checkpoint' ? (
                <Image style={styles.lessonImage} source={images.Checkpoint} />
              ) : (
                <Image
                  style={styles.lessonImage}
                  source={{
                    uri: thumbnail,
                  }}
                />
              )}

              {((status !== 'current' && status !== 'completed') ||
                chapterStatus === 'lock') && (
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

              {status === 'completed' && !isEndItem && (
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
              marginTop={status === 'completed' ? 6 : 4}
              backgroundColor={
                status === 'completed' ? colors.orangePrimary : '#DAE1EA'
              }
            />
          )}
        </Block>

        <Block
          flex
          height={68}
          justifyCenter
          backgroundColor={
            type === 'checkpoint'
              ? '#FFF2CE'
              : status === 'current'
              ? '#F3F8F3'
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
