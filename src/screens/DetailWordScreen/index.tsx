import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, TouchableOpacity } from 'react-native'

import {
  CopyIcon,
  Icon,
  images,
  RightArrowIcon,
  StarIcon,
  VolumeIcon,
} from '@assets'
import { goBack, RootStackParamList } from '@navigation'
import Content from './components/Content'
import { heightScreen } from '@utils/helpers'
import { Block, Container, Image, Text } from '@components'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { KnowledgeService, Word } from '@services'

type Props = NativeStackScreenProps<RootStackParamList, 'DETAIL_WORD_SCREEN'>
export const DetailWordScreen = ({ route }: Props) => {
  const { wordId } = route.params
  const { t } = useTranslation()

  const [wordData, setWordData] = React.useState<Word>()
  const onCopyPress = () => {
    console.log('onCopyPress')
  }

  const onBookmarkPress = () => {
    console.log('onBookmarkPress')
  }

  const onPronunciationPress = () => {
    console.log('onPronunciationPress')
  }
  const callGetWordByIdAPI = async () => {
    try {
      const response = await KnowledgeService.getWordById(wordId)
      setWordData(response.data.data)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    callGetWordByIdAPI()
  }, [])
  return (
    <Container>
      <Image
        width={'100%'}
        resizeMode="contain"
        height={heightScreen}
        source={images.BG_Detail}
        style={{
          position: 'absolute',
          zIndex: -1,
        }}
      />
      <Block flex marginTop={10}>
        <Block row alignCenter space="between" marginHorizontal={24}>
          <Icon state="Back" onPress={goBack} />
          <Text color="black" size={'h3'} fontFamily="bold" center>
            {t('dictionary')}
          </Text>
          <Block width={24} />
        </Block>

        <Block
          flex
          shadow
          margin={20}
          radius={15}
          elevation={3}
          marginBottom={40}
          backgroundColor="white"
        >
          <Block column alignCenter justifyCenter>
            <Text
              size={'h2'}
              color="black"
              marginTop={15}
              lineHeight={18}
              fontFamily="bold"
            >
              {wordData?.english}
            </Text>
            <Text
              size={'h3'}
              marginTop={15}
              lineHeight={18}
              fontFamily="regular"
            >
              /{wordData?.pronunciation}/
            </Text>
          </Block>

          <Block marginTop={15} row space="evenly">
            <Pressable onPress={onPronunciationPress}>
              <Block
                shadow
                width={50}
                height={50}
                alignCenter
                radius={10}
                justifyCenter
                backgroundColor="white"
              >
                <VolumeIcon />
              </Block>
            </Pressable>

            <Pressable onPress={onBookmarkPress}>
              <Block
                shadow
                width={50}
                height={50}
                alignCenter
                radius={10}
                justifyCenter
                backgroundColor="white"
              >
                <StarIcon />
              </Block>
            </Pressable>
            <Pressable onPress={onCopyPress}>
              <Block
                shadow
                width={50}
                height={50}
                alignCenter
                radius={10}
                justifyCenter
                backgroundColor="white"
              >
                <CopyIcon />
              </Block>
            </Pressable>
          </Block>

          <Content />

          <Block row alignCenter justifyCenter marginBottom={70}>
            <Text color="black" size={12} fontFamily="bold" margin={5}>
              {t('video')}
            </Text>
            <TouchableOpacity>
              <RightArrowIcon />
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    </Container>
  )
}
