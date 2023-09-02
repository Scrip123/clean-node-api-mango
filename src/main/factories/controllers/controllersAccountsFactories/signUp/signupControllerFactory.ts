import { SignUpController } from '@presentation/controllers/accounts/signUp/SignUpController'
import { IController } from '@presentation/protocols'
import { makeSignUpValidation } from './signupValidationFactory'
import { makeDbAddAccountFactory } from '@main/factories/usecases/dbAddAccountUseCaseFactory'
import { makeAuthenticationUseCaseFactory } from '@main/factories/usecases/authenticationUseCaseFactory.ts'
import { makeLogControllerDecorator } from '@main/factories/decorators/logControllerDecoratorFactory'

export const makeSignupController = (): IController => {
  const controller = new SignUpController(
    makeDbAddAccountFactory(), makeSignUpValidation(), makeAuthenticationUseCaseFactory()
  )
  return makeLogControllerDecorator(controller)
}
