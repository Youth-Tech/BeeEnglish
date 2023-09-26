import { useState } from 'react'
interface useCountDownProps {
  initialHours?: number
  initialMinutes?: number
  initialSeconds?: number
}
export const useCountdown = (props: useCountDownProps) => {
  const { initialHours = 0, initialMinutes = 0, initialSeconds = 0 } = props
  const [time, setTime] = useState({
    h: initialHours,
    m: initialMinutes,
    s: initialSeconds,
  })

  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [isStart, setIsStart] = useState<boolean>(false)

  const startTimer = () => {
    if (isStart) return

    let myInterval = setInterval(() => {
      setTime((preTime) => {
        const updatedTime = { ...preTime }
        if (preTime.s > 0) {
          updatedTime.s--
        }

        if (preTime.s === 0) {
          if (preTime.h === 0 && preTime.m === 0) {
            clearInterval(myInterval)
          } else if (preTime.m > 0) {
            updatedTime.m--
            updatedTime.s = 59
          } else if (updatedTime.h > 0) {
            updatedTime.h--
            updatedTime.m = 59
            updatedTime.s = 59
          }
        }

        return updatedTime
      })
    }, 1000)
    setTimer(myInterval)
    setIsStart(true)
  }

  const pauseTimer = () => {
    clearInterval(timer)
    setIsStart(false)
  }

  const cancelTimer = () => {
    clearInterval(timer)
    setIsStart(false)
    setTime({
      h: initialHours,
      m: initialMinutes,
      s: initialSeconds,
    })
  }
  const resultTime = {
    hours:
      time.h < 10 && time.h !== 0 ? `0${time.h}:` : time.h >= 10 && `${time.h}`,
    minutes: time.m < 10 ? `0${time.m}` : time.m + '',
    seconds: time.s < 10 ? `0${time.s}` : time.s + '',
  }
  return { resultTime, startTimer, pauseTimer, cancelTimer }
}
