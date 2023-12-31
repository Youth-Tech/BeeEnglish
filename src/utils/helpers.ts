import { t } from 'i18next'
import { Dimensions, Platform, NativeModules } from 'react-native'

export const formatDate = (_day: Date) => {
  const newDate = new Date(_day)
  const day = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()
  const hour = newDate.getHours()
  const minutes = newDate.getMinutes()

  let dayString = day.toString()
  let monthString = month.toString()
  let yearString = year.toString()
  let hourString = hour.toString()
  let minutesString = minutes.toString()

  if (day < 10) {
    dayString = '0' + dayString
  }
  if (month < 10) {
    monthString = '0' + monthString
  }
  if (hour < 10) {
    hourString = '0' + hourString
  }
  if (minutes < 10) {
    minutesString = '0' + minutesString
  }

  return (
    hourString +
    ':' +
    minutesString +
    ' - ' +
    dayString +
    '/' +
    monthString +
    '/' +
    yearString
  )
}

export const { width: widthScreen, height: heightScreen } =
  Dimensions.get('screen')
export const { width: widthWindow, height: heightWindow } =
  Dimensions.get('window')

export const getShortTitle = (title: string, maxWidth: number) => {
  if (title.length <= maxWidth) {
    return title
  }
  const titleArr = title.split('')

  let shortTitle = ''
  for (let i = 0; i < titleArr.length; i++) {
    if (i > maxWidth) break
    shortTitle += titleArr[i]
  }
  return shortTitle + '...'
}

export function keys(obj: any): string[] {
  if (typeof obj === 'object') {
    return Object.keys(obj)
  } else {
    return []
  }
}

export function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export const supportedLanguages = ['en', 'vi'] as const

export type LangType = (typeof supportedLanguages)[number]

export function getDeviceLanguage(): LangType {
  const locale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier

  const [lowerCaseLocale] = locale.split('_')

  if (supportedLanguages.includes(lowerCaseLocale)) {
    return lowerCaseLocale
  }
  return 'vi' as LangType
}

export function timeSince(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' '.concat(t('year').concat(' ' + t('ago')))
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' '.concat(t('month').concat(' ' + t('ago')))
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' '.concat(t('day').concat(' ' + t('ago')))
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' '.concat(t('hours').concat(' ' + t('ago')))
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' '.concat(t('minute').concat(' ' + t('ago')))
  }
  return (
    (Math.floor(seconds) >= 0 ? Math.floor(seconds) : 0) +
    ' '.concat(t('second').concat(' ' + t('ago')))
  )
}
