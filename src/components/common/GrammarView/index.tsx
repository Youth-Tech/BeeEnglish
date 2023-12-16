import React from 'react'
import Tooltip from 'rn-tooltip'
import { useTranslation } from 'react-i18next'

import { Icon } from '@assets'
import { useTheme } from '@themes'
import { Block, Text } from '@components'
import { widthScreen } from '@utils/helpers'

export interface GrammarViewProps {
  data: Grammar | null
}

export const GrammarView = ({ data }: GrammarViewProps) => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const toolTipRef = React.useRef<Tooltip>(null)

  if (data === null) {
    return <></>
  }

  const renderExample = () => {
    if (
      data.exampleEnglish.length === 0 ||
      data.exampleVietnamese.length === 0
    ) {
      return <></>
    }

    return (
      <Block marginTop={10} paddingLeft={10} gap={5}>
        <Text fontFamily={'semiBold'}>• {data.exampleEnglish[0]}</Text>
        <Text fontFamily={'semiBold'}>• {data.exampleVietnamese[0]}</Text>
      </Block>
    )
  }

  return (
    <Block padding={10} marginTop={10} row gap={10}>
      <Block flex>
        <Text fontFamily={'semiBold'}>
          {t('sentence_structure')}
          <Text fontFamily={'bold'} color={colors.blue}>
            {data.structure}
          </Text>
        </Text>
        {renderExample()}
      </Block>
      <Block>
        <Tooltip
          height={'auto'}
          ref={toolTipRef}
          actionType={'longPress'}
          width={widthScreen - 40}
          backgroundColor={colors.borderColor}
          popover={<Text fontFamily={'semiBold'}>{data.note}</Text>}
        >
          <Icon
            state={'Warning'}
            onPress={() => {
              toolTipRef?.current?.toggleTooltip()
            }}
          />
        </Tooltip>
      </Block>
    </Block>
  )
}
