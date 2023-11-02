import { TypeSurveyOutputParams } from '@domain/models/ISurvey-model-domain'

export interface ILoadSurveyUseCaseDomain {
  loadSurveys: () => Promise<TypeSurveyOutputParams[]>
}
