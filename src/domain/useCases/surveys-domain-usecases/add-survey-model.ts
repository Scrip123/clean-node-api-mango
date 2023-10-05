import { IAddSurveyInputModelDTO } from '@domain/models/ISurvey-model-domain'

export interface IAddSurvey {
  add: (data: IAddSurveyInputModelDTO) => Promise<void>
}
