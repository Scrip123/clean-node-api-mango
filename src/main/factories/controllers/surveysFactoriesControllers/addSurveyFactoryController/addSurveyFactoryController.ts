import { makeAddSurveyFactoryUseCase } from '@main/factories/usecases/surveysFactoriesUseCases/addSurveyFactory'
import { AddSurveyController } from '@presentation/controllers/surveys/add-survey/add-survey-controller'
import { IController } from '@presentation/protocols'
import { makeAddSurveyValidation } from './addSurveyValidation'
import { makeLogControllerDecorator } from '@main/factories/decorators/logControllerDecoratorFactory'

export const makeAddSurveyFactoryController = (): IController => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeAddSurveyFactoryUseCase())
  return makeLogControllerDecorator(controller)
}
