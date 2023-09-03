export interface IAddSurveyInputModelDTO {
  quation: string
  answers: ISurveyAnswer[]
}
export interface ISurveyAnswer {
  image: string
  answer: string
}
export interface IAddSurvey {
  add: (data: IAddSurveyInputModelDTO) => Promise<void>
}
