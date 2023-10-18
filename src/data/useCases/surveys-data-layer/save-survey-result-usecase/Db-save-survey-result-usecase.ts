import { ISaveSurveyResultRepository } from '@data/protocols/db/surveys/ISave-survey-result-repository'
import { TypeSurveyResultInputModelDTO, TypeSurveyResultOutputModelDTO } from '@domain/models/Types-survey-result-model'
import { ISaveSurveyResultDomain } from '@domain/useCases/surveys-domain-usecases/ISave-survey-result-model'

export class DbSaveSurveyResultUseCase implements ISaveSurveyResultDomain {
  constructor (private readonly saveSurveyResultRepository: ISaveSurveyResultRepository) {}
  async save (data: TypeSurveyResultInputModelDTO): Promise<TypeSurveyResultOutputModelDTO> {
    const surveyResult = await this.saveSurveyResultRepository.save(data)
    return surveyResult
  }
}
