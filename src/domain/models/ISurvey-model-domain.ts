export interface ISurveyAnswer {
  image?: string
  answer: string
}
export type TypesSurveyInputModelDTO = {
  question: string
  answers: ISurveyAnswer[]
  createdAt: Date
}

export type TypesSurveyOutputModelDTO = {
  id: string
  question: string
  answers: ISurveyAnswer[]
  createdAt: Date
}
