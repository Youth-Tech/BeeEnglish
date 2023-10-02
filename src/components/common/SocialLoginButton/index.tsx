import { Pressable } from 'react-native'
import React from 'react'
import { useTheme } from '@themes'
import { Facebook, Google } from '@assets'
import { Text } from '@components'
interface SocialLoginButtonProps {
  name: string
  icon: 'google' | 'facebook'
  onPress?: () => void
}
export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  name,
  icon,
  onPress,
}) => {
  const { colors, normalize } = useTheme()
  return (
    <Pressable
      style={{
        width: normalize.h(139.26),
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
        backgroundColor: colors.white,
        borderRadius: normalize.m(27.41),
        paddingVertical: normalize.v(10),
        justifyContent: 'center',
        marginTop: normalize.v(18),
      }}
      onPress={onPress}
    >
      {icon === 'google' ? <Google /> : <Facebook />}
      <Text size={'h4'} fontFamily="bold" color={colors.black} paddingLeft={10}>
        {name}
      </Text>
    </Pressable>
  )
}
