import { TypeSurveyOutputParams } from '@domain/models/ISurvey-model-domain'

export interface ILoadSurveysRepository {
  loadAllSurveys: () => Promise<TypeSurveyOutputParams[]>
}
