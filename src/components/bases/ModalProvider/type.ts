import React from 'react';

export interface ModalProviderProps {
    /**
     * use this component as an container and it will produce a chilren
    children can be a string or React Node
     */
    children: React.ReactNode
    /**
     * Position of the modal
     */
    position?: 'top' | 'center' | 'bottom'
    /**
 * Height of the modal
 */
    modalHeight?: number
    /**
     * Animation type of the modal
     */

    animationType?: 'fade' | 'slide'
    /**
     * Can modify the modal as React Node
    Example: <Block><Text>Hey</Text></Block>
     */
    modalComponent?: React.ReactNode
    /**
   * Can modify the backdrop as  React Node
  Example: <Block><Text>Hey</Text></Block>
   */
    backDropComponent?: React.ReactNode
    /**
     * Callback function when modal is opened
     */
    onShow?: () => void,
    /**
     * Callback function when modal is closed
     */
    onDismiss?: () => void,
}
