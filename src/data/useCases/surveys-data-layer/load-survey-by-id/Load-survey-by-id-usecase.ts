import { ILoadSurveyByIdDomain, ILoadSurveyByIdRepository, TypeSurveyOutputParams } from './load-survey-by-id-usecase-protocols'

export class DbLoadSurveyByIdUseCase implements ILoadSurveyByIdDomain {
  constructor (private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository) {}
  async loadSurveyById (id: string): Promise<TypeSurveyOutputParams> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey || null
  }
}
