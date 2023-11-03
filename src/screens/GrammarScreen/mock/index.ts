import { QuestionType } from '../constants'

export const QUESTION: Question[] = [
  {
    id: '1',
    question: 'Tôi làm việc ở đây 1',
    answer: 'I go to school by bike1',
    type: QuestionType.WORD_CHOICE,
  },
  {
    id: '4',
    question: 'I drink coffee_______.',
    answer: [
      {
        isValid: false,
        option: 'three times for a days',
      },
      {
        isValid: false,
        option: 'three time for a day',
      },
      {
        isValid: true,
        option: 'three times for a day',
      },
      {
        isValid: false,
        option: 'three time for a days',
      },
    ],
    type: QuestionType.OPTION,
  },
  {
    id: '4',
    question: 'I drink soda_______.',
    answer: [
      {
        isValid: false,
        option: 'three times for a days',
      },
      {
        isValid: false,
        option: 'three time for a day',
      },
      {
        isValid: true,
        option: 'three times for a day',
      },
      {
        isValid: false,
        option: 'three time for a days',
      },
    ],
    type: QuestionType.OPTION,
  },
  {
    id: '2',
    question: 'Tôi làm việc ở đây 2',
    answer: 'I go to school by bike2',
    type: QuestionType.WORD_CHOICE,
  },
  {
    id: '3',
    question: 'Tôi làm việc ở đây 3',
    answer: 'I go to school by bike3',
    type: QuestionType.WORD_CHOICE,
  },
  {
    id: '5',
    question: 'Dog',
    answer: [
      {
        option: 'https://cdn-icons-png.flaticon.com/512/2002/2002611.png',
        isValid: false,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/1993/1993713.png',
        isValid: false,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/1998/1998627.png',
        isValid: true,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/437/437562.png',
        isValid: false,
      },
    ],
    type: QuestionType.VOCAB_CHOICE,
  },

  {
    id: '6',
    question: 'Cat',
    answer: [
      {
        option: 'https://cdn-icons-png.flaticon.com/512/2002/2002611.png',
        isValid: false,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/1993/1993713.png',
        isValid: false,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/1998/1998627.png',
        isValid: false,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/437/437562.png',
        isValid: true,
      },
    ],
    type: QuestionType.VOCAB_CHOICE,
  },
  {
    id: '7',
    question: 'Chicken',
    answer: [
      {
        option: 'https://cdn-icons-png.flaticon.com/512/2002/2002611.png',
        isValid: true,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/1993/1993713.png',
        isValid: false,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/1998/1998627.png',
        isValid: false,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/437/437562.png',
        isValid: false,
      },
    ],
    type: QuestionType.VOCAB_CHOICE,
  },
  {
    id: '8',
    question: 'Chicken',
    wordImage:
      'https://static-00.iconduck.com/assets.00/chicken-icon-2048x2012-tfn7yvk0.png',
    answer: [
      {
        option: 'Con mèo',
        isValid: false,
      },
      {
        option: 'Con gà',
        isValid: true,
      },
    ],
    type: QuestionType.VOCAB_OPTION,
  },
  {
    id: '9',
    question: 'Cat',
    wordImage:
      'https://static.vecteezy.com/system/resources/previews/013/078/569/original/illustration-of-cute-colored-cat-cartoon-cat-image-in-format-suitable-for-children-s-book-design-elements-introduction-of-cats-to-children-books-or-posters-about-animal-free-png.png',
    answer: [
      {
        option: 'Con mèo',
        isValid: true,
      },
      {
        option: 'Con gà',
        isValid: false,
      },
    ],
    type: QuestionType.VOCAB_OPTION,
  },
]
