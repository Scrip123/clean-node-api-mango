import { ILoadSurveyByIdDomain } from '@domain/useCases/surveys-domain-usecases/ILoad-survey-by-id'
import { TypesSurveyOutputModelDTO } from '../add-survey/db-add-survey-usecase'
import { ILoadSurveyByIdRepository } from '@data/protocols/db/surveys/ILoad-survey-by-id-repository'

export class DbLoadSurveyByIdUseCase implements ILoadSurveyByIdDomain {
  constructor (private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository) {}
  async loadSurveyById (id: string): Promise<TypesSurveyOutputModelDTO> {
    await this.loadSurveyByIdRepository.loadById(id)
    return null
  }
}
