import React from 'react'
import { useAppDispatch, useAppSelector } from '@hooks'
import { useTranslation } from 'react-i18next'
import { getUserData } from '@redux/selectors'
import { RankUser, UserService } from '@services'
import LeaderBoard from '@assets/icons/LeaderBoard'
import { Block, Container, Text } from '@components'
import { FlatList, ListRenderItemInfo } from 'react-native'
import RankItem from '@screens/RankingScreen/components/RankItem'
import { setLoadingStatusAction } from '@redux/reducers'

export const RankingScreen: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [board, setBoard] = React.useState<RankUser[]>([])
  const userLevel = useAppSelector(getUserData).level._id

  const getBoard = async () => {
    dispatch(setLoadingStatusAction(true))
    try {
      const response = await UserService.getBoard(userLevel)
      setBoard(response.data.data)
    } catch (e) {
      console.log(e)
    }
    dispatch(setLoadingStatusAction(false))
  }

  const renderRankItem = ({ index, item }: ListRenderItemInfo<RankUser>) => {
    return <RankItem key={`item-rank-${index}`} index={index} data={item} />
  }

  React.useEffect(() => {
    getBoard()
  }, [])

  return (
    <Container>
      <Block flex paddingHorizontal={20}>
        <Block row justifyCenter alignCenter gap={10}>
          <LeaderBoard />
          <Text size={'h2'} fontFamily={'bold'}>
            {t('leaderboard')}
          </Text>
        </Block>
        <FlatList
          data={board}
          renderItem={renderRankItem}
          keyExtractor={(_, index) => `item-${index}`}
          showsVerticalScrollIndicator={false}
        />
      </Block>
    </Container>
  )
}
