import React, { useEffect, useState } from 'react'
import { Block, Text } from '@components'
import { useAppSelector } from '@hooks'
import WebView from "react-native-webview";

const BottomSheetWord: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])
  const word = useAppSelector((state) => state.root.detailPost.word)

  return (
    <>
      {!isLoading && (
        <Block paddingHorizontal={20} flex>
          <Block marginTop={20} flex>
            <Text size={'h2'} fontFamily={'bold'} children={word} />
            <WebView
                source={{ uri: 'https://khoaiphim.com/' }}
                javaScriptEnabled
                scrollEnabled
                nestedScrollEnabled
                style={{ flex: 1 }}
            />
          </Block>
        </Block>
      )}
    </>
  )
}

export default BottomSheetWord
