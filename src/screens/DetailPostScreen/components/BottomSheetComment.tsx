import React, { useState } from 'react'
import { Icon } from '@assets'
import { useStyles } from '../styles'
import { Block, Text, TextInput } from '@components'
import { useAppDispatch } from '@hooks'
import { useTranslation } from 'react-i18next'
import { changeShowComment } from '@redux/reducers'
import { DataComment } from '@screens/DetailPostScreen/const'
import CommentComponent from '@components/common/CommentComponent'
import {Keyboard, TouchableOpacity} from 'react-native'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import SendMessenger from '@assets/icons/SendMessenger'
import { normalize, useTheme } from '@themes'

const BottomSheetComment: React.FC = () => {
  const { colors } = useTheme()
  const styles = useStyles()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [valueComment, setValueComment] = useState('')
  const onCloseComment = () => {
    dispatch(changeShowComment(false))
  }
  const onPressButtonSend = () => {
    setValueComment('');
    Keyboard.dismiss();
  }
  return (
    <Block style={styles.boxComment}>
      <Block style={styles.headerComment}>
        <TouchableOpacity style={styles.buttonCancel} onPress={onCloseComment}>
          <Icon state={'Cancel'} />
        </TouchableOpacity>
        <Text size={'h4'} fontFamily={'bold'}>
          {t('comment')}
        </Text>
      </Block>
      <BottomSheetScrollView
        style={{ marginHorizontal: 20, marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {DataComment.map((item, index) => (
          <CommentComponent level={1} comment={item} key={index} />
        ))}
      </BottomSheetScrollView>
      <Block style={styles.inputBoxSend}>
        <TextInput
          placeholder={'Viết bình luận'}
          containerStyle={{
            flex: 1,
          }}
          value={valueComment}
          inputContainerStyle={{
            borderRadius: normalize.m(30),
            height: normalize.m(35),
            borderColor: colors.greyDark,
          }}
          onChangeText={setValueComment}
        />
        <TouchableOpacity onPress={onPressButtonSend}>
          <SendMessenger />
        </TouchableOpacity>
      </Block>
    </Block>
  )
}

export default BottomSheetComment
