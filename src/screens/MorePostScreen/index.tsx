import React from 'react'
import { Block, Container, Text } from '@components'
import { ActivityIndicator, ScrollView } from 'react-native'
import { normalize, useTheme } from '@themes'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import PostItem from '@screens/MorePostScreen/components/PostItem'
import { useTranslation } from 'react-i18next'
import { PostServices } from '@services'
import { navigate } from '@navigation'

export const MorePostScreen: React.FC = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const [postData, setPostData] = React.useState<PostResponse[]>([])
  const [isFetchingPosts, setIsFetchingPosts] = React.useState(true)
  const pagination = React.useRef<Pagination>({
    hasPrev: false,
    hasNext: false,
    page: 1,
    total: 0,
  })

  React.useEffect(() => {
    callAPIPost()
  }, [])

  const renderPostItem = ({
    index,
    item,
  }: ListRenderItemInfo<PostResponse>) => {
    return (
      <Block key={`item-post-${index}`} marginBottom={20}>
        <PostItem
          data={item}
          onPress={() => {
            navigate('DETAIL_POST_SCREEN', { post: item })
          }}
        />
      </Block>
    )
  }

  const callAPIPost = async () => {
    setIsFetchingPosts(true)
    try {
      const response = await PostServices.getAllPost({
        limit: 7,
        type: 'text',
        page: pagination.current.page,
      })
      setPostData((prevState) => [...prevState, ...response.data.data.posts])
      pagination.current = response.data.data.pagination
      setIsFetchingPosts(false)
    } catch (e) {
      console.log(e)
    }
  }

  const onEndReached = () => {
    if (pagination.current.hasNext && !isFetchingPosts) {
      pagination.current.page++
      callAPIPost()
    }
  }

  const renderFooterComponent = () => {
    return (
      <Block alignCenter justifyCenter>
        {isFetchingPosts ? (
          <ActivityIndicator size={'large'} color={colors.orangePrimary} />
        ) : (
          <></>
        )}
      </Block>
    )
  }

  return (
    <Container>
      <Block>
        <ScrollView
          style={{
            paddingHorizontal: normalize.h(20),
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text size={'heading'} fontFamily={'bold'} marginTop={10}>
            {t('post')}
          </Text>
          <Block style={{ minHeight: 5, minWidth: 5 }} marginTop={20}>
            <FlashList
              data={postData}
              estimatedItemSize={140}
              renderItem={renderPostItem}
              onEndReached={onEndReached}
              ListFooterComponent={renderFooterComponent}
            />
          </Block>
        </ScrollView>
      </Block>
    </Container>
  )
}
