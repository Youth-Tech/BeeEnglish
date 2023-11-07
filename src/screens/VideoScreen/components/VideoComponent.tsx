import React from 'react'
import { Block, Text } from '@components'
import Video from 'react-native-video'
import { Dimensions, StyleSheet, View } from 'react-native'
import { widthScreen, widthWindow } from '@utils/helpers'

export interface VideoComponentProps {}
const VideoComponent: React.FC<VideoComponentProps> = (props) => {
  const videoRef = React.useRef(null)
  const onBuffer = () => {
    console.log('Buffered')
  }
  const onError = (e) => {
    console.log('Error' + JSON.stringify(e))
  }
  return (
    <View style={{ width: widthWindow }}>
      <Video
        controls={true}
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        }}
        ref={videoRef}
        onBuffer={onBuffer}
        onError={onError}
        style={[styles.video]}
        repeat={true}
        resizeMode={'cover'}
        fullscreen={true}
      />
    </View>
  )
}
export default VideoComponent
const styles = StyleSheet.create({
  video: {
    width: widthScreen,
    aspectRatio: 1920 / 1080,
  },
})
