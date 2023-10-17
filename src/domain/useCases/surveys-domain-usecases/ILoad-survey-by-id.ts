import { TypesSurveyOutputModelDTO } from '@domain/models/ISurvey-model-domain'

export interface ILoadSurveyByIdDomain {
  loadSurveyById: (id: string) => Promise<TypesSurveyOutputModelDTO>
}
