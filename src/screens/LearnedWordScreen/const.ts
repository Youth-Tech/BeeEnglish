export interface dataProps {
  id: number
  word: string
  wordType: string
  translation: string
  difficulty: 'easy' | 'normal' | 'hard'
}
export const data: dataProps[] = [
  {
    id: 1,
    word: 'Chicken',
    wordType: 'noun',
    translation: 'Con gà',
    difficulty: 'easy',
  },
  {
    id: 2,
    word: 'Dog',
    wordType: 'noun',
    translation: 'Con chó',
    difficulty: 'normal',
  },
  {
    id: 3,
    word: 'Difference',
    wordType: 'noun',
    translation: 'Sự khác biệt',
    difficulty: 'hard',
  },
  {
    id: 4,
    word: 'Hello',
    wordType: 'noun',
    translation: 'Sự khác biệt',
    difficulty: 'hard',
  },
  {
    id: 5,
    word: 'Hello',
    wordType: 'noun',
    translation: 'Sự khác biệt',
    difficulty: 'hard',
  },
  {
    id: 6,
    word: 'Hello',
    wordType: 'noun',
    translation: 'Sự khác biệt',
    difficulty: 'hard',
  },
  {
    id: 7,
    word: 'Hello',
    wordType: 'noun',
    translation: 'Sự khác biệt',
    difficulty: 'hard',
  },
]
