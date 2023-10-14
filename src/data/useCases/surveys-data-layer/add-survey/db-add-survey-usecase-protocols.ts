import { IAddSurvey, TypesSurveyInputModelDTO, IAddSurveyRepository } from './db-add-survey-usecase'

export class DbAddSurveyUseCase implements IAddSurvey {
  constructor (private readonly addSurveyRepository: IAddSurveyRepository) {}
  async add (data: TypesSurveyInputModelDTO): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
