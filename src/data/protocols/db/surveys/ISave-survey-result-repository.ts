import { TypeSurveyResultInputParams, TypeSurveyResultOutputParams } from '@domain/models/Types-survey-result-model'

export interface ISaveSurveyResultRepository {
  save: (data: TypeSurveyResultInputParams) => Promise<TypeSurveyResultOutputParams>
}
