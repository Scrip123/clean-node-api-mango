import { TypesSurveyOutputModelDTO } from '@domain/models/ISurvey-model-domain'

export interface ILoadSurveyByIdRepository {
  loadById: (id: string) => Promise<TypesSurveyOutputModelDTO>
}
