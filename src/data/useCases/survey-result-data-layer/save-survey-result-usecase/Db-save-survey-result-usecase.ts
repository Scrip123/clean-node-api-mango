import { ISaveSurveyResultDomain, ISaveSurveyResultRepository, TypeSurveyResultInputParams, TypeSurveyResultOutputParams } from './db-save-survey-result-usecase-protocols'

export class DbSaveSurveyResultUseCase implements ISaveSurveyResultDomain {
  constructor (private readonly saveSurveyResultRepository: ISaveSurveyResultRepository) {}
  async save (data: TypeSurveyResultInputParams): Promise<TypeSurveyResultOutputParams> {
    const surveyResult = await this.saveSurveyResultRepository.save(data)
    return surveyResult
  }
}
