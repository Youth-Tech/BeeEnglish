import {
  Text,
  Image,
  Modal,
  Block,
  Progress,
  Container,
  CircleProgress,
} from '@components'
import { images } from '@assets'
import { Button } from 'react-native'
import React, { useCallback } from 'react'
import { ModalFunction } from '@components/bases/Modal/type'

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
      <Block flex padding={10}>
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
            height={279}
            backgroundColor="white"
            alignCenter
            radius={20}
            paddingTop={40}
            marginHorizontal={20}
          >
            <Image
              source={images.BeeHello}
              width={89}
              height={98}
              resizeMode="contain"
            />
            <Text>Ban co muon thoat</Text>
            <Text>Ban co muon thoat</Text>
            <Block row width={'100%'} justifyCenter>
              <Button title="Co" />
              <Button title="Khong" />
            </Block>
          </Block>
        </Modal>
      </Block>
    </Container>
  )
}
