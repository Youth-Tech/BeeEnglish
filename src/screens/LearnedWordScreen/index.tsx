import React from 'react'
import { useTranslation } from 'react-i18next'
import { Block, Container, TextInput } from '@components'
import { useTheme } from '@themes'
import { Icon } from '@assets'
import { LearnedWordItem } from './components'
import { data, dataProps } from './const'
import HeaderApp from '@components/common/HeaderComponent'
import { MasonryFlashList, MasonryListRenderItem } from '@shopify/flash-list'

export const LearnedWordScreen = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const renderLearnedWordItem: MasonryListRenderItem<dataProps> = (info) => {
    const { item, index } = info
    return (
      <Block key={`item-${index}`} paddingBottom={10}>
        <LearnedWordItem data={item} />
      </Block>
    )
  }
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
            data={data}
            keyExtractor={(item) => item.id.toString()}
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
