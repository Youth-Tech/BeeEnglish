import { Quiz } from '@services'
import { QuestionType } from '@screens/GrammarScreen/constants'

export const parseQuizDataToQuestion = (quizzes: Quiz[]): Question[] => {
  return quizzes.map((item) => {
    return {
      id: item._id,
      answer: item.answer,
      grammar: item.grammar,
      question: item.question,
      attachment: item.attachments,
      type: QuestionType[item.type],
      correctAnswer: item.correctAnswer,
      wordImage: item.attachments?.[0]?.src || '',
    }
  })
}
