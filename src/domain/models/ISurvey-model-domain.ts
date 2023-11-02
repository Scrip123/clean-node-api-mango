export interface ISurveyAnswer {
  image?: string
  answer: string
}
export type TypeSurveyInputParams = {
  question: string
  answers: ISurveyAnswer[]
  createdAt: Date
}

export type TypeSurveyOutputParams = {
  id: string
  question: string
  answers: ISurveyAnswer[]
  createdAt: Date
}
