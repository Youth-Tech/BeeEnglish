import { t } from 'i18next'

/**
 *
 * @param current: `Date` This is day that you want to handle
 * @returns `Array<Date>` Array contain all day of week
 *
 * @example
 *  getDatesOfWeek(new Date(2023, 08, 29))
 *  result = [
 *      0: Mon Sep 25 2023 00:00:00 GMT+0700 (Indochina Time) {}
 *      1: Tue Sep 26 2023 00:00:00 GMT+0700 (Indochina Time) {}
 *      2: Wed Sep 27 2023 00:00:00 GMT+0700 (Indochina Time) {}
 *      3: Thu Sep 28 2023 00:00:00 GMT+0700 (Indochina Time) {}
 *      4: Fri Sep 29 2023 00:00:00 GMT+0700 (Indochina Time) {}
 *      5: Sat Sep 30 2023 00:00:00 GMT+0700 (Indochina Time) {}
 *      6: Sun Oct 01 2023 00:00:00 GMT+0700 (Indochina Time) {}
 * ]
 */
export const getDatesOfWeek = (current: Date) => {
  var week = new Array()
  // Starting Monday not Sunday
  current.setDate(current.getDate() - current.getDay() + 1)
  for (var i = 0; i < 7; i++) {
    week.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  return week
}

/**
 *
 * @param current: `Date` this is the day that you want to handle.
 * @param amount: `number` this is how many days you want to add to the `current` variable.
 * @returns `Date`
 */
export const addDay = (current: Date, amount: number) => {
  return current.setDate(current.getDate() + amount)
}

/**
 *
 * @param date: `Date` this is the day that you want to handle.
 * @param locale: `string` a string with a BCP 47 language tag or an array of such strings. You can use any of the available locales, e.g. es-MX for Mexico or en-CA for Canada. If you need more information about this parameter, check out the MDN docs
 * @see MDN docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation.
 *
 * @param nameOptions: `long` | `short` | `narrow` option format for day name
 * @example
 *      `long`  -> (Monday)
 *      `short` -> (Mon)
 *      `narrow`-> (M)
 * @returns `string`
 */
export const getDateName = (
  date: Date,
  locale: string = 'vi-VN',
  nameOptions: 'long' | 'short' | 'narrow' = 'short',
) => {
  return date.toLocaleDateString(locale, { weekday: nameOptions })
}

export const getDaySession = () => {
  const currentHours = new Date().getHours() + 1
  if (currentHours >= 0 && currentHours <= 12) {
    return t('good_morning')
  } else if (currentHours >= 13 && currentHours <= 18) {
    return t('good_afternoon')
  } else {
    return t('good_evening')
  }
}
