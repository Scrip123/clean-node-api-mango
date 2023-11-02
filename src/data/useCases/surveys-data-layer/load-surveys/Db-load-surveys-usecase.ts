import { ILoadSurveyUseCaseDomain, ILoadSurveysRepository, TypeSurveyOutputParams } from './db-load-surveys-usecase-protocols'

export class DbLoadSurveysUseCase implements ILoadSurveyUseCaseDomain {
  constructor (private readonly loadSurveysRepository: ILoadSurveysRepository) {}
  async loadSurveys (): Promise<TypeSurveyOutputParams[]> {
    const surveys = await this.loadSurveysRepository.loadAllSurveys()
    return surveys
  }
}
