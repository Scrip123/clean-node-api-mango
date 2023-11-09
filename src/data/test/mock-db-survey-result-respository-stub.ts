import { ISaveSurveyResultRepository } from '@data/protocols/db/surveys/ISave-survey-result-repository'
import { TypeSurveyResultInputParams, TypeSurveyResultOutputParams } from '@domain/models/Types-survey-result-model'
import { mockSurveyResultOutputParams } from '@domain/test'

export const mockSaveSurveyResultRepository = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    async save (data: TypeSurveyResultInputParams): Promise<TypeSurveyResultOutputParams> {
      return await new Promise(resolve => resolve(mockSurveyResultOutputParams()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}
