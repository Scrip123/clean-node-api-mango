import { IAddSurveyInputModelDTO } from '@domain/useCases/surveys-domain-usecases/add-survey-model'

export interface IAddSurveyRepository {
  add: (data: IAddSurveyInputModelDTO) => Promise<void>
}
