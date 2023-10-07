import { ILoadSurveyUseCaseDomain, ILoadSurveysRepository, ISurveyOutputModelDTO } from './db-load-surveys-usecase-protocols'

export class DbLoadSurveysUseCase implements ILoadSurveyUseCaseDomain {
  constructor (private readonly loadSurveysRepository: ILoadSurveysRepository) {}
  async loadSurveys (): Promise<ISurveyOutputModelDTO[]> {
    const surveys = await this.loadSurveysRepository.loadAllSurveys()
    return surveys
  }
}
