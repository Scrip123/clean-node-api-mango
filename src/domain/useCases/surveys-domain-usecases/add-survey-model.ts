export interface IAddSurveyInputModelDTO {
  question: string
  answers: ISurveyAnswer[]
  createdAt: Date
}
export interface ISurveyAnswer {
  image?: string
  answer: string
}
export interface IAddSurvey {
  add: (data: IAddSurveyInputModelDTO) => Promise<void>
}
