import { DbAddAcount } from '@data/useCases/addAccount/DbAddAccount'
import { BcrypterAdapter } from '@infra/cryptografy/BcrypterAdapter'
import { AccountMongoRepository } from '@infra/db/mongoDb/AccountRepository/AccountMongoRepository'
import { SignUpController } from '@presentation/controllers/signUp/SignUpController'
import { EmailValidatorAdapter } from '@utils/EmailValidatorAdapter'

export const makeSignupController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcrypterAdapter = new BcrypterAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAcount(bcrypterAdapter, accountMongoRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
