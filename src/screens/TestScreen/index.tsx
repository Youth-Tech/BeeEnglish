import React, { useCallback } from 'react'
import { Block, CircleProgress, Container, Modal, Progress } from '@components'
import { widthScreen } from '@utils/helpers'
import { ModalFunction } from '@components/bases/Modal/type'
import { Button } from 'react-native'

export const TestScreen = () => {
  const modalRef = React.useRef<ModalFunction>(null)
  const onShow = useCallback(() => {
    console.log('modal opened')
  }, [])
  const onDismiss = useCallback(() => {
    console.log('modal closed')
  }, [])
  return (
    <Container>
      <Block flex>
        <Progress
          step={100}
          totalSteps={100}
          progressContainerStyles={[
            {
              width: 80,
            },
          ]}
        />
        <CircleProgress
          size={50}
          step={10}
          totalSteps={100}
          strokeWidth={5}
          progressValueProps={{
            size: 10,
            fontFamily: 'light',
          }}
        />
        <Button
          title="Open Modal"
          onPress={() => {
            modalRef.current?.openModal()
          }}
        />
        <Modal
          position="bottom"
          ref={modalRef}
          onShow={onShow}
          onDismiss={onDismiss}
        >
          <Block
            backgroundColor="white"
            width={widthScreen - 40}
            height={300}
            radius={20}
            alignCenter
            justifyCenter
          >
            <Button
              title="Close Modal"
              onPress={() => {
                modalRef.current?.dismissModal()
              }}
            />
          </Block>
        </Modal>
      </Block>
    </Container>
  )
}
