import { Block, Text } from '@components'
import React from 'react'

const Content = () => {
  return (
    <Block paddingHorizontal={20} flex>
      <Block marginTop={20}>
        <Text marginTop={10} color="red" fontFamily="bold" size={'h4'} lineHeight={18}>
          Danh từ (noun)
        </Text>
        <Text marginTop={10} fontFamily="bold" size={'h4'} lineHeight={18}>
          Con gà, gà
        </Text>
        <Block marginTop={10} row>
          <Text color="blue" fontFamily="bold" size={'h4'} lineHeight={18}>
            Ví dụ:
          </Text>
          <Text fontFamily="bold" size={'h4'} flex lineHeight={18}>
            There are three chickens in the garden and they are eating.
          </Text>
        </Block>

        <Block marginTop={10} row>
          <Text color="blue" fontFamily="bold" size={'h4'} lineHeight={18}>
            Nghĩa:
          </Text>
          <Text fontFamily="bold" size={'h4'} flex lineHeight={18}>
            Trong vườn có ba con gà và chúng đang ăn.
          </Text>
        </Block>
      </Block>
      <Text marginTop={20} color="red" fontFamily="bold" size={'h4'} lineHeight={18}>
        Tính từ (adjective)
      </Text>
      <Text marginTop={10} fontFamily="bold" size={'h4'} lineHeight={18}>
        yếu bóng vía, nhát gan
      </Text>
      <Block marginTop={10} row>
        <Text color="blue" fontFamily="bold" size={'h4'} lineHeight={18}>
          Ví dụ:
        </Text>
        <Text fontFamily="bold" size={'h4'} flex lineHeight={18}>
          When it comes to heights, I'm chicken. I'm scared.
        </Text>
      </Block>
      <Block marginTop={10} row>
        <Text color="blue" fontFamily="bold" size={'h4'} lineHeight={18}>
          Nghĩa:
        </Text>
        <Text fontFamily="bold" size={'h4'} flex lineHeight={18}>
          Khi nhắc về độ cao, tôi rất nhát gan, tôi rất sợ.
        </Text>
      </Block>
    </Block>
  )
}

export default Content
