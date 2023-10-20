import { TypeSurveyResultInputModelDTO, TypeSurveyResultOutputModelDTO } from '@domain/models/Types-survey-result-model'

export interface ISaveSurveyResultDomain {
  save: (data: TypeSurveyResultInputModelDTO) => Promise<TypeSurveyResultOutputModelDTO>
}
