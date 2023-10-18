import { ISaveSurveyResultDomain, ISaveSurveyResultRepository, TypeSurveyResultInputModelDTO, TypeSurveyResultOutputModelDTO } from './db-save-survey-result-usecase-protocols'

export class DbSaveSurveyResultUseCase implements ISaveSurveyResultDomain {
  constructor (private readonly saveSurveyResultRepository: ISaveSurveyResultRepository) {}
  async save (data: TypeSurveyResultInputModelDTO): Promise<TypeSurveyResultOutputModelDTO> {
    const surveyResult = await this.saveSurveyResultRepository.save(data)
    return surveyResult
  }
}
