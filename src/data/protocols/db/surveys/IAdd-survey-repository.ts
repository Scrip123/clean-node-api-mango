import { TypesSurveyInputModelDTO } from '@domain/models/ISurvey-model-domain'

export interface IAddSurveyRepository {
  add: (data: TypesSurveyInputModelDTO) => Promise<void>
}
