export interface ISurveyAnswer {
  image?: string
  answer: string
}
export interface IAddSurveyInputModelDTO {
  question: string
  answers: ISurveyAnswer[]
  createdAt: Date
}

export interface IAddSurveyOutputModelDTO {
  id: string
  question: string
  answers: ISurveyAnswer[]
  createdAt: Date
}
