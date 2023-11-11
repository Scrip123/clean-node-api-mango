import { TypeSurveyInputParams, TypeSurveyOutputParams } from '@domain/models/ISurvey-model-domain'
import { mockSurveyOutputParams } from '@domain/test'
import { ILoadSurveyByIdDomain } from '@domain/useCases/surveys-domain-usecases/ILoad-survey-by-id'
import { ILoadSurveyUseCaseDomain } from '@domain/useCases/surveys-domain-usecases/ILoad-survey-domain-usecase'
import { IAddSurvey } from '@domain/useCases/surveys-domain-usecases/add-survey-model'

export const mockSurveyLoadByIdUseCase = (): ILoadSurveyByIdDomain => {
  class LoadSurveyByIdUseCaseStub implements ILoadSurveyByIdDomain {
    async loadSurveyById (id: string): Promise<TypeSurveyOutputParams> {
      return await Promise.resolve(mockSurveyOutputParams())
    }
  }
  return new LoadSurveyByIdUseCaseStub()
}

export const mockAddSurveyUseCase = (): IAddSurvey => {
  class AddSurveyUseCaseStub implements IAddSurvey {
    async add (data: TypeSurveyInputParams): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyUseCaseStub()
}

export const mockLoadSurveyUseCase = (): ILoadSurveyUseCaseDomain => {
  class LoadSurveyUseCaseStub implements ILoadSurveyUseCaseDomain {
    async loadSurveys (): Promise<TypeSurveyOutputParams[]> {
      return await new Promise(resolve => resolve([mockSurveyOutputParams()]))
    }
  }
  return new LoadSurveyUseCaseStub()
}
