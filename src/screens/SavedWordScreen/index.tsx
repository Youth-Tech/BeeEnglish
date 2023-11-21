import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native'

import {
  Block,
  Container,
  DismissKeyBoardBlock,
  Text,
  TextInput,
  VoiceDectectorModal,
} from '@components'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import { goBack } from '@navigation'
import { LearnWordItem } from './components/LearnWordItem'
import { SavedWordItem } from './components/SavedWordItem'
import { KnowledgeService, UserService, Word } from '@services'
import { ModalFunction } from '@components/bases/Modal/type'

export const SavedWordScreen = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const [searchText, setSearchText] = React.useState('')
  const modalRef = React.useRef<ModalFunction>(null)
  const [savedWordData, setSavedWordData] = React.useState<Word[]>([])
  const [suggestionWord, setSuggestionWord] = React.useState<Word[]>([])
  const renderSavedWordItem = ({ index, item }: ListRenderItemInfo<Word>) => {
    return (
      <SavedWordItem
        data={item}
        key={index}
        onDeletePress={() => {
          callAPIDeleteSavedWord(item._id)
        }}
      />
    )
  }
  const callAPI = async () => {
    try {
      const response = await UserService.getWordsBookmark()
      setSavedWordData(response.data.data.words)
    } catch (e) {
      console.log(e)
    }
  }
  const callAPIDeleteSavedWord = async (wordId: string) => {
    try {
      const response = await UserService.bookmarkWord(wordId)
      setSavedWordData(response.data.data.wordBookmarks)
    } catch (e) {
      console.log(e)
    }
  }
  const callAPIGetAllWords = async () => {
    try {
      const response = await KnowledgeService.getAllWord(1, 5)
      setSuggestionWord(response.data.data.words)
    } catch (e) {
      console.log(e)
    }
  }
  const renderLearnItem = ({ index, item }: ListRenderItemInfo<Word>) => {
    return <LearnWordItem data={item} key={index} />
  }
  const searchApi = async (searchText: string) => {
    try {
      const response = await UserService.getWordsBookmark({
        search: searchText,
      })
      setSavedWordData(response.data.data.words)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    const timeOutSearch = setTimeout(() => {
      if (searchText.length > 0) {
        searchApi(searchText)
      } else {
        callAPI()
      }
    }, 2000)

    return () => clearTimeout(timeOutSearch)
  }, [searchText])
  React.useEffect(() => {
    callAPI()
    callAPIGetAllWords()
  }, [])
  return (
    <Container statusColor={colors.orangePrimary}>
      <DismissKeyBoardBlock>
        <Block flex>
          <Block
            left={0}
            right={0}
            height={220}
            borderBottomLeftRadius={50}
            borderBottomRightRadius={50}
            backgroundColor={colors.orangePrimary}
            absolute
          />
          <Block
            paddingHorizontal={20}
            marginTop={10}
            backgroundColor="transparent"
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
                    onPress={() => {}}
                  />
                }
              />
            </Block>
            <Block marginTop={20}>
              <Block shadow radius={15} overflow="hidden">
                <FlatList
                  scrollEnabled={false}
                  data={savedWordData}
                  keyExtractor={(_, index) => `item-saved-word-${index}`}
                  renderItem={renderSavedWordItem}
                  showsHorizontalScrollIndicator={false}
                />
              </Block>
            </Block>
            <Block row alignCenter marginTop={17}>
              <Icon state="Dictionary" />
              <Text fontFamily="bold" marginLeft={5} size={'h3'}>
                {t('library_vocabulary')}
              </Text>
            </Block>
            <Block marginVertical={15}>
              <FlatList
                horizontal={true}
                data={suggestionWord}
                keyExtractor={(_, index) => `item-suggest-word-${index}`}
                renderItem={renderLearnItem}
                showsHorizontalScrollIndicator={false}
              />
            </Block>
          </Block>
        </Block>
      </DismissKeyBoardBlock>
      <VoiceDectectorModal
        modalRef={modalRef}
        setText={setSearchText}
        onFinishRecord={() => {
          console.log('finished')
          modalRef.current?.dismissModal()
        }}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    borderRadius: 30,
    borderColor: 'transparent',
  },
})
