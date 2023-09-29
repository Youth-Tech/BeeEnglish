import React from 'react'
import { Block, Container, VerifyCodeInput } from '@components'

export const VerificationCodeScreen = () => {
  const [value, setValue] = React.useState<string>('')

  return (
    <Container>
      <Block flex>
        <VerifyCodeInput
          onEnd={(value: string) => {
            console.log('submit with value', value)
          }}
          canSubmitOnEnd={true}
          cellCount={4}
          value={value}
          setValue={setValue}
        />
      </Block>
    </Container>
  )
}
