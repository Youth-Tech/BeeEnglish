import React from 'react'
import {
  Block,
  Container,
  Modal,
  Progress,
  ShadowButton,
  Text,
} from '@components'
import { Icon } from '@assets'
import { colors, useTheme } from '@themes'
import FlipVocabulary from '@screens/VocabScreen/components/FlipVocabulary'
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { ModalFunction } from '@components/bases/Modal/type'

interface VocabScreenProps {}
export const VocabScreen: React.FC<VocabScreenProps> = (props) => {
  const { colors, normalize } = useTheme()
  const questionModalRef = React.useRef<ModalFunction>(null)
  const selectModalRef = React.useRef<ModalFunction>(null)
  const handleOpenQuestionModal = React.useCallback(() => {
    questionModalRef.current?.openModal()
  }, [])
  const handleSelectDifficulty = () => {
    selectModalRef.current?.openModal()
  }
  return (
    <Container>
      <Block flex>
        <Block paddingTop={15} alignCenter>
          <Block
            row
            justifyCenter
            alignCenter
            space={'between'}
            paddingHorizontal={14}
          >
            <Icon state={'Delete'} />
            <Progress
              totalSteps={100}
              step={50}
              progressContainerStyles={{
                width: normalize.h(290),
              }}
            />
          </Block>
          <Block marginTop={15}>
            <FlipVocabulary />
          </Block>
        </Block>
        <Block
          row
          space={'between'}
          marginTop={20}
          paddingLeft={20}
          paddingRight={23}
          alignCenter
          justifyCenter
        >
          <Text size={'h3'} fontFamily={'bold'}>
            Cấp độ từ
          </Text>
          <Icon
            state={'QuestionCircle'}
            style={{ marginBottom: normalize.v(3) }}
            onPress={handleOpenQuestionModal}
          />
        </Block>
        <Pressable onPress={handleSelectDifficulty}>
          <Block
            shadow
            radius={5}
            alignCenter
            marginTop={14}
            paddingVertical={10}
            marginHorizontal={20}
            backgroundColor={colors.white}
          >
            <Text size={'h3'} fontFamily={'bold'}>
              Khó
            </Text>
          </Block>
        </Pressable>
      </Block>
      <Block
        row
        marginBottom={30}
        paddingHorizontal={20}
        justifyCenter
        space={'between'}
      >
        <ShadowButton
          buttonWidth={150}
          buttonHeight={40}
          buttonRadius={10}
          shadowHeight={8}
          buttonBorderSize={1}
          buttonColor={colors.white}
          buttonBorderColor={colors.greyLight}
          shadowButtonColor={colors.greyLight}
        >
          <Text size={'h2'} fontFamily={'semiBold'}>
            Trước
          </Text>
        </ShadowButton>
        <ShadowButton
          buttonWidth={150}
          buttonHeight={40}
          buttonRadius={10}
          shadowHeight={8}
          buttonColor={colors.orangeLight}
          buttonBorderColor={colors.orangePrimary}
          shadowButtonColor={colors.orangePrimary}
        >
          <Text size={'h2'} fontFamily={'semiBold'}>
            Sau
          </Text>
        </ShadowButton>
      </Block>
      <Modal ref={questionModalRef} position={'center'} animationType={'fade'}>
        <Block
          height={252}
          radius={8}
          marginHorizontal={20}
          backgroundColor={colors.orangeSecondary}
        >
          <Text
            size={'h1'}
            fontFamily={'bold'}
            color={colors.white}
            paddingTop={15}
            paddingBottom={11}
            alignSelf={'center'}
          >
            Cấp độ từ
          </Text>
          <Block
            flex
            radius={8}
            margin={5}
            paddingTop={29}
            paddingHorizontal={7}
            backgroundColor={'white'}
          >
            <Text size={'h3'} fontFamily={'bold'}>
              Bạn hãy chọn cấp độ từ phù hợp với trình độ của bạn.
            </Text>
            <Block row marginTop={15}>
              <Text size={'h3'} fontFamily={'bold'}>
                Khó:
              </Text>
              <Text marginLeft={3} size={'h3'} fontFamily={'regular'}>
                ôn lại sau 1 phút
              </Text>
            </Block>
            <Block row marginTop={8}>
              <Text size={'h3'} fontFamily={'bold'}>
                Bình thường:
              </Text>
              <Text marginLeft={3} size={'h3'} fontFamily={'regular'}>
                ôn lại sau 1 phút
              </Text>
            </Block>
            <Block row marginTop={8}>
              <Text size={'h3'} fontFamily={'bold'}>
                Đơn giản:
              </Text>
              <Text marginLeft={3} size={'h3'} fontFamily={'regular'}>
                ôn lại sau 1 phút
              </Text>
            </Block>
            <Block row marginTop={8}>
              <Text size={'h3'} fontFamily={'bold'}>
                Dễ:
              </Text>
              <Text marginLeft={3} size={'h3'} fontFamily={'regular'}>
                ôn lại sau 1 phút
              </Text>
            </Block>
          </Block>
        </Block>
      </Modal>
      <Modal ref={selectModalRef} position={'bottom'}>
        <Block paddingHorizontal={20}>
          <Block radius={10} overflow={'hidden'}>
            <TouchableOpacity style={styles.optionButton}>
              <Text
                size={'h2'}
                fontFamily={'semiBold'}
                color={colors.bluePrimary}
                paddingVertical={15}
              >
                Dễ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text
                size={'h2'}
                fontFamily={'semiBold'}
                color={colors.bluePrimary}
                paddingVertical={15}
              >
                Đơn giản
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text
                size={'h2'}
                fontFamily={'semiBold'}
                color={colors.bluePrimary}
                paddingVertical={15}
              >
                Bình thường
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionButton]}>
              <Text
                size={'h2'}
                fontFamily={'semiBold'}
                color={colors.bluePrimary}
                paddingVertical={15}
              >
                Khó
              </Text>
            </TouchableOpacity>
          </Block>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: normalize.m(8),
              marginBottom: normalize.v(30),
              marginTop: normalize.v(15),
            }}
          >
            <Text
              size={'h2'}
              fontFamily={'semiBold'}
              color={colors.bluePrimary}
              paddingVertical={15}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </Block>
      </Modal>
    </Container>
  )
}

const styles = StyleSheet.create({
  optionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
})
