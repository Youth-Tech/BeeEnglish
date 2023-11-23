import React from 'react'
import { useTranslation } from 'react-i18next'

import { images } from '@assets'
import { makeStyles, useTheme } from '@themes'
import { Block, Image, Modal, ShadowButton, Text } from '@components'
import { ModalFunction, ModalProps } from '@components/bases/Modal/type'

export const GuestModal = React.forwardRef<
  ModalFunction,
  Omit<ModalProps & { onButtonPress: () => void }, 'children'>
>((props, ref) => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const styles = useStyles()

  return (
    <Modal {...props} ref={ref}>
      <Block
        paddingHorizontal={10}
        paddingVertical={15}
        radius={5}
        margin={20}
        backgroundColor={colors.white}
      >
        <Image
          style={styles.image}
          source={images.BeeSad}
          resizeMode={'contain'}
        />

        <Text
          size={'heading'}
          fontFamily={'bold'}
          marginVertical={15}
          alignSelf={'center'}
        >
          {t('guest_modal_title')}
        </Text>
        <Text
          center
          size={'h3'}
          alignSelf={'center'}
          paddingHorizontal={5}
          fontFamily={'semiBold'}
        >
          {t('guest_modal_desc')}
        </Text>
        <ShadowButton
          buttonHeight={35}
          buttonRadius={10}
          shadowHeight={5}
          onPress={props.onButtonPress}
          buttonColor={colors.orangePrimary}
          containerStyle={styles.buttonStyle}
          shadowButtonColor={colors.orangeLighter}
        >
          <Text size="h3" fontFamily="bold" color="white">
            {t('guest_modal_button')}
          </Text>
        </ShadowButton>
      </Block>
    </Modal>
  )
})

const useStyles = makeStyles()(({ normalize }) => ({
  image: {
    width: normalize.h(89),
    height: normalize.h(98),
    alignSelf: 'center',
  },
  buttonStyle: {
    marginTop: normalize.v(20),
  },
}))
