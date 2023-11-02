import { TypeSurveyOutputParams } from '@domain/models/ISurvey-model-domain'

export interface ILoadSurveyByIdRepository {
  loadById: (id: string) => Promise<TypeSurveyOutputParams>
}
