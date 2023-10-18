export type TypeSurveyResultOutputModelDTO = {
  id: string
  surveyId: string
  accountId: string
  answer: string
  createdAt: Date
}
export type TypeSurveyResultInputModelDTO = Omit<TypeSurveyResultOutputModelDTO, 'id'>
