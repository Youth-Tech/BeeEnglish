import React from 'react'
import { Block, Container } from '@components'
import { WordList } from '@components'

export const TestScreen = () => {
  return (
    <Container>
      <Block flex padding={10}>
        <WordList sentence="Hello các cậu mình là Vũ nè hoom nay" />
      </Block>
    </Container>
  )
}
