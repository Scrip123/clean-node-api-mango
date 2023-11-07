import { TypeSurveyInputParams, TypeSurveyOutputParams } from '@domain/models/ISurvey-model-domain'

export const mockSurveyInputParams = (): TypeSurveyInputParams => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_question'
  }],
  createdAt: new Date()
})

export const mockSurveyOutputParams = (): TypeSurveyOutputParams => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_question'
  }],
  createdAt: new Date()
})
