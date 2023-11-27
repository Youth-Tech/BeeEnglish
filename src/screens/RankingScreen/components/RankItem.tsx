import React from 'react'
import { RankUser } from '@services'
import { Icon, TIcon } from '@assets'
import { useTranslation } from 'react-i18next'
import { Block, Image, Text } from '@components'

export interface RankItemProps {
  index: number
  data: RankUser
}

const RankItem: React.FC<RankItemProps> = (props) => {
  const { t } = useTranslation()
  const { index, data } = props
  const renderBadge = (index: number): TIcon => {
    if (index === 0) {
      return 'Top1Badge'
    } else if (index === 1) {
      return 'Top2Badge'
    } else {
      return 'Top3Badge'
    }
  }
  return (
    <Block
      height={86}
      row
      alignCenter
      borderBottomWidth={1}
      borderColor={'#F3F3F3'}
    >
      <Block width={60} justifyCenter alignCenter>
        {index < 3 ? (
          <Icon state={renderBadge(index)} />
        ) : (
          <Text size={'h1'} fontFamily={'bold'}>
            {index + 1}
          </Text>
        )}
      </Block>

      <Block shadow marginLeft={7}>
        <Image
          source={{
            uri: data.avatar.toString(),
          }}
          width={61}
          height={61}
          radius={61 / 2}
          resizeMode={'cover'}
        />
      </Block>
      <Block marginLeft={7} gap={8}>
        <Text size={'h3'} fontFamily={'semiBold'}>
          {data.username}
        </Text>
        <Text size={'h4'} fontFamily={'regular'}>
          {t('score')}: {data.score}
        </Text>
      </Block>
    </Block>
  )
}
export default RankItem
