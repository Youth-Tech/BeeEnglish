import React from 'react'
import {
  Container,
  DismissKeyBoardBlock,
  Block,
  Text,
} from '@components'
import { goBack, navigate } from '@navigation'
import { useTranslation } from 'react-i18next'
import { BackArrow, Icon } from '@assets'

export const SavedWordScreen = () => {
  const { t } = useTranslation()
  const goDetailWord = () => {
    navigate('DETAIL_WORD_SCREEN')
  }
  return (
    <Container hasScroll>
        <DismissKeyBoardBlock>
          <Block flex>
            <Block paddingHorizontal={24} paddingTop={10}>
            <Icon state="Back" onPress={goBack} />
              <Text
                color="black"
                size={'heading'}
                fontFamily="bold"
                marginTop={20}
                lineHeight={34}
              >
                {t('enter_password')}
              </Text>
              <Text
                size={'h4'}
                color={'textLabel'}
                marginTop={15}
                lineHeight={18}
              >
                {t('label_new_password')}
              </Text>
           </Block>
          </Block>
        </DismissKeyBoardBlock>
      </Container>
  )
}
