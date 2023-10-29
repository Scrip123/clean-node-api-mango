import { DbLoadSurveyByIdUseCase } from '@data/useCases/surveys-data-layer/load-survey-by-id/Load-survey-by-id-usecase'
import { ILoadSurveyByIdDomain } from '@domain/useCases/surveys-domain-usecases/ILoad-survey-by-id'
import { SurveyMongoRepository } from '@infra/db/mongoDb/surveys-repositories/surveys-mongo-repository'

export const makeLoadSurveyByIdFactoryUseCase = (): ILoadSurveyByIdDomain => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyByIdUseCase(surveyMongoRepository)
}
