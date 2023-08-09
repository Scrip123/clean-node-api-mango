import { DbAddAcount } from '@data/useCases/addAccount/DbAddAccount'
import { BcrypterAdapter } from '@infra/cryptografy/BcrypterAdapter'
import { AccountMongoRepository } from '@infra/db/mongoDb/AccountRepository/AccountMongoRepository'
import { LogErrorRepository } from '@infra/db/mongoDb/LogRepository/LogErrorMongoRepository'
import { LogControllerDecorator } from '@main/decorators/LogControllerDecorator'
import { SignUpController } from '@presentation/controllers/signUp/SignUpController'
import { IController } from '@presentation/protocols'
import { makeSignUpValidation } from './signupValidationFactory'

export const makeSignupController = (): IController => {
  const salt = 12
  const bcrypterAdapter = new BcrypterAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAcount(bcrypterAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logErrorRepository = new LogErrorRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}
