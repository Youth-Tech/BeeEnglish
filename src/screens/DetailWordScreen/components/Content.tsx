import { Block, Text } from '@components'
import React from 'react'
import { Senses } from '@services'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
export interface ContentProps {
  data: Senses[]
}
// Noun = 'noun',
//     Verb = 'verb',
//     Adjective = 'adjective',
//     Adverb = 'adverb',
//     Pronoun = 'pronoun',
//     Preposition = 'preposition',
//     Conjunction = 'conjunction',
//     Interjection = 'interjection',
const Content = (props: ContentProps) => {
  const { data } = props
  const { t } = useTranslation()
  const wordType = (type: string) => {
    switch (type) {
      case 'noun':
        return i18next.t('noun') + '(n)'
      case 'verb':
        return i18next.t('verb') + '(v)'
      case 'adjective':
        return i18next.t('adjective') + '(adj)'
      case 'pronoun':
        return i18next.t('pronoun') + '(pron)'
      case 'preposition':
        return i18next.t('preposition') + '(prep)'
      case 'conjunction':
        return i18next.t('conjunction') + '(conj)'
      case 'interjection':
        return i18next.t('interjection') + '(interj)'
      default:
        return ''
    }
  }
  return (
    <Block paddingHorizontal={20} flex>
      {data.map((item, index) => (
        <Block marginTop={20} key={`item-sensen-${index}`}>
          <Text
            marginTop={10}
            color="red"
            fontFamily="bold"
            size={'h4'}
            lineHeight={18}
          >
            {wordType(item.type)}
          </Text>
          <Text marginTop={10} fontFamily="bold" size={'h4'} lineHeight={18}>
            {item.vietnamese}
          </Text>
          {item.exampleEnglish?.length > 0 && (
            <Block marginTop={10} row>
              <Text color="blue" fontFamily="bold" size={'h4'} lineHeight={18}>
                {t('example')}:
              </Text>
              <Text
                flex
                size={'h4'}
                marginLeft={5}
                fontFamily="bold"
                lineHeight={18}
              >
                {item.exampleEnglish}
              </Text>
            </Block>
          )}
          {item.exampleVietnamese?.length > 0 && (
            <Block marginTop={10} row>
              <Text color="blue" fontFamily="bold" size={'h4'} lineHeight={18}>
                {t('meaning')}:
              </Text>
              <Text
                marginLeft={5}
                fontFamily="bold"
                size={'h4'}
                flex
                lineHeight={18}
              >
                {item.exampleVietnamese}
              </Text>
            </Block>
          )}

          {item.synonyms.length > 0 && (
            <Block marginTop={10} row>
              <Text color="blue" fontFamily="bold" size={'h4'} lineHeight={18}>
                {t('synonyms')}:
              </Text>
              <Text
                marginLeft={5}
                fontFamily="bold"
                size={'h4'}
                flex
                lineHeight={18}
              >
                {item.synonyms.join(', ')}
              </Text>
            </Block>
          )}

          {item.antonyms.length > 0 && (
            <Block marginTop={10} row>
              <Text color="blue" fontFamily="bold" size={'h4'} lineHeight={18}>
                {t('antonyms')}:
              </Text>
              <Text
                marginLeft={5}
                fontFamily="bold"
                size={'h4'}
                flex
                lineHeight={18}
              >
                {item.antonyms.join(', ')}
              </Text>
            </Block>
          )}
        </Block>
      ))}
    </Block>
  )
}

export default Content
