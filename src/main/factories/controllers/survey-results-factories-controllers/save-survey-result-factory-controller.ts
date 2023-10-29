import { IController } from '@presentation/protocols'
import { makeLogControllerDecorator } from '@main/factories/decorators/logControllerDecoratorFactory'
import { SaveSurveyResultController } from '@presentation/controllers/survey-results/save-survey-result/Save-survey-result-controller'
import { makeSaveSurveyResultsFactoryUseCase } from '@main/factories/usecases/survey-results-fatories-usecase/save-survey-results-factory-usecase'
import { makeLoadSurveyByIdFactoryUseCase } from '@main/factories/usecases/surveysFactoriesUseCases/load-survey-by-id-factory-usecase'

export const makeSaveSurveyResultFactoryController = (): IController => {
  const controller = new SaveSurveyResultController(makeLoadSurveyByIdFactoryUseCase(), makeSaveSurveyResultsFactoryUseCase())
  return makeLogControllerDecorator(controller)
}
