import { DbLoadSurveysUseCase } from '@data/useCases/surveys-data-layer/load-surveys/Db-load-surveys-usecase'
import { ILoadSurveyUseCaseDomain } from '@domain/useCases/surveys-domain-usecases/ILoad-survey-domain-usecase'
import { SurveyMongoRepository } from '@infra/db/mongoDb/surveys-repositories/surveys-mongo-repository'

export const makeLoadSurveyFactoryUseCase = (): ILoadSurveyUseCaseDomain => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveysUseCase(surveyMongoRepository)
}
