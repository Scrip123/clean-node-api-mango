import { ISurveyInputModelDTO } from '@domain/models/ISurvey-model-domain'

export interface IAddSurvey {
  add: (data: ISurveyInputModelDTO) => Promise<void>
}
