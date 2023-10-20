import React from 'react'
import { useTranslation } from 'react-i18next'
import { goBack, navigate } from '@navigation'
import { Icon, images } from '@assets'
import { useTheme } from '@themes'
import {
  Block,
  Container,
  Text,
  TextInput,
  Image,
  DismissKeyBoardBlock,
} from '@components'
import {
  DictionaryItem,
  DictonaryItemProps,
  VocabularyItem,
} from './components'
import { FlatList, ListRenderItemInfo, ScrollView, View } from 'react-native'
import { dataProps } from './const'

export const DictionaryScreen = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const data:dataProps = [
    {
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'Hetcuu',
    },
    {
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'Hetcuu',
    },
    {
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'Hetcuu',
    },
    {
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'Hetcuu',
    },
    {
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'Hetcuu',
    },
    {
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'Hetcuu',
    },
    {
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'Hetcuu',
    },
  ]
  const renderDictionaryItem = ({
    index,
    item,
  }: ListRenderItemInfo<DictonaryItemProps>) => {
    return (
      <View key={`item-${index}`}>
        <DictionaryItem
          data={item}
        />
      </View>
    )
  }

  return (
    <Container hasScroll>
      <DismissKeyBoardBlock>
        <Block flex>
          <Block row paddingHorizontal={20} alignCenter>
            <Icon state="Back" onPress={goBack}></Icon>
            <Text center flex  fontFamily="bold" size={'h2'}>
              {t('dictionary')}
            </Text>
            <Block width={25} ></Block>
          </Block>
          <Block marginTop={22} paddingHorizontal={25} row alignCenter>
            <Image source={images.BeeDiscovery} width={33.18} height={37.01} />
            <Block marginLeft={15} flex height={35} shadow radius={30}>
              <TextInput
                containerStyle={{ height: '100%', width: '100%' }}
                placeholderTextColor={colors.greyPrimary}
                inputContainerStyle={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 30,
                }}
                placeholder={t('english_vocabulary')}
                rightIcon={
                  <Icon
                    state="Microphone"
                    stroke={colors.greyPrimary}
                    onPress={() => {}}
                  ></Icon>
                }
              />
            </Block>
          </Block>
          <Block row alignCenter marginTop={24} paddingLeft={20}>
            <Icon state="History"></Icon>
            <Text
              fontFamily="semiBold"
              marginLeft={5}
              size={'h3'}
              lineHeight={20}
            >
              {t('history')}
            </Text>
          </Block>
          <Block marginTop={15} paddingHorizontal={20}>
            <Block shadow radius={15} overflow="hidden">
              <FlatList
                scrollEnabled={false}
                data={data}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={renderDictionaryItem}
                showsHorizontalScrollIndicator={false}
              />
            </Block>
          </Block>
          <Block row alignCenter marginTop={17} paddingLeft={20}>
            <Icon state="Dictionary"></Icon>
            <Text fontFamily="bold" marginLeft={5} size={'h3'} lineHeight={20}>
              {t('library_vocabulary')}
            </Text>
          </Block>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Block paddingLeft={20} marginVertical={15} row>
              <VocabularyItem
                name={t('vocabulary_learned')}
                image={images.BeeReading}
              />
              <VocabularyItem
                name={t('saved_vocabulary')}
                image={images.BeePencil}
              />
            </Block>
          </ScrollView>
        </Block>
      </DismissKeyBoardBlock>
    </Container>
  )
}
