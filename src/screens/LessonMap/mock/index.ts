import { ItemLessonProps } from '../components'

export const MOCK_DATA: ItemLessonProps[] = [
  {
    id: 'id1',
    lessonTitle: 'Hello!',
    lessonDescription: 'Learn greetings for meeting people',
    thumbnail:
      'https://kenh14cdn.com/thumb_w/660/2019/12/26/garlicheaven79728792465586074371474299227813850164136n-1577341862556288584887.jpg',
    status: 'complete',
    chapterStatus: 'lock',
  },
  {
    id: 'id2',
    lessonTitle: 'Introducing yourself',
    lessonDescription: 'Say your name',
    thumbnail:
      'https://kenh14cdn.com/thumb_w/660/2019/12/26/garlicheaven79728792465586074371474299227813850164136n-1577341862556288584887.jpg',
    status: 'current',
    chapterStatus: 'lock',
  },
  {
    id: 'id3',
    lessonTitle: 'Saying how you are',
    lessonDescription: 'Talk about how you feel',
    thumbnail:
      'https://kenh14cdn.com/thumb_w/660/2019/12/26/garlicheaven79728792465586074371474299227813850164136n-1577341862556288584887.jpg',
    status: 'lock',
    chapterStatus: 'lock',
  },
  {
    id: 'id4',
    lessonTitle: 'Developing fluency',
    lessonDescription: 'Introduce yourself',
    thumbnail:
      'https://kenh14cdn.com/thumb_w/660/2019/12/26/garlicheaven79728792465586074371474299227813850164136n-1577341862556288584887.jpg',
    status: 'lock',
    chapterStatus: 'lock',
  },
  {
    id: 'id5',
    lessonTitle: 'Check point Introduce',
    lessonDescription: 'Test your skills to access the next chapter',
    thumbnail:
      'https://kenh14cdn.com/thumb_w/660/2019/12/26/garlicheaven79728792465586074371474299227813850164136n-1577341862556288584887.jpg',
    status: 'lock',
    chapterStatus: 'lock',
    type: 'checkpoint',
  },
]

export const MOCK_DATA_LESSON = [
  {
    lessonComplete: 1,
    data: MOCK_DATA,
    title: 'Introduce my self',
    status: 'unlock',
    index: 0,
  },
  {
    lessonComplete: 1,
    data: MOCK_DATA,
    title: 'Introduce my self 2',
    status: 'lock',
    index: 1,
  },
  {
    lessonComplete: 1,
    data: MOCK_DATA,
    title: 'Introduce my self 3',
    status: 'lock',
    index: 2,
  },
  {
    lessonComplete: 1,
    data: MOCK_DATA,
    title: 'Introduce my self 4',
    status: 'lock',
    index: 3,
  },
]
