import { DbAddSurveyUseCase } from '@data/useCases/surveys-data-layer/add-survey/db-add-survey-usecase-protocols'
import { IAddSurvey } from '@domain/useCases/add-survey-model'
import { SurveyMongoRepository } from '@infra/db/mongoDb/surveys-repositories/surveys-mongo-repository'

export const makeAddSurveyFactoryUseCase = (): IAddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurveyUseCase(surveyMongoRepository)
}
