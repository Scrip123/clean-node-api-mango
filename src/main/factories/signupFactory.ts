import { DbAddAcount } from '@data/useCases/addAccount/DbAddAccount'
import { BcrypterAdapter } from '@infra/cryptografy/BcrypterAdapter'
import { AccountMongoRepository } from '@infra/db/mongoDb/AccountRepository/AccountMongoRepository'
import { LogErrorRepository } from '@infra/db/mongoDb/LogRepository/LogErrorRepository'
import { LogControllerDecorator } from '@main/decorators/LogControllerDecorator'
import { SignUpController } from '@presentation/controllers/signUp/SignUpController'
import { IController } from '@presentation/protocols'
import { EmailValidatorAdapter } from '@utils/EmailValidatorAdapter'

export const makeSignupController = (): IController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcrypterAdapter = new BcrypterAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAcount(bcrypterAdapter, accountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  const logErrorRepository = new LogErrorRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}
