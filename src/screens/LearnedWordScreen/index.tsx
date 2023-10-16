import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Block,
  Container,
  DismissKeyBoardBlock,
  Image,
  StatusBar,
  Text,
  TextInput,
} from '@components'
import { useTheme } from '@themes'
import { Icon } from '@assets'
import { LearnedWordItem, LearnedWordItemProps } from './components'
import { goBack } from '@navigation'
import { FlatList, ListRenderItemInfo, View } from 'react-native'

export const LearnedWordScreen = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const data = [
    {
      id: 1,
      word: 'Chicken',
      wordType: 'noun',
      translation: 'Con gà',
    },
    {
      id: 2,
      word: 'Chicken',
      wordType: 'noun',
      translation: 'Con gà',
    },
    {
      id: 3,
      word: 'Chicken',
      wordType: 'noun',
      translation: 'Con gà',
    },
    {
      id: 4,
      word: 'Chicken',
      wordType: 'noun',
      translation: 'Con gà',
    },
    {
      id: 5,
      word: 'Chicken',
      wordType: 'noun',
      translation: 'Con gà',
    },
  ]
  const renderLearnedWordItem = ({
    index,
    item,
  }: ListRenderItemInfo<LearnedWordItemProps>) => {
    return (
      <View style={{ marginTop: 25, marginRight: 10 }} key={`item-${index}`}>
        <LearnedWordItem
          word={item.word}
          wordType={item.wordType}
          translation={item.translation}
          index={index}
        />
      </View>
    )
  }

  return (
    <Container hasScroll>
      <StatusBar statusColor={colors.orangePrimary}></StatusBar>
      <DismissKeyBoardBlock>
        <Block flex>
          
          <Block
            height={228}
            backgroundColor={colors.orangePrimary}
            borderBottomLeftRadius={50}
            borderBottomRightRadius={50}
            zIndex={-1}
            absolute
          ></Block>
          {/* Textinput and FlatList */}
          <Block paddingHorizontal={25} backgroundColor='transparent' >
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
            <Block marginTop={22} height={35} radius={30}>
              <TextInput
                containerStyle={{ width: '100%' }}
                placeholderTextColor={colors.greyPrimary}
                inputContainerStyle={{
                  width: '100%',
                  borderRadius: 30,
                }}
                placeholder={'English Vocabulary'}
                rightIcon={
                  <Icon
                    state="Microphone"
                    stroke={colors.greyPrimary}
                    onPress={() => {}}
                  ></Icon>
                }
              />
            </Block>
            <Block >
              <FlatList
                scrollEnabled={false}
                data={data}
                keyExtractor={(_, index) => `item-${index}`}
                renderItem={renderLearnedWordItem}
                showsVerticalScrollIndicator={false}
                numColumns={2}
              />
            </Block>
          </Block>
        </Block>
      </DismissKeyBoardBlock>
    </Container>
  )
}
