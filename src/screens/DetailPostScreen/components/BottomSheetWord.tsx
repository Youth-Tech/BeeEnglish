import { useTheme } from '@themes'
import { useAppSelector } from '@hooks'
import { Block, Text } from '@components'
import React, { useEffect, useState } from 'react'
import { WebView } from 'react-native-webview'

export const BottomSheetWord: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { colors } = useTheme()
  useEffect(() => {
    setIsLoading(false)
  }, [])
  const word = useAppSelector((state) => state.root.detailPost.word)
  return (
    <>
      {!isLoading && (
        <Block flex>
          <Block row padding={20} backgroundColor={colors.white}>
            <Text
              size={'h2'}
              fontFamily={'bold'}
              children={word}
              marginRight={10}
            />
            {/*<Icon state="WaveAudio" fill={colors.orangeDark} />*/}
          </Block>
          <Block paddingHorizontal={20} flex>
            <WebView
              style={{
                flex: 1,
              }}
              javaScriptEnabled
              source={{
                uri: `https://translate.yandex.com/?source_lang=en&target_lang=vi&text=${word}`,
              }}
            />
          </Block>
        </Block>
      )}
    </>
  )
}
