import { TypeSurveyResultInputModelDTO, TypeSurveyResultOutputModelDTO } from '@domain/models/Types-survey-result-model'

export interface ISaveSurveyResultRepository {
  save: (data: TypeSurveyResultInputModelDTO) => Promise<TypeSurveyResultOutputModelDTO>
}
