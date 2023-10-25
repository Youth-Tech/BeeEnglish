import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Translate } from '@assets/icons/Translate'
import { useStyles } from '@screens/DetailPostScreen/styles'
import { Block } from '@components'
import { useTheme } from '@themes'

interface TranslateViProps {
  value: string
}

const TranslateVi: React.FC<TranslateViProps> = ({ value }) => {
  const [isShow, setIsShow] = useState(false)
  const styles = useStyles()
  const { colors } = useTheme()
  return (
    <Block alignCenter paddingTop={10}>
      <TouchableOpacity
        style={{ alignSelf: 'flex-start' }}
        onPress={() => setIsShow(!isShow)}
      >
        <Translate color={isShow ? colors.orangeDark : '#E5E5E5'} />
      </TouchableOpacity>
      {isShow && (
        <Text style={[styles.wordValue, styles.translateText]}>{value}</Text>
      )}
    </Block>
  )
}

export default TranslateVi
