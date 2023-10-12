import React from 'react'
import { Block, Container, DismissKeyBoardBlock, Text } from '@components'
import { useTranslation } from 'react-i18next'
import { Icon } from '@assets'
import { goBack } from '@navigation'

export const DetailWordScreen = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Container hasScroll>
        <DismissKeyBoardBlock>
          <Block flex>
            <Block paddingHorizontal={24} paddingTop={10}>
              <Block row>
                <Icon state="Back"/>
                <Text
                  color="black"
                  size={'h3'}
                  fontFamily="bold"
                >
                  {t('enter_password')}
                </Text>
              </Block>
            </Block>
          </Block>
        </DismissKeyBoardBlock>
      </Container>
    </Container>
  )
}
