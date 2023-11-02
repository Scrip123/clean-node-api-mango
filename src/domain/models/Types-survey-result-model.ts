export type TypeSurveyResultOutputParams = {
  id: string
  surveyId: string
  accountId: string
  answer: string
  createdAt: Date
}
export type TypeSurveyResultInputParams = Omit<TypeSurveyResultOutputParams, 'id'>
