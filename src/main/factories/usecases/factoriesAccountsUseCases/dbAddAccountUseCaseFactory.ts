import { DbAddAcount } from '@data/useCases/accountsUseCases/addAccount/DbAddAccount'
import { BcrypterAdapter } from '@infra/cryptografy/bcryptAdapter/BcrypterAdapter'
import { AccountMongoRepository } from '@infra/db/mongoDb/AccountRepository/AccountMongoRepository'
import { IAddAccount } from '@domain/useCases/accountsDomainUseCases/IAddAcount'

export const makeDbAddAccountFactory = (): IAddAccount => {
  const salt = 12
  const bcrypterAdapter = new BcrypterAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAcount(bcrypterAdapter, accountMongoRepository, accountMongoRepository)
}
