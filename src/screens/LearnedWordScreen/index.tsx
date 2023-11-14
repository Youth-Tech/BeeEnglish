import React from 'react'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import { useTranslation } from 'react-i18next'
import { LearnedWordItem } from './components'
import { ReviewService, WordReviews } from '@services'
import { Block, Container, TextInput } from '@components'
import HeaderApp from '@components/common/HeaderComponent'
import { MasonryFlashList, MasonryListRenderItem } from '@shopify/flash-list'

export const LearnedWordScreen = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const [learnedWordData, setLearnedWordData] = React.useState<WordReviews[]>(
    [],
  )
  const renderLearnedWordItem: MasonryListRenderItem<WordReviews> = (info) => {
    const { item, index } = info
    return (
      <Block key={`item-${index}`} paddingBottom={10}>
        <LearnedWordItem data={item} />
      </Block>
    )
  }
  const callApi = async () => {
    try {
      const response = await ReviewService.getAllWordReviews()
      console.log(response.data.data)
      setLearnedWordData(response.data.data.wordsReview)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    callApi()
  }, [])
  return (
    <Container statusColor={colors.orangePrimary}>
      <Block
        width={'100%'}
        height={200}
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
        color="white"
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
                onPress={() => {}}
              ></Icon>
            }
          />
        </Block>
        <Block radius={15} flex overflow="scroll">
          <MasonryFlashList
            scrollEnabled={true}
            data={learnedWordData}
            keyExtractor={(_, index) => `item-learned-word-${index}`}
            renderItem={renderLearnedWordItem}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            centerContent
            estimatedItemSize={200}
          />
        </Block>
      </Block>
    </Container>
  )
}
