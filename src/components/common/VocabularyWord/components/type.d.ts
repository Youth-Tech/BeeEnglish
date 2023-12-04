import { Difficulty } from '@components'
import { Word } from '@services'

// export interface WordAttachment {
//   image?: string
//   sound?: string
// }

export interface FlipVocabularyProps extends Word {
  difficulty?: Difficulty
  setData?: React.Dispatch<React.SetStateAction<FlipVocabularyProps>>
  isBookmarked?: boolean
  onPressBookmark?: () => void
  onPressMoreExample?: () => void
}
