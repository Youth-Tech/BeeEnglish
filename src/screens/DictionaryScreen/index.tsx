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
import { DictionaryItem, VocabularyItem } from './components'

export const DictionaryScreen = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <Container hasScroll>
      <DismissKeyBoardBlock>
        <Block flex>
          <Block row paddingHorizontal={25} alignCenter>
            <Icon state="Back" onPress={goBack}></Icon>
            <Text center flex paddingRight={25} fontFamily="bold" size={'h2'}>
              Từ điển
            </Text>
          </Block>
          <Block marginTop={22} paddingHorizontal={25} row>
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
                placeholder="English Vocabulary"
                rightIcon={
                  <Icon state="Microphone" stroke={colors.greyPrimary}></Icon>
                }
              />
            </Block>
          </Block>
          <Block row alignCenter marginTop={24} paddingLeft={25}>
            <Icon state="History"></Icon>
            <Text fontFamily="semiBold" marginLeft={5} size={'h4'}>
              Lịch sử
            </Text>
          </Block>
          <Block marginTop={15} paddingHorizontal={25}>
            <Block shadow radius={15} overflow="hidden">
              <DictionaryItem
                word={'Chicken'}
                wordType={'noun'}
                wordPronounce={'Hetcuu'}
              />
              <DictionaryItem
                word={'Chicken'}
                wordType={'noun'}
                wordPronounce={'Hetcuu'}
              />
              <DictionaryItem
                word={'Chicken'}
                wordType={'noun'}
                wordPronounce={'Hetcuu'}
              />
                <DictionaryItem
                word={'Chicken'}
                wordType={'noun'}
                wordPronounce={'Hetcuu'}
              />
                <DictionaryItem
                word={'Chicken'}
                wordType={'noun'}
                wordPronounce={'Hetcuu'}
              />
            </Block>
          </Block>
          <Block row alignCenter marginTop={17} paddingLeft={25}>
            <Icon state="Dictionary"></Icon>
            <Text fontFamily="bold" marginLeft={5} size={'h3'}>
              Các từ vựng hay
            </Text>
          </Block>
          
          <Block paddingLeft={25} paddingTop={15} row>
              <VocabularyItem name={'Từ vựng đã học'} image={images.BeeReading}></VocabularyItem>
              <VocabularyItem name={'Từ vựng đã lưu'} image={images.BeePencil}></VocabularyItem>
          </Block>
        </Block>
      </DismissKeyBoardBlock>
    </Container>
  )
}
