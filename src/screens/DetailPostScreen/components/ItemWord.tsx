import React, { useState } from 'react'
import { Text, TouchableHighlight } from 'react-native'
import { useTheme } from '@themes'
import { useStyles } from '@screens/DetailPostScreen/styles'
import { useAppDispatch } from '@hooks'
import { changeBottomSheetState, setWord } from '@redux/reducers'

interface WordProps {
  onPress?: () => void
  value: string
}

export const ItemWord: React.FC<WordProps> = React.memo(({ value }) => {
  const { colors } = useTheme()
  const [isClick, setIsClick] = useState(false)
  const styles = useStyles()
  const dispatch = useAppDispatch()
  const onPressItemWord = () => {
    if (!isClick) {
      setIsClick(true)
    }
    dispatch(changeBottomSheetState({ isShowBottomSheet: false }))
    dispatch(setWord(value))
  }
  return (
    <TouchableHighlight
      onPress={onPressItemWord}
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
})
