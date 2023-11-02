import React from 'react'
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
}

export interface ModalFunction {
  openModal: () => void
  dismissModal: () => void
}
