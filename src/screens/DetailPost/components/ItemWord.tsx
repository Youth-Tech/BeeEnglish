import React, { useState } from 'react'
import { Text, TouchableHighlight } from 'react-native'
import { useTheme } from '@themes'
import { useStyles } from '@screens/DetailPost/styles'

interface WordProps {
  onPress?: () => void
  value: string
}

const ItemWord: React.FC<WordProps> = ({ value }) => {
  const { colors } = useTheme()
  const [isClick, setIsClick] = useState(false)
  const styles = useStyles(colors)
  return (
    <TouchableHighlight
      onPress={() => {
        if (!isClick) {
          setIsClick(true)
        }
      }}
      style={[
        styles.wordItem,
        {
          backgroundColor: isClick ? colors.orangeDark + '50' : colors.white,
        },
      ]}
      underlayColor={colors.orangeDark + '20'}
    >
      <Text style={styles.wordValue}>{value}</Text>
    </TouchableHighlight>
  )
}

export default React.memo(ItemWord)
