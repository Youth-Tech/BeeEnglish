import React from 'react'
import { useTranslation } from 'react-i18next'
import { Block, Container, Image, StatusBar, Text } from '@components'
import { useTheme } from '@themes'
import { Icon } from '@assets'
import { LearnedWordItem } from './components'
import { goBack } from '@navigation'

export const LearnedWordScreen = () => {
  const { colors } = useTheme()

  return (
    <Container hasScroll>
      <StatusBar statusColor={colors.orangePrimary}></StatusBar>
      <Block flex>
        <Block
          height={228}
          flex
          backgroundColor={colors.orangePrimary}
          borderBottomLeftRadius={50}
          borderBottomRightRadius={50}
          paddingHorizontal={25}
        >
          <Block row alignCenter>
            <Icon state="Back" onPress={goBack} stroke={colors.white}></Icon>
            <Text
              center
              marginRight={25}
              flex
              size={'h2'}
              fontFamily="bold"
              color={colors.white}
            >
              Từ vựng đã học
            </Text>
          </Block>
          <Block marginTop={22}></Block>
        </Block>
        <LearnedWordItem></LearnedWordItem>
      </Block>
    </Container>
  )
}
