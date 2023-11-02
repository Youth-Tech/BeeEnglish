import { Icon } from '@assets'
import { useTheme } from '@themes'
import { sourceHTML } from '../const'
import { useAppSelector } from '@hooks'
import { Block, Text } from '@components'
import { widthScreen } from '@utils/helpers'
import RenderHTML from 'react-native-render-html'
import React, { useEffect, useState } from 'react'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'

const BottomSheetWord: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { colors } = useTheme()
  useEffect(() => {
    setIsLoading(false)
  }, [])
  const word = useAppSelector((state) => state.root.detailPost.word)
  return (
    <>
      {!isLoading && (
        <BottomSheetScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
        >
          <Block row padding={20} backgroundColor={colors.white}>
            <Text
              size={'h2'}
              fontFamily={'bold'}
              children={word}
              marginRight={10}
            />
            <Icon state="WaveAudio" fill={colors.orangeDark} />
          </Block>
          <Block paddingHorizontal={20} flex>
            <Block flex>
              <RenderHTML
                contentWidth={widthScreen - 100}
                source={sourceHTML}
              />
            </Block>
          </Block>
        </BottomSheetScrollView>
      )}
    </>
  )
}

export default BottomSheetWord
