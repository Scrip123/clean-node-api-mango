import { IAddSurveyRepository } from '@data/protocols/db/surveys/IAdd-survey-repository'
import { ILoadSurveyByIdRepository } from '@data/protocols/db/surveys/ILoad-survey-by-id-repository'
import { ILoadSurveysRepository } from '@data/protocols/db/surveys/ILoad-survey-repository'
import { TypeSurveyInputParams, TypeSurveyOutputParams } from '@domain/models/ISurvey-model-domain'
import { mockSurveyOutputParams } from '@domain/test'

export const mockAddSurveyRepository = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    async add (data: TypeSurveyInputParams): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): ILoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements ILoadSurveyByIdRepository {
    async loadById (id: string): Promise<TypeSurveyOutputParams> {
      return await Promise.resolve(mockSurveyOutputParams())
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    async loadAllSurveys (): Promise<TypeSurveyOutputParams[]> {
      return await new Promise(resolve => resolve([mockSurveyOutputParams()]))
    }
  }
  return new LoadSurveysRepositoryStub()
}
