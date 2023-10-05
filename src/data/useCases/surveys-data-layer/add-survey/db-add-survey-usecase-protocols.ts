import { IAddSurvey, ISurveyInputModelDTO, IAddSurveyRepository } from './db-add-survey-usecase'

export class DbAddSurveyUseCase implements IAddSurvey {
  constructor (private readonly addSurveyRepository: IAddSurveyRepository) {}
  async add (data: ISurveyInputModelDTO): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
