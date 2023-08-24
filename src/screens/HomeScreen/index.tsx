import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
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
} from '@components'

export const HomeScreen: React.FC = () => {
  const [value, setValue] = React.useState('')

  return (
    <Container>
      <Block flex>
        <Text size={20} lineHeight={25} color={'primary'} fontFamily="bold">
          This's a custom Text component
        </Text>
        <TextInput label="Xin Chào" value={value} onChangeText={setValue} />
        <Pressable
          onPress={() => {
            navigate('HOME_SCREEN_1')
          }}
        >
          <Text>Go To Home</Text>
        </Pressable>
        <Progress
          strokeHeight={10}
          step={80}
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
        <ShadowButton
          buttonHeight={45}
          buttonBorderSize={2}
          buttonBorderColor={
            <Block style={StyleSheet.absoluteFill}>
              <LinearGradient
                colors={['#FFEFAD', '#FFC107']}
                containerStyle={{ width: '100%', height: '100%' }}
              />
            </Block>
          }
          shadowHeight={10}
          buttonRadius={8}
          shadowButtonColor="#FFC107"
          buttonColor="#FFEFAD"
          labelSize={'h2'}
          fontFamily="bold"
          labelColor="primaryText"
          onPress={() => {
            console.log('press')
          }}
        />
        <ShadowBlock
          row
          space="between"
          paddingHorizontal={20}
          marginTop={20}
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
        <LinearGradient
          colors={['#FFEFAD', '#FFC107']}
          containerStyle={{ flex: 1 }}
          transform={{ rotation: 20 }}
        />
      </Block>
    </Container>
  )
}
