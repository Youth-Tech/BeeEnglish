import { Quiz } from '@services'
import { QuestionType } from '@screens/GrammarScreen/constants'

export const parseQuizDataToQuestion = (quizzes: Quiz[]): Question[] => {
  return quizzes.map((item) => {
    return {
      id: item._id,
      answer: item.answer,
      question: item.question,
      type: QuestionType[item.type],
      attachment: item.attachments,
      wordImage: item.attachments?.[0]?.src || '',
      correctAnswer: item.correctAnswer,
    }
  })
}