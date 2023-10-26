import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Block,
  Container,
  DismissKeyBoardBlock,
  StatusBar,
  Text,
  TextInput,
} from '@components'
import { useTheme } from '@themes'
import { Icon } from '@assets'
import { LearnedWordItem } from './components'
import { goBack } from '@navigation'
import { FlatList, ListRenderItemInfo, View } from 'react-native'
import { widthScreen } from '@utils/helpers'
import { data, dataProps } from './const'

export const LearnedWordScreen = () => {
  const { colors, normalize } = useTheme()
  const { t } = useTranslation()

  const renderLearnedWordItem = ({
    index,
    item,
  }: ListRenderItemInfo<dataProps>) => {
    return (
      <View style={{ padding: normalize.m(5) }} key={`item-${index}`}>
        <LearnedWordItem data={item} />
      </View>
    )
  }

  return (
    <Container>
      <StatusBar statusColor={colors.orangePrimary}></StatusBar>
      <DismissKeyBoardBlock>
        <Block flex>
          <Block
            width={widthScreen}
            height={208}
            backgroundColor={colors.orangePrimary}
            borderBottomLeftRadius={50}
            borderBottomRightRadius={50}
            absolute
          ></Block>
          {/* Textinput and FlatList */}
          <Block paddingHorizontal={20} backgroundColor="transparent">
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
                {t('vocabulary_learned')}
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

            <FlatList
              scrollEnabled={true}
              data={data}
              style={{ paddingTop: 15 }}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderLearnedWordItem}
              showsVerticalScrollIndicator={false}
              numColumns={2}
            />
          </Block>
        </Block>
      </DismissKeyBoardBlock>
    </Container>
  )
}
