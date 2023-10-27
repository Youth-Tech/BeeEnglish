import React from 'react'
import { useStyles } from './styles'
import { Block, Image, Text } from '@components'
import { TouchableOpacity } from 'react-native'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import {useTranslation} from "react-i18next";

const UserCard: React.FC = () => {
  const { colors } = useTheme()
  const styles = useStyles()
  const { t } = useTranslation()
  const url =
    'https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/344801128_1233279023987872_6973065749643585930_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=sknRvPwEFvAAX84riq0&_nc_ht=scontent.fsgn5-6.fna&cb_e2o_trans=t&oh=00_AfAQyGppVYNVQ77uqckdPGNxbeo0Om2HPARyfzkxHR5t0g&oe=653A7321'
  return (
    <Block style={styles.boxUserCard}>
      <Block style={styles.boxAvatar}>
        <Image source={{ uri: url }} style={styles.avatarUser} />
        <Block shadow style={styles.buttonBrush}>
          <TouchableOpacity>
            <Icon state={'PenBrush'} fill={colors.white} />
          </TouchableOpacity>
        </Block>
      </Block>
      <Text size={'h1'} fontFamily={'bold'} marginTop={20}>
        Nguyễn Tuấn Anh
      </Text>
      <Text size={'h3'} color={colors.greyDark}>{t("joined_on")} 20/12/2020</Text>
    </Block>
  )
}

export default UserCard
