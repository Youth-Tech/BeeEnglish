import React from 'react'
import { useTranslation } from 'react-i18next'

import {
  Text,
  Block,
  Image,
  TextInput,
  Container,
  DismissKeyBoardBlock,
} from '@components'
import { useTheme } from '@themes'
import { dataProps } from './const'
import { Icon, images } from '@assets'
import { goBack, navigate } from '@navigation'
import { DictionaryItem, VocabularyItem } from './components'
import { FlatList, ListRenderItemInfo, ScrollView, View } from 'react-native'
import { KnowledgeService } from '@services'

export const DictionaryScreen = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const [search, setSearch] = React.useState('')
  const data: dataProps[] = [
    {
      id: 1,
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'Hetcuu',
    },
    {
      id: 2,
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'Hetcuu',
    },
    {
      id: 3,
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'Hetcuu',
    },
    {
      id: 4,
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'Hetcuu',
    },
    {
      id: 5,
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'Hetcuu',
    },
    {
      id: 6,
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'Hetcuu',
    },
    {
      id: 7,
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'Hetcuu',
    },
  ]
  const renderDictionaryItem = ({
    index,
    item,
  }: ListRenderItemInfo<dataProps>) => {
    return (
      <View key={`item-${index}`}>
        <DictionaryItem data={item} />
      </View>
    )
  }
  const searchWordAPI = async (searchText: string) => {
    try {
      const response = await KnowledgeService.getAllWord({ search: searchText })
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    const timeOutSearch = setTimeout(() => {
      searchWordAPI(search)
    }, 2000)
    return () => clearTimeout(timeOutSearch)
  }, [search])
  return (
    <Container hasScroll>
      <DismissKeyBoardBlock>
        <Block flex>
          <Block row paddingHorizontal={20} alignCenter marginTop={10}>
            <Icon state="Back" onPress={goBack}></Icon>
            <Text center flex fontFamily="bold" size={'h2'}>
              {t('dictionary')}
            </Text>
            <Block width={25}></Block>
          </Block>
          <Block marginTop={22} paddingHorizontal={25} row alignCenter>
            <Image source={images.BeeDiscovery} width={33.18} height={37.01} />
            <Block marginLeft={15} flex height={35} shadow radius={30}>
              <TextInput
                containerStyle={{ height: '100%', width: '100%' }}
                placeholderTextColor={colors.greyPrimary}
                value={search}
                onChangeText={setSearch}
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
                keyExtractor={(item) => item.id.toString()}
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
                onPress={() => {
                  navigate('LEARNED_WORD_SCREEN')
                }}
              />
              <VocabularyItem
                name={t('saved_vocabulary')}
                image={images.BeePencil}
                onPress={() => {
                  navigate('SAVED_WORD_SCREEN')
                }}
              />
            </Block>
          </ScrollView>
        </Block>
      </DismissKeyBoardBlock>
    </Container>
  )
}
