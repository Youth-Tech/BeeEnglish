import React from 'react'
import { Block, CircleProgress, Container, Progress } from '@components'
import LessonProgressItem from '@screens/HomeScreen/components/LessonProgress'

export const TestScreen = () => {
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
        <Block marginTop={20} alignCenter>
          <LessonProgressItem />
          <LessonProgressItem />
          <LessonProgressItem />
          <LessonProgressItem />
          <LessonProgressItem />
     
        </Block>
      </Block>
    </Container>
  )
}
