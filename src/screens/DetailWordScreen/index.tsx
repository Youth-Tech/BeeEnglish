import React from 'react'
import Content from './components/Content'
import { heightScreen } from '@utils/helpers'
import { useTranslation } from 'react-i18next'
import { KnowledgeService, Word } from '@services'
import { goBack, RootStackParamList } from '@navigation'
import {
  Pressable,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native'
import { Block, Image, Text } from '@components'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  CopyIcon,
  Icon,
  images,
  RightArrowIcon,
  SoundProgressFcRef,
  VolumeIcon,
} from '@assets'
import { getStatusBarHeight } from '@components/bases/StatusBar/status_bar_height'
import Sound from 'react-native-sound'
import Clipboard from '@react-native-clipboard/clipboard'
import Video from 'react-native-video'
type Props = NativeStackScreenProps<RootStackParamList, 'DETAIL_WORD_SCREEN'>
export const DetailWordScreen = ({ route }: Props) => {
  const { wordId } = route.params
  const { t } = useTranslation()

  const audioPlayerRef = React.useRef<Video>(null)

  const [isAudioPlay, setIsAudioPlay] = React.useState(false)
  const [wordData, setWordData] = React.useState<Word>()
  const soundUrl = wordData?.attachments.find((o) => o.type === 'audio')
  console.log(soundUrl?.src)
  const sound = new Sound(
    soundUrl?.src ??
      'https://api.dictionaryapi.dev/media/pronunciations/en/default-uk.mp3',
    '',
    (error) => {
      if (error) console.log('Fail to load sound')
    },
  )
  const soundProgressRef = React.useRef<SoundProgressFcRef>(null)
  const onCopyPress = () => {
    console.log('onCopyPress')
    Clipboard.setString(wordData?.english ?? '')
    ToastAndroid.show('Copied the word into your clipboard', ToastAndroid.SHORT)
  }

  const onPronunciationPress = () => {
    console.log('onPronunciationPress')
    // soundProgressRef.current?.start()
    // sound.play((success) => {
    //   if (success) {
    //     console.log('successfully finished playing')
    //     soundProgressRef.current?.pause()
    //   } else {
    //     console.log('playback failed due to audio decoding errors')
    //   }
    // })

    setIsAudioPlay((prev) => !prev)
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

  const onAudioPlayerError = () => {
    setIsAudioPlay(false)
  }

  const onAudioPlayerEnd = () => {
    setIsAudioPlay(false)
    audioPlayerRef?.current?.seek(0)
  }

  return (
    <Block flex>
      <Video
        audioOnly
        source={{
          uri:
            soundUrl?.src ??
            'https://api.dictionaryapi.dev/media/pronunciations/en/default-uk.mp3',
        }}
        ref={audioPlayerRef}
        paused={!isAudioPlay}
        onEnd={onAudioPlayerEnd}
        onError={onAudioPlayerError}
      />

      <Image
        width={'100%'}
        resizeMode="contain"
        height={heightScreen}
        source={images.BG_Detail}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
        }}
      />
      <ScrollView>
        <Block>
          <Block
            row
            alignCenter
            space="between"
            marginHorizontal={24}
            marginTop={20 + getStatusBarHeight()}
          >
            <Icon state="Back" onPress={goBack} />
            <Text color="black" size={'h3'} fontFamily="bold" center>
              {t('dictionary')}
            </Text>
            <Block width={24} />
          </Block>

          <Block
            shadow
            margin={20}
            radius={15}
            elevation={3}
            backgroundColor="white"
            style={{ minHeight: heightScreen - 200 }}
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
                {wordData?.pronunciation}
              </Text>
            </Block>

            <Block marginTop={15} row justifyCenter gap={20}>
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

            <Content data={wordData?.senses ?? []} />

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
      </ScrollView>
    </Block>
  )
}
