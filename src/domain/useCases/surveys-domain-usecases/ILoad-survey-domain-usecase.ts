import { IAddSurveyOutputModelDTO } from '@domain/models/ISurvey-model-domain'

export interface ILoadSurveyUseCaseDomain {
  loadSurveys: () => Promise<IAddSurveyOutputModelDTO[]>
}
