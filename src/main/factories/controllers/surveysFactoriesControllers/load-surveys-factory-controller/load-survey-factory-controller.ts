import { IController } from '@presentation/protocols'
import { makeLogControllerDecorator } from '@main/factories/decorators/logControllerDecoratorFactory'
import { LoadSurveyController } from '@presentation/controllers/surveys/load-survey/Load-survey-controller'
import { makeLoadSurveyFactoryUseCase } from '@main/factories/usecases/surveysFactoriesUseCases/load-surveys-factory-usecase'

export const makeLoadSurveyFactoryController = (): IController => {
  const controller = new LoadSurveyController(makeLoadSurveyFactoryUseCase())
  return makeLogControllerDecorator(controller)
}
