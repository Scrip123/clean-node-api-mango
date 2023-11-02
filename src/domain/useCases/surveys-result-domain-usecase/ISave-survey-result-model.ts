import { TypeSurveyResultInputParams, TypeSurveyResultOutputParams } from '@domain/models/Types-survey-result-model'

export interface ISaveSurveyResultDomain {
  save: (data: TypeSurveyResultInputParams) => Promise<TypeSurveyResultOutputParams>
}
