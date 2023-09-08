import { IAddSurveyInputModelDTO } from '@domain/useCases/add-survey-model'

export interface IAddSurveyRepository {
  add: (data: IAddSurveyInputModelDTO) => Promise<void>
}
