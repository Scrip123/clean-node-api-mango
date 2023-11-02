import { TypeSurveyInputParams } from '@domain/models/ISurvey-model-domain'

export interface IAddSurveyRepository {
  add: (data: TypeSurveyInputParams) => Promise<void>
}
