import { LoginController } from '@presentation/controllers/login/LoginController'
import { IController } from '@presentation/protocols'
import { makeAuthenticationUseCaseFactory } from '@main/factories/usecases/authenticationUseCaseFactory.ts'
import { makeLoginValidation } from './loginValidationFactory'
import { makeLogControllerDecorator } from '@main/factories/decorators/logControllerDecoratorFactory'

export const makeLoginController = (): IController => {
  const controller = new LoginController(makeAuthenticationUseCaseFactory(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
