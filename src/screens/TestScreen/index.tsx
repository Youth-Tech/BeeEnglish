import React from 'react'
import { Block, CircleProgress, Container, Progress } from '@components'

export const TestScreen = () => {
  return (
    <Container>
      <Block flex>
        <Progress
          step={80}
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
      </Block>
    </Container>
  )
}
