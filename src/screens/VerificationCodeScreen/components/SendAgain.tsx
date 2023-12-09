import React, { useEffect, useState } from 'react'
import { Text } from '@components'
import { useTranslation } from 'react-i18next'
import { resendVerifyCode } from '@redux/actions/auth.action'
import { useAppDispatch } from '@hooks'
import { TouchableOpacity } from 'react-native'

const SendAgain = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [countdown, setCountdown] = useState(90)
  let intervalId: NodeJS.Timeout
  useEffect(() => {
    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [countdown])
  const onReceiveAgain = () => {
    dispatch(resendVerifyCode())
    setCountdown(90)
  }
  return (
      <TouchableOpacity
        onPress={onReceiveAgain}
        disabled={!(countdown === 0)}
      >
        <Text color="orangeDark" fontFamily="bold" size="h4">
          {countdown === 0 ? t('send_again') : t('time', { countdown })}
        </Text>
      </TouchableOpacity>
  )
}

export default SendAgain
