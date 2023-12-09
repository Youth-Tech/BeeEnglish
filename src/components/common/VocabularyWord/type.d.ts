import React from 'react'
import { FlipVocabularyProps } from '@components/common/VocabularyWord/components/type'

export interface VocabularyWordProps {
  data: FlipVocabularyProps
  setData: React.Dispatch<React.SetStateAction<FlipVocabularyProps>>
  onPressSoundProgress?: () => void
  onPressBookmark?: () => void
  onPressMoreExample?: () => void
}

export type WordDifficulties = {
  label: string
  value: string | number
  color: string
}
export interface VocabularyFunc {
  onLeftTriggerAnimation: () => void
  onRightTriggerAnimation: () => void
}
