interface Question {
  id: string
  question: string
  wordImage?: string
  answer: string | Answer[] | string[]
  correctAnswer?: string
  type: import('./constants').QuestionType
  attachment?: Attachment[]
}

interface Answer {
  option: string | Attachment
  isValid: boolean
}

interface ResultType {
  questionId: string
  result: 'correct' | 'incorrect'
}

interface ModalStatus {
  show: boolean
  status: 'correct' | 'incorrect' | 'no_status'
}

interface CurrentQuestion {
  index: number
  data: Question | null
}
