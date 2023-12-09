import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
export interface ModalProps {
  /**
   * Component that you wrap inside the Modal
   */
  children: React.ReactNode
  /**
   * position of the modal
   */
  position: 'top' | 'center' | 'bottom'
  /**
   *
   * @returns void - Callback function when the modal is shown
   */
  onShow?: () => void
  /**
   *
   * @returns void - Callback function when the modal is closed
   */
  onDismiss?: () => void
  /**
   * type of the modal animation
   */
  animationType?: 'slide' | 'fade'
  /*
   * style of the backdrop modal
   * */
  backdropStyle?: StyleProp<ViewStyle>
}

export interface ModalFunction {
  openModal: () => void
  dismissModal: () => void
}
