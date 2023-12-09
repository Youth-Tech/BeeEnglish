import React from 'react'
import { useTranslation } from 'react-i18next'

import {
  Block,
  Container,
  DismissKeyBoardBlock,
  GuestModal,
  Image,
  Text,
  TextInput,
  VoiceDectectorModal,
} from '@components'
import { useTheme } from '@themes'
import { Icon, images } from '@assets'
import { goBack, navigate } from '@navigation'
import { DictionaryItem, VocabularyItem } from './components'
import { KnowledgeService, Word } from '@services'
import { SearchItem } from '@screens/DictionaryScreen/components/SearchItem'
import { FlatList, ListRenderItemInfo, ScrollView, View } from 'react-native'
import { ModalFunction } from '@components/bases/Modal/type'
import { useAppDispatch, useAppSelector } from '@hooks'
import { updateHistory } from '@redux/reducers/historyWord.reducer'

export const DictionaryScreen = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const modalRef = React.useRef<ModalFunction>(null)
  const [search, setSearch] = React.useState('')
  const isLoginWithGuest = useAppSelector(
    (state) => state.root.auth.isLoginWithGuest,
  )
  const [searchList, setSearchList] = React.useState<Word[]>([])
  const history = useAppSelector((state) => state.root.historyReducer.history)
  const guestModalRef = React.useRef<ModalFunction>(null)
  const renderDictionaryItem = ({ index, item }: ListRenderItemInfo<Word>) => {
    return (
      <View key={`item-${index}`}>
        <DictionaryItem
          data={item}
          onPress={() => {
            navigate('DETAIL_WORD_SCREEN', { wordId: item._id })
          }}
        />
      </View>
    )
  }
  const searchWordAPI = async (searchText: string) => {
    try {
      const response = await KnowledgeService.getAllWord({ search: searchText })
      setSearchList(response.data.data.words)
    } catch (e) {
      console.log(e)
    }
  }
  const renderSearchItem = ({ index, item }: ListRenderItemInfo<Word>) => (
    <Block>
      <SearchItem
        key={`item-search-${index}`}
        data={item}
        onPress={() => {
          dispatch(updateHistory(item))
          navigate('DETAIL_WORD_SCREEN', { wordId: item._id })
        }}
      />
      {index !== searchList.length - 1 && (
        <Block backgroundColor={colors.borderColor} height={1} width="100%" />
      )}
    </Block>
  )
  React.useEffect(() => {
    const timeOutSearch = setTimeout(() => {
      searchWordAPI(search)
    }, 2000)
    return () => clearTimeout(timeOutSearch)
  }, [search])
  return (
    <Container>
      <DismissKeyBoardBlock>
        <Block row paddingHorizontal={20} alignCenter marginTop={10}>
          <Icon state="Back" onPress={goBack}></Icon>
          <Text center flex fontFamily="bold" size={'h2'}>
            {t('dictionary')}
          </Text>
          <Block width={25}></Block>
        </Block>
        <Block>
          <Block
            marginTop={22}
            marginBottom={10}
            paddingHorizontal={25}
            row
            alignCenter
          >
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
                    onPress={() => {
                      modalRef.current?.openModal()
                    }}
                  ></Icon>
                }
              />
            </Block>
          </Block>

          <Block
            paddingHorizontal={30}
            height={searchList.length > 5 ? 60 * 5 : 'auto'}
            top={70}
            left={0}
            right={0}
            zIndex={1}
            absolute
          >
            <Block
              backgroundColor={colors.white}
              radius={20}
              borderWidth={searchList.length > 0 ? 1 : 0}
              borderColor={colors.borderColor}
            >
              <FlatList data={searchList} renderItem={renderSearchItem} />
            </Block>
          </Block>
        </Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
        >
          <Block flex>
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
                  data={history}
                  keyExtractor={(item) => item._id}
                  renderItem={renderDictionaryItem}
                  showsHorizontalScrollIndicator={false}
                />
              </Block>
            </Block>
            <Block row alignCenter marginTop={17} paddingLeft={20}>
              <Icon state="Dictionary"></Icon>
              <Text
                fontFamily="bold"
                marginLeft={5}
                size={'h3'}
                lineHeight={20}
              >
                {t('library_vocabulary')}
              </Text>
            </Block>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Block paddingLeft={20} marginVertical={15} row>
                <VocabularyItem
                  name={t('vocabulary_learned')}
                  image={images.BeeReading}
                  onPress={() => {
                    if (isLoginWithGuest) {
                      guestModalRef.current?.openModal()
                    } else {
                      navigate('LEARNED_WORD_SCREEN')
                    }
                  }}
                />
                <VocabularyItem
                  name={t('saved_vocabulary')}
                  image={images.BeePencil}
                  onPress={() => {
                    if (isLoginWithGuest) {
                      guestModalRef.current?.openModal()
                    } else {
                      navigate('SAVED_WORD_SCREEN')
                    }
                  }}
                />
              </Block>
            </ScrollView>
          </Block>
        </ScrollView>
      </DismissKeyBoardBlock>
      <VoiceDectectorModal
        modalRef={modalRef}
        setText={setSearch}
        onFinishRecord={() => {
          console.log('finished')
          modalRef.current?.dismissModal()
        }}
      />
      <GuestModal
        ref={guestModalRef}
        position={'center'}
        onButtonPress={() => {
          navigate('REGISTER_SCREEN', { isGuest: true })
          guestModalRef?.current?.dismissModal()
        }}
      />
    </Container>
  )
}
