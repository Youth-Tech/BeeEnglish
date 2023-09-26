import React, { useCallback, useRef } from 'react'
import { Pressable, StyleSheet, ScrollView } from 'react-native'
import { navigate } from '@navigation'
import {
  Block,
  Container,
  Text,
  TextInput,
  Progress,
  CircleProgress,
  ShadowButton,
  LinearGradient,
  ShadowBlock,
  ModalProvider,
} from '@components'
import { ModalProviderFunction } from '@components/bases/ModalProvider/type'
export const HomeScreen: React.FC = () => {
  const [value, setValue] = React.useState('')

  const ref = useRef(null)
  const modalRef = useRef<ModalProviderFunction>(null)
  const handleOpen = useCallback(() => {
    modalRef.current?.openModal()
  }, [])
  const handleDismiss = useCallback(() => {
    modalRef.current?.dismissModal()
  }, [])
  const onShow = useCallback(() => {
    console.log('Modal opened')
  }, [])
  const onDissmiss = useCallback(() => {
    console.log('Modal closed')
  }, [])

  return (
    <ModalProvider
      ref={modalRef}
      position="bottom"
      animationType="fade"
      onShow={onShow}
      onDismiss={onDissmiss}
      modalComponent={
        <Block flex alignCenter justifyCenter radius={15}>
          <Pressable
            style={{ backgroundColor: 'red', padding: 50 }}
            onPress={handleDismiss}
          >
            <Text>Press me</Text>
          </Pressable>
        </Block>
      }
    >
      <Container backgroundColor="white">
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <Block flex>
            <Text size={20} lineHeight={25} color={'primary'} fontFamily="bold">
              This's a custom Text component
            </Text>
            <TextInput
              ref={ref}
              label="Xin Chào"
              value={value}
              onChangeText={setValue}
            />
            <Pressable
              onPress={() => {
                navigate('HOME_SCREEN_1')
              }}
            >
              <Text>Go To Home</Text>
            </Pressable>
            <Progress
              step={80}
              strokeHeight={10}
              totalSteps={100}
              progressContainerStyles={{
                paddingHorizontal: 10,
              }}
            />
            <CircleProgress
              size={150}
              step={50}
              totalSteps={100}
              strokeWidth={10}
            />
            <Block width={'50%'}>
              <ShadowButton
                labelSize={'h2'}
                buttonRadius={8}
                fontFamily="bold"
                buttonHeight={45}
                shadowHeight={10}
                buttonBorderSize={2}
                buttonColor="#FFEFAD"
                labelColor="primaryText"
                shadowButtonColor="#FFC107"
                onPress={() => {
                  handleOpen()
                }}
                buttonBorderColor={
                  <Block style={StyleSheet.absoluteFill}>
                    <LinearGradient
                      colors={['#FFEFAD', '#FFC107']}
                      containerStyle={{ width: '100%', height: '100%' }}
                    />
                  </Block>
                }
              />
            </Block>
            <ShadowBlock
              row
              marginTop={20}
              space="between"
              paddingHorizontal={20}
              containerPaddingHorizontal={20}
            >
              <Block width={10} height={10} backgroundColor="red" />
              <Progress
                step={10}
                totalSteps={100}
                strokeHeight={10}
                progressContainerStyles={{
                  flex: 1,
                  marginStart: 10,
                }}
              />
            </ShadowBlock>
            <Block row>
              <ShadowBlock
                row
                flex
                radius={20}
                height={120}
                justifyCenter
                marginTop={20}
                marginLeft={10}
                marginRight={5}
                borderWidth={10}
                shadowPosition="top"
                shadowLabel="Total XP"
                paddingHorizontal={20}
                shadowBackgroundColor="#C584F8"
                shadowLabelContainerStyle={{
                  justifyEnd: true,
                  alignCenter: true,
                }}
                shadowLabelTextStyle={{
                  color: 'white',
                  fontFamily: 'bold',
                  paddingVertical: 10,
                  size: 'h1',
                }}
              >
                <Text fontFamily="bold" size="h2" color="#C584F8">
                  200
                </Text>
              </ShadowBlock>
              <ShadowBlock
                row
                flex
                radius={20}
                height={120}
                justifyCenter
                marginTop={20}
                marginLeft={5}
                marginRight={10}
                borderWidth={10}
                shadowPosition="top"
                shadowLabel="Total XP"
                paddingHorizontal={20}
                shadowBackgroundColor="#C584F8"
                shadowLabelContainerStyle={{
                  justifyEnd: true,
                  alignCenter: true,
                }}
                shadowLabelTextStyle={{
                  color: 'white',
                  fontFamily: 'bold',
                  paddingVertical: 10,
                  size: 'h1',
                }}
              >
                <Text fontFamily="bold" size="h2" color="#C584F8">
                  200
                </Text>
              </ShadowBlock>
            </Block>
            {/* <LinearGradient
            colors={['#FFEFAD', '#FFC107']}
            containerStyle={{ flex: 1 }}
            transform={{ rotation: 20 }}
          /> */}
          </Block>
        </ScrollView>
      </Container>
    </ModalProvider>
  )
}
