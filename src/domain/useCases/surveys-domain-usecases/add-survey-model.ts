import { TypeSurveyInputParams } from '@domain/models/ISurvey-model-domain'

export interface IAddSurvey {
  add: (data: TypeSurveyInputParams) => Promise<void>
}
