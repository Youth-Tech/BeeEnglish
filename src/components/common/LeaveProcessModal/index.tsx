import React from 'react'
import { images } from '@assets'
import { useTranslation } from 'react-i18next'
import { makeStyles, useTheme } from '@themes'
import { TouchableOpacity } from 'react-native'
import { Block, Image, Modal, Text } from '@components'
import { ModalFunction } from '@components/bases/Modal/type'

export interface LeaveProcessModalProps {
  onPressApprove: () => void
  onPressCancel: () => void
}
export const LeaveProcessModal = React.forwardRef<
  ModalFunction,
  LeaveProcessModalProps
>((props, ref) => {
  const { colors } = useTheme()
  const { onPressApprove, onPressCancel } = props
  const styles = useStyles()
  const { t } = useTranslation()
  return (
    <Modal ref={ref} position={'bottom'}>
      <Block
        radius={15}
        height={279}
        paddingTop={41}
        marginBottom={30}
        marginHorizontal={20}
        backgroundColor={colors.white}
      >
        <Block alignCenter>
          <Image
            style={styles.image}
            source={images.BeeSad}
            resizeMode={'contain'}
          />
          <Text size={'h1'} fontFamily={'semiBold'} color={colors.black}>
            {t('do_you_want_to_leave')}
          </Text>
          <Text size={'h5'} fontFamily={'bold'} marginTop={12.77}>
            {t('continue_lesson')}
          </Text>
        </Block>

        <Block row space={'between'} paddingHorizontal={20} marginTop={15}>
          <TouchableOpacity style={styles.button} onPress={onPressApprove}>
            <Text size={'h2'} fontFamily={'semiBold'} color={colors.greyDark}>
              {t('yes')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.orangeLight }]}
            onPress={onPressCancel}
          >
            <Text size={'h2'} fontFamily={'semiBold'} color={colors.black}>
              {t('no')}
            </Text>
          </TouchableOpacity>
        </Block>
      </Block>
    </Modal>
  )
})

const useStyles = makeStyles()(({ colors, normalize }) => ({
  image: {
    width: normalize.h(89),
    height: normalize.h(98),
  },
  button: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.greyLight,
    width: normalize.h(128.7),
    height: normalize.h(41.8),
    borderRadius: normalize.m(10),
  },
}))
