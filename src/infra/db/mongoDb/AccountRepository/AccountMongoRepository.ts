import { IAccountModelDataBase } from '@domain/models/IAccountModel'
import { IAddAccountModel } from '@domain/useCases/IAddAcount'
import { IAddAccountRepository } from '@data/protocols/db/IAddAccountRepository'
import { MongoHelper } from '../helpers/mongoHelper'
import { ILoadAccountByEmailRepository } from '@data/protocols/db/ILoadAccountByEmailRepository'

export class AccountMongoRepository implements IAddAccountRepository, ILoadAccountByEmailRepository {
  async add (account: IAddAccountModel): Promise<IAccountModelDataBase> {
    const accountColletction = await MongoHelper.getCollection('accounts')
    const result = await accountColletction.insertOne(account)
    const accountResult = result.ops[0]
    return MongoHelper.map(accountResult)
  }

  async loadAccountByEmail (email: string): Promise<IAccountModelDataBase> {
    const accountColletction = await MongoHelper.getCollection('accounts')
    const account = await accountColletction.findOne({ email })
    return account && MongoHelper.map(account)
  }
}
