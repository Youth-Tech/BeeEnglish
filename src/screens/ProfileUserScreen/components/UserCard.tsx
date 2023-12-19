import React from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'

import { Icon } from '@assets'
import { useTheme } from '@themes'
import { useStyles } from './styles'
import { useAppDispatch, useAppSelector } from '@hooks'
import { getUserData } from '@redux/selectors'
import { Block, Image, Text } from '@components'
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker'
import { updateUserAvatar } from '@redux/actions'

const UserCard: React.FC = () => {
  const styles = useStyles()
  const { colors } = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const userData = useAppSelector(getUserData)
  const role = useAppSelector((state) => state.root.user.role)
  const onUpdateImagePress = async () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    }

    try {
      const res = await launchImageLibrary(options)
      dispatch(updateUserAvatar(res))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Block style={styles.boxUserCard}>
      <Block style={styles.boxAvatar}>
        <Image
          style={styles.avatarUser}
          source={{
            uri:
              userData._id === ''
                ? ''
                : userData?.avatar?.src ?? (userData.avatar as string),
          }}
        />
        <Block shadow style={styles.buttonBrush}>
          <TouchableOpacity onPress={onUpdateImagePress}>
            <Icon state={'PenBrush'} fill={colors.white} />
          </TouchableOpacity>
        </Block>
      </Block>
      <Block
        row
        justifyCenter
        alignCenter
        marginTop={20}
        gap={5}
        width={'100%'}
      >
        <Text size={'h1'} fontFamily={'bold'}>
          {userData.fullName}
        </Text>
        {role === 'premium' && (
          <Icon state={'Crown'} fill={colors.orangePrimary} />
        )}
      </Block>
      <Text size={'h3'} color={colors.greyDark}>
        {t('joined_on')} {new Date(userData.createdAt).toLocaleDateString()}
      </Text>
    </Block>
  )
}

export default UserCard
