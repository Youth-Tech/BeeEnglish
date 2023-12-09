import React from 'react'
import { Icon, images } from '@assets'
import { useTheme } from '@themes'
import { useTranslation } from 'react-i18next'
import { LearnedWordItem } from './components'
import { ReviewService, WordReviews } from '@services'
import {
  Block,
  Container,
  Image,
  Text,
  TextInput,
  VoiceDectectorModal,
} from '@components'
import HeaderApp from '@components/common/HeaderComponent'
import { MasonryFlashList, MasonryListRenderItem } from '@shopify/flash-list'
import { ModalFunction } from '@components/bases/Modal/type'
import { navigate } from '@navigation'
import { ActivityIndicator } from 'react-native'

export const LearnedWordScreen = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const modalRef = React.useRef<ModalFunction>(null)
  const flag = React.useRef(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [searchText, setSearchText] = React.useState('')
  const [learnedWordData, setLearnedWordData] = React.useState<WordReviews[]>(
    [],
  )
  const renderLearnedWordItem: MasonryListRenderItem<WordReviews> = (info) => {
    const { item, index } = info
    return (
      <Block key={`item-${index}`} paddingBottom={10}>
        <LearnedWordItem
          data={item}
          onPress={() => {
            navigate('DETAIL_WORD_SCREEN', { wordId: item.word._id })
          }}
        />
      </Block>
    )
  }
  const callApi = async () => {
    setIsLoading(true)
    try {
      const response = await ReviewService.getAllWordReviews()
      console.log(response.data.data)
      setLearnedWordData(response.data.data.wordsReview)
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }
  const searchApi = async (searchText: string) => {
    setIsLoading(true)
    try {
      const response = await ReviewService.getAllWordReviews({
        search: searchText,
      })
      setLearnedWordData(response.data.data.wordsReview)
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    if (flag.current === 1) {
      const timeOutSearch = setTimeout(() => {
        searchApi(searchText)
      }, 2000)
      return () => clearTimeout(timeOutSearch)
    }
    flag.current = 1
    return
  }, [searchText])
  React.useEffect(() => {
    callApi()
  }, [])
  return (
    <Container statusColor={colors.orangePrimary}>
      <Block
        width={'100%'}
        height={110}
        backgroundColor={colors.orangePrimary}
        borderBottomLeftRadius={50}
        borderBottomRightRadius={50}
        style={{ flexGrow: 1 }}
        absolute
      />
      {/* Textinput and FlatList */}
      <HeaderApp
        title={t('vocabulary_learned')}
        style={{ backgroundColor: colors.transparent }}
        color="black"
      />
      <Block paddingHorizontal={20} backgroundColor="transparent" flex>
        <Block marginVertical={15} height={35} radius={30}>
          <TextInput
            containerStyle={{ width: '100%' }}
            placeholderTextColor={colors.greyPrimary}
            inputContainerStyle={{
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
            value={searchText}
            onChangeText={setSearchText}
          />
        </Block>
        <Block radius={15} flex overflow="scroll">
          {isLoading ? (
            <Block height={200} justifyCenter>
              <ActivityIndicator size={'large'} color={colors.orangePrimary} />
            </Block>
          ) : (
            <MasonryFlashList
              scrollEnabled={true}
              data={learnedWordData}
              keyExtractor={(_, index) => `item-learned-word-${index}`}
              renderItem={renderLearnedWordItem}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              centerContent
              estimatedItemSize={200}
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
                    {t('learn_a_word')}
                  </Text>
                </Block>
              }
            />
          )}
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
    </Container>
  )
}
