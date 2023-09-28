import { StyleSheet ,} from 'react-native'
import React from 'react'
import { Block, Container, Image, StatusBar } from '@components'
import { images } from '../../assets/images/index'


export const SplashScreen = () => {
  return (
    <Container>
      <StatusBar statusColor='white'></StatusBar>
      <Block justifyCenter alignCenter backgroundColor='white' flex >
        <Image source={images.BeeEnglish} width={280} height={62} resizeMode='contain'/>
       
      </Block>
    </Container>
  )
}

const styles = StyleSheet.create({
  
})
