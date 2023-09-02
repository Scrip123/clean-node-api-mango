import { LoginController } from '@presentation/controllers/accounts/login/LoginController'
import { IController } from '@presentation/protocols'
import { makeAuthenticationUseCaseFactory } from '@main/factories/usecases/factoriesAccountsUseCases/authenticationUseCaseFactory.ts'
import { makeLoginValidation } from './loginValidationFactory'
import { makeLogControllerDecorator } from '@main/factories/decorators/logControllerDecoratorFactory'

export const makeLoginController = (): IController => {
  const controller = new LoginController(makeAuthenticationUseCaseFactory(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
