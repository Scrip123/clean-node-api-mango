import { TypeSurveyResultInputParams, TypeSurveyResultOutputParams } from '@domain/models/Types-survey-result-model'

export const mockSurveyResultInputParams = (): TypeSurveyResultInputParams => ({
  surveyId: 'any_survey_id',
  accountId: 'user_id',
  answer: 'any_answer',
  createdAt: new Date()
})

export const mockSurveyResultOutputParams = (): TypeSurveyResultOutputParams => ({
  id: 'any_id',
  surveyId: 'any_survey_id',
  accountId: 'user_id',
  answer: 'any_answer',
  createdAt: new Date()
})
