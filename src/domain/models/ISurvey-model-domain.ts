export interface ISurveyAnswer {
  image?: string
  answer: string
}
export interface ISurveyInputModelDTO {
  question: string
  answers: ISurveyAnswer[]
  createdAt: Date
}

export interface ISurveyOutputModelDTO {
  id: string
  question: string
  answers: ISurveyAnswer[]
  createdAt: Date
}
