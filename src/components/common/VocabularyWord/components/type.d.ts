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
  onPressSoundProgress?: () => void
  onPressBookmark?: () => void
  onPressMoreExample?: () => void
}
