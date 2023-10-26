import { Difficulty } from '@components'

export interface WordAttachment {
  image?: string
  sound?: string
}

export interface FlipVocabularyProps {
  english: string
  vietnamese: string
  pronunciation: string
  exampleEnglish: string
  exampleVietnamese: string
  attachment?: WordAttachment
  difficulty?: Difficulty
  onPressSoundProgress?: () => void
  onPressBookmark?: () => void
  onPressMoreExample?: () => void
}
