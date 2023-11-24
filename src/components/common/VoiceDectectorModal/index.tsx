import React from 'react'
import { Block, Modal, Text } from '@components'
import { ModalFunction } from '@components/bases/Modal/type'
import PlayIcon from '@assets/icons/PlayIcon'
import { useTheme } from '@themes'
import PauseIcon from '@assets/icons/PauseIcon'
import Voice from '@react-native-voice/voice'
import { Pressable } from 'react-native'
import { useTranslation } from 'react-i18next'
import WaveForm, {
  WaveFormFunc,
} from '@components/common/VoiceDectectorModal/components/WaveForm'
import { handleErrorMessage } from '@utils/errorUtils'

export interface VoiceDetectorModalProps {
  modalRef: React.ForwardedRef<ModalFunction>
  setText: React.Dispatch<React.SetStateAction<string>>
  onFinishRecord?: () => void
}
export const VoiceDectectorModal: React.FC<VoiceDetectorModalProps> = (
  props,
) => {
  const { t } = useTranslation()
  const { modalRef, setText, onFinishRecord } = props
  const { colors } = useTheme()
  const waveRef = React.useRef<WaveFormFunc>(null)
  const [isRecording, setIsRecording] = React.useState(false)
  Voice.onSpeechStart = () => {
    waveRef.current?.play()
  }
  Voice.onSpeechEnd = () => {
    setIsRecording(false)
    waveRef.current?.pause()
  }
  Voice.onSpeechResults = (result) => {
    onFinishRecord?.()
    setText(result.value![0])
    console.log(result.value![0])
  }
  Voice.onSpeechError = (error) => {
    setIsRecording(false)
    console.log(error)
    handleErrorMessage('Record error', t('we_cant_catch_your_voice'))
  }

  const handleStartRecord = async () => {
    try {
      await Voice.start('en-US')
      setIsRecording(true)
    } catch (e) {
      console.log('Record err')
      setIsRecording(false)
    }
  }
  const handleStopRecord = async () => {
    try {
      console.log('stop')
      setIsRecording(false)
      await Voice.stop()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Modal position={'center'} ref={modalRef}>
      <Block
        height={300}
        backgroundColor={'white'}
        marginHorizontal={20}
        radius={20}
        alignCenter
        padding={20}
      >
        <Block flex>
          <Text size={'h2'} fontFamily={'bold'}>
            {t('listen_your_voice')}
          </Text>
          <Block flex justifyEnd alignCenter paddingBottom={30}>
            <WaveForm waveRef={waveRef} />
          </Block>
        </Block>

        <Pressable onPress={isRecording ? handleStopRecord : handleStartRecord}>
          <Block
            width={50}
            height={50}
            backgroundColor={isRecording ? colors.red : colors.orangePrimary}
            justifyCenter
            alignCenter
            radius={25}
          >
            {isRecording ? (
              <PauseIcon width={20} height={20} fill={colors.white} />
            ) : (
              <PlayIcon width={50} height={50} fill={colors.white} />
            )}
          </Block>
        </Pressable>
      </Block>
    </Modal>
  )
}
