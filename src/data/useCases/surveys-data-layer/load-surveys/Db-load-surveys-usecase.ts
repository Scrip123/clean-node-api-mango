import { ILoadSurveyUseCaseDomain, ILoadSurveysRepository, TypesSurveyOutputModelDTO } from './db-load-surveys-usecase-protocols'

export class DbLoadSurveysUseCase implements ILoadSurveyUseCaseDomain {
  constructor (private readonly loadSurveysRepository: ILoadSurveysRepository) {}
  async loadSurveys (): Promise<TypesSurveyOutputModelDTO[]> {
    const surveys = await this.loadSurveysRepository.loadAllSurveys()
    return surveys
  }
}
