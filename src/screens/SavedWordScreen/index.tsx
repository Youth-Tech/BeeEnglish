import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ListRenderItemInfo as RNListRenderItemInfo,
  ScrollView,
} from 'react-native'

import {
  Block,
  DismissKeyBoardBlock,
  Image,
  Text,
  TextInput,
  VoiceDectectorModal,
} from '@components'
import { Icon, images } from '@assets'
import { useTheme } from '@themes'
import { goBack, navigate } from '@navigation'
import { LearnWordItem } from './components/LearnWordItem'
import { SavedWordItem } from './components/SavedWordItem'
import { KnowledgeService, UserService, Word } from '@services'
import { ModalFunction } from '@components/bases/Modal/type'

import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'

export const SavedWordScreen = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const [isLoading, setIsLoading] = React.useState(false)
  const [searchText, setSearchText] = React.useState('')
  const modalRef = React.useRef<ModalFunction>(null)
  const flag = React.useRef(0)
  const [savedWordData, setSavedWordData] = React.useState<Word[]>([])
  const [suggestionWord, setSuggestionWord] = React.useState<Word[]>([])
  const renderSavedWordItem = ({ index, item }: RNListRenderItemInfo<Word>) => {
    return (
      <Block key={`item-saved-word-${index}`}>
        <SavedWordItem
          data={item}
          onDeletePress={() => {
            callAPIDeleteSavedWord(item._id)
          }}
        />
        <Block backgroundColor={colors.greyLight} height={1} width="100%" />
      </Block>
    )
  }
  const callAPI = async () => {
    setIsLoading(true)
    try {
      const response = await UserService.getWordsBookmark()
      setSavedWordData(response.data.data.words)
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }
  const callAPIDeleteSavedWord = async (wordId: string) => {
    setIsLoading(true)
    try {
      const response = await UserService.bookmarkWord(wordId)
      setSavedWordData(response.data.data.wordBookmarks)
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }
  const callAPIGetAllWords = async () => {
    try {
      const response = await KnowledgeService.getAllWord({ page: 1, limit: 5 })
      setSuggestionWord(response.data.data.words)
    } catch (e) {
      console.log(e)
    }
  }
  const renderLearnItem = ({ index, item }: ListRenderItemInfo<Word>) => {
    return (
      <Block key={`item-learned-${index}`} marginTop={10}>
        <LearnWordItem
          data={item}
          onPress={() => {
            navigate('DETAIL_WORD_SCREEN', { wordId: item._id })
          }}
        />
      </Block>
    )
  }
  const searchApi = async (searchText: string) => {
    setIsLoading(true)
    try {
      const response = await UserService.getWordsBookmark({
        search: searchText,
      })
      setSavedWordData(response.data.data.words)
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    if (flag.current === 1) {
      const timeOutSearch = setTimeout(() => {
        if (searchText.length > 0) {
          searchApi(searchText)
        } else {
          callAPI()
        }
      }, 2000)
      return () => clearTimeout(timeOutSearch)
    }
    flag.current = 1
    return
  }, [searchText])
  React.useEffect(() => {
    callAPI()
    callAPIGetAllWords()
  }, [])
  return (
    <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
      <DismissKeyBoardBlock>
        <Block flex>
          <Block
            left={0}
            right={0}
            height={130}
            borderBottomLeftRadius={50}
            borderBottomRightRadius={50}
            backgroundColor={colors.orangePrimary}
            absolute
          />
          <Block
            paddingVertical={10}
            paddingHorizontal={20}
            backgroundColor="transparent"
          >
            <Block row alignCenter marginTop={20}>
              <Icon state="Back" onPress={goBack} stroke={colors.black}></Icon>
              <Text
                center
                flex
                size={'h2'}
                fontFamily="bold"
                color={colors.black}
              >
                {t('saved_vocabulary')}
              </Text>
            </Block>
            <Block
              marginTop={22}
              height={35}
              radius={30}
              shadow
              shadowColor="white"
            >
              <TextInput
                inputContainerStyle={styles.inputStyle}
                placeholder={t('english_vocabulary')}
                placeholderTextColor={colors.greyPrimary}
                value={searchText}
                onChangeText={setSearchText}
                rightIcon={
                  <Icon
                    state="Microphone"
                    stroke={colors.greyPrimary}
                    onPress={() => {
                      modalRef.current?.openModal()
                    }}
                  />
                }
              />
            </Block>

            <Block marginTop={30}>
              <Block
                borderWidth={savedWordData.length === 0 ? 0 : 1}
                borderColor={colors.borderColor}
                radius={15}
                overflow="hidden"
              >
                {isLoading ? (
                  <Block height={200} justifyCenter alignCenter>
                    <ActivityIndicator
                      size={'large'}
                      color={colors.orangePrimary}
                    />
                  </Block>
                ) : (
                  <FlatList
                    scrollEnabled={false}
                    data={savedWordData}
                    keyExtractor={(_, index) => `item-saved-word-${index}`}
                    renderItem={renderSavedWordItem}
                    ListEmptyComponent={
                      <Block alignCenter marginTop={20}>
                        <Image
                          source={images.BeeReading}
                          width={150}
                          height={150}
                          resizeMode={'contain'}
                        />
                        <Text
                          size={'h2'}
                          fontFamily={'semiBold'}
                          center
                          marginTop={15}
                        >
                          {t('havent_saved_a_word')}
                        </Text>
                      </Block>
                    }
                    showsHorizontalScrollIndicator={false}
                  />
                )}
              </Block>
            </Block>
            <Block row alignCenter marginTop={17}>
              <Icon state="Dictionary" />
              <Text fontFamily="bold" marginLeft={5} size={'h3'}>
                {t('library_vocabulary')}
              </Text>
            </Block>
            <Block marginVertical={15} style={{ minWidth: 5, minHeight: 5 }}>
              <FlashList
                data={suggestionWord}
                estimatedItemSize={40}
                keyExtractor={(_, index) => `item-suggest-word-${index}`}
                renderItem={renderLearnItem}
                showsHorizontalScrollIndicator={false}
              />
            </Block>
          </Block>
          <VoiceDectectorModal
            modalRef={modalRef}
            setText={setSearchText}
            onFinishRecord={() => {
              console.log('finished')
              modalRef.current?.dismissModal()
            }}
          />
        </Block>
      </DismissKeyBoardBlock>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    borderRadius: 30,
    borderColor: 'transparent',
  },
})
