import { DbSaveSurveyResultUseCase } from '@data/useCases/survey-result-data-layer/save-survey-result-usecase/Db-save-survey-result-usecase'
import { ISaveSurveyResultDomain } from '@domain/useCases/surveys-result-domain-usecase/ISave-survey-result-model'
import { SurveyResultMongoRepository } from '@infra/db/mongoDb/survey-result-repository/survey-result-mongo-repository'

export const makeSaveSurveyResultsFactoryUseCase = (): ISaveSurveyResultDomain => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResultUseCase(surveyResultMongoRepository)
}
