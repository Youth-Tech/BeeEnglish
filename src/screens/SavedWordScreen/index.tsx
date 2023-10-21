import React from 'react'
import {
  Container,
  DismissKeyBoardBlock,
  Block,
  Text,
  TextInput,
} from '@components'
import { goBack } from '@navigation'
import { useTranslation } from 'react-i18next'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import { FlatList, ListRenderItemInfo, View } from 'react-native'
import { dataSavedWordProps, dataLearnProps } from './const'
import { LearnWordItem } from './components/LearnWordItem'
import { SavedWordItem } from './components/SavedWordItem'

export const SavedWordScreen = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const savedWordData: dataSavedWordProps[] = [
    {
      id: 1,
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'ˈtʃɪk.ɪn',
    },
    {
      id: 2,
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'ˈtʃɪk.ɪn',
    },
    {
      id: 3,
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'ˈtʃɪk.ɪn',
    },
    {
      id: 4,
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'ˈtʃɪk.ɪn',
    },
    {
      id: 5,
      word: 'Chicken',
      wordType: 'noun',
      wordPronounce: 'ˈtʃɪk.ɪn',
    },
  ]
  const renderSavedWordItem = ({
    index,
    item,
  }: ListRenderItemInfo<dataSavedWordProps>) => {
    return (
      <View key={`item-${index}`}>
        <SavedWordItem data={item} />
      </View>
    )
  }
  const learnData: dataLearnProps[] = [
    {
      id: 1,
      word: 'Chicken',
      wordType: 'ˈtʃɪk.ɪn',
      translation: 'Con gà',
    },
    {
      id: 2,
      word: 'Chicken',
      wordType: 'ˈtʃɪk.ɪn',
      translation: 'Con gà',
    },
    {
      id: 3,
      word: 'Chicken',
      wordType: 'ˈtʃɪk.ɪn',
      translation: 'Con gà',
    },
    {
      id: 4,
      word: 'Chicken',
      wordType: 'ˈtʃɪk.ɪn',
      translation: 'Con gà',
    },
  ]
  const renderLearnItem = ({
    index,
    item,
  }: ListRenderItemInfo<dataLearnProps>) => {
    return (
      <View key={`item-${index}`}>
        <LearnWordItem data={item} />
      </View>
    )
  }
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
          ></Block>
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
            <Block marginTop={22} height={35} radius={30} shadow shadowColor='white'>
              <TextInput
                containerStyle={{ width: '100%' }}
                placeholderTextColor={colors.greyPrimary}
                inputContainerStyle={{
                  width: '100%',
                  borderRadius: 30
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
            <Block marginTop={20}>
              <Block shadow radius={15} overflow="hidden">
                <FlatList
                  scrollEnabled={false}
                  data={savedWordData}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderSavedWordItem}
                  showsHorizontalScrollIndicator={false}
                />
              </Block>
            </Block>
            <Block row alignCenter marginTop={17}>
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
            <Block marginVertical={15} row>
              <FlatList
                horizontal={true}
                data={learnData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderLearnItem}
                showsHorizontalScrollIndicator={false}
              />
            </Block>
          </Block>
        </Block>
      </DismissKeyBoardBlock>
    </Container>
  )
}
