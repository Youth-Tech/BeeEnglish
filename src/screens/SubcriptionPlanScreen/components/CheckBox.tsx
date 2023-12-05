import { LayoutAnimation, Pressable, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { useTheme } from '@themes'
import CheckTrue from '@screens/SubcriptionPlanScreen/components/CheckTrue'

type ICheckBox = {
  isCheck: boolean
  // setIsCheck: React.Dispatch<React.SetStateAction<boolean>>
  style: StyleProp<ViewStyle>
}
const CheckBox = ({ style, isCheck }: ICheckBox) => {
  const { colors } = useTheme()
  return (
    <Pressable
      hitSlop={10}
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      }}
      style={[
        style,
        isCheck && { backgroundColor: colors.bluePrimary, borderWidth: 0 },
      ]}
    >
      {isCheck && <CheckTrue width={24} height={24} />}
    </Pressable>
  )
}

export default CheckBox
