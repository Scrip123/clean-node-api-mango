import { TypesSurveyInputModelDTO } from '@domain/models/ISurvey-model-domain'

export interface IAddSurvey {
  add: (data: TypesSurveyInputModelDTO) => Promise<void>
}
