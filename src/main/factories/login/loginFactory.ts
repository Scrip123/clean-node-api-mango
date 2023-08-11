import env from '@main/config/env'
import { AuthenticationUseCase } from '@data/useCases/authentication/Authentication'
import { LogErrorRepository } from '@infra/db/mongoDb/LogRepository/LogErrorMongoRepository'
import { LogControllerDecorator } from '@main/decorators/LogControllerDecorator'
import { LoginController } from '@presentation/controllers/login/LoginController'
import { IController } from '@presentation/protocols'
import { makeLoginValidation } from './loginValidationFactory'
import { AccountMongoRepository } from '@infra/db/mongoDb/AccountRepository/AccountMongoRepository'
import { BcrypterAdapter } from '@infra/cryptografy/bcryptAdapter/BcrypterAdapter'
import { JwtAdapter } from '@infra/cryptografy/jwtAdapter/JwtAdapter'

export const makeLoginController = (): IController => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcrypterAdapter = new BcrypterAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.JWT_SECRET)
  const authenticationUseCase = new AuthenticationUseCase(
    accountMongoRepository, bcrypterAdapter, jwtAdapter, accountMongoRepository
  )
  const loginController = new LoginController(authenticationUseCase, makeLoginValidation())
  const logErrorRepository = new LogErrorRepository()
  return new LogControllerDecorator(loginController, logErrorRepository)
}
