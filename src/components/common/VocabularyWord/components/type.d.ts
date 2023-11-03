import { Difficulty } from '@components'

export interface WordAttachment {
  image?: string
  sound?: string
}

export interface FlipVocabularyProps {
  id: string
  english: string
  vietnamese: string
  pronunciation: string
  exampleEnglish: string
  exampleVietnamese: string
  attachments?: WordAttachment
  difficulty?: Difficulty
  setData?: React.Dispatch<React.SetStateAction<FlipVocabularyProps>>
  isBookmarked?: boolean
  onPressSoundProgress?: () => void
  onPressBookmark?: () => void
  onPressMoreExample?: () => void
}
