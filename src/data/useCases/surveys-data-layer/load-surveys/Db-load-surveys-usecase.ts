import { ILoadSurveyUseCaseDomain } from '@domain/useCases/surveys-domain-usecases/ILoad-survey-domain-usecase'
import { ISurveyOutputModelDTO } from '../add-survey/db-add-survey-usecase'
import { ILoadSurveysRepository } from '@data/protocols/db/surveys/ILoad-survey-repository'

export class DbLoadSurveysUseCase implements ILoadSurveyUseCaseDomain {
  constructor (private readonly loadSurveysRepository: ILoadSurveysRepository) {}
  async loadSurveys (): Promise<ISurveyOutputModelDTO[]> {
    await this.loadSurveysRepository.loadAllSurveys()
    return []
  }
}
