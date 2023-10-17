import React, { useEffect, useState } from 'react'
import { Text } from '@components'
import { useTranslation } from 'react-i18next'
import { resendVerifyCode } from '@redux/actions/auth.action'
import { useAppDispatch } from '@hooks'

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
  }
  return countdown === 0 ? (
    <Text
      onPress={onReceiveAgain}
      color="orangeDark"
      fontFamily="bold"
      size="h4"
    >
      {t('send_again')}
    </Text>
  ) : (
    <Text color="orangeDark" fontFamily="bold" size="h4">
      {t('time', { countdown })}
    </Text>
  )
}

export default SendAgain
