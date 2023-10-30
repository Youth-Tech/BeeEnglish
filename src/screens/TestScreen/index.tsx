import React from 'react'
import { Block, Container, LineChart } from '@components'
import { WordList } from '@components'
import { widthScreen } from '@utils/helpers'
const data = [
  { id: 0, label: 'Mon', x: 0, y: 3 },
  { id: 1, label: 'Tue', x: 1, y: 1 },
  { id: 2, label: 'Wed', x: 2, y: 2 },
  { id: 3, label: 'Thu', x: 3, y: 4 },
  { id: 4, label: 'Fri', x: 4, y: 3 },
  { id: 5, label: 'Sat', x: 5, y: 2 },
  { id: 6, label: 'Sun', x: 6, y: 2 },
]
export const TestScreen = () => {
  const handleItemClick = () => {}
  return (
    <Container>
      <Block flex padding={10}>
        <WordList sentence="Hello các cậu mình là Vũ nè hoom nay" />

        <LineChart
          width={widthScreen}
          height={300}
          data={data}
          haveDots
          haveXAxis
          haveHorizontalGuides
          lineColor="#FFEFAD"
          onItemClick={handleItemClick}
        />
      </Block>
    </Container>
  )
}
