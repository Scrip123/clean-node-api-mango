import { TypeSurveyResultInputParams, TypeSurveyResultOutputParams } from '@domain/models/Types-survey-result-model'
import { mockSurveyResultOutputParams } from '@domain/test'
import { ISaveSurveyResultDomain } from '@domain/useCases/surveys-result-domain-usecase/ISave-survey-result-model'

export const mockSaveSurveyResultUseCase = (): ISaveSurveyResultDomain => {
  class SaveSurveyResultUseCaseStub implements ISaveSurveyResultDomain {
    async save (data: TypeSurveyResultInputParams): Promise<TypeSurveyResultOutputParams> {
      return await Promise.resolve(mockSurveyResultOutputParams())
    }
  }
  return new SaveSurveyResultUseCaseStub()
}
