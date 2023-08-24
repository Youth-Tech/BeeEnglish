import { FontKeys } from '@themes'
import {
  GestureResponderEvent,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native'
export interface InputProps extends TextInputProps {
  /**
   * Styling for view containing label, input and error message
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * if **true**, text is not editable
   */
  disabled?: boolean

  /**
   * Style of input when disabled
   */
  disabledInputStyle?: StyleProp<ViewStyle>

  /**
   * Styling for view containing input
   */
  inputContainerStyle?: StyleProp<ViewStyle>

  /**
   * Style of input
   */
  inputStyle?: StyleProp<TextStyle>

  /**
   * Specifies font weight.
   *
   * Default is **"regular"**
   */
  fontFamily?: 'bold' | 'semiBold' | 'regular' | 'light'

  /**
   * Size of text
   *
   * Default is **14**
   */
  size?: FontKeys | number

  /**
   * Label of input
   */
  label?: React.ReactNode

  /**
   * Style of label if label is string
   */
  labelStyle?: StyleProp<TextStyle>

  /**
   * Add **"*"** after label if label is string
   */
  required?: boolean

  /**
   * Error message
   */
  error?: React.ReactNode

  /**
   * Style of error message if error is string
   */
  errorStyle?: StyleProp<TextStyle>

  /**
   * Show error message
   */
  showError?: boolean

  /**
   * Left icon
   */
  leftIcon?: React.ReactNode

  /**
   * Styling for view containing the left icon
   */
  leftIconContainerStyle?: StyleProp<ViewStyle>

  /**
   * Action when press left icon
   */
  onLeftIconPress?: (e: GestureResponderEvent) => void

  /**
   * Right icon
   */
  rightIcon?: React.ReactNode

  /**
   * Styling for view containing the right icon
   */
  rightIconContainerStyle?: StyleProp<ViewStyle>

  /**
   * Action when press right icon
   */
  onRightIconPress?: (e: GestureResponderEvent) => void

  /**
   * Change input border color when focus
   */
  hideFocus?: boolean

  ref?: any

  maxLength?: number
}
