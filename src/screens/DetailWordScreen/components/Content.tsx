import { Block, Text } from '@components'
import React from 'react'

const Content = () => {
  return (
    <Block paddingLeft={20} paddingRight={40} flex>
      <Block marginTop={20}>
        <Text marginTop={10} color="red" fontFamily="bold" size={'h4'}>
          Danh từ (noun)
        </Text>
        <Text marginTop={10} fontFamily="bold" size={'h4'}>
          Con gà, gà
        </Text>
        <Block marginTop={10} row>
          <Text color="blue" fontFamily="bold" size={'h4'}>
            Ví dụ:
          </Text>
          <Text fontFamily="bold" size={'h4'}>
            There are three chickens in the garden and they are eating.
          </Text>
        </Block>
        <Block marginTop={10} row>
          <Text color="blue" fontFamily="bold" size={'h4'}>
            Nghĩa:
          </Text>
          <Text fontFamily="bold" size={'h4'}>
            Trong vườn có ba con gà và chúng đang ăn.
          </Text>
        </Block>
      </Block>
      <Text marginTop={20} color="red" fontFamily="bold" size={'h4'}>
        Tính từ (adjective)
      </Text>
      <Text marginTop={10} fontFamily="bold" size={'h4'}>
        yếu bóng vía, nhát gan
      </Text>
      <Block marginTop={10} row>
        <Text color="blue" fontFamily="bold" size={'h4'}>
          Ví dụ:
        </Text>
        <Text fontFamily="bold" size={'h4'}>
          When it comes to heights, I'm chicken. I'm scared.
        </Text>
      </Block>
      <Block marginTop={10} row>
        <Text color="blue" fontFamily="bold" size={'h4'}>
          Nghĩa:
        </Text>
        <Text fontFamily="bold" size={'h4'}>
          Khi nhắc về độ cao, tôi rất nhát gan, tôi rất sợ.
        </Text>
      </Block>
    </Block>
  )
}

export default Content
