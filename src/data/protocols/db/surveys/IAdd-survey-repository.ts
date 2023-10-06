import { ISurveyInputModelDTO } from '@domain/models/ISurvey-model-domain'

export interface IAddSurveyRepository {
  add: (data: ISurveyInputModelDTO) => Promise<void>
}
