import { IAccountModelDataBase } from '@domain/models/IAccountModel'
import { IAddAccountModel } from '@domain/useCases/IAddAcount'
import { IAddAccountRepository } from 'data/protocols/IAddAccountRepository'
import { MongoHelper } from '../helpers/mongoHelper'

export class AccountMongoRepository implements IAddAccountRepository {
  async add (account: IAddAccountModel): Promise<IAccountModelDataBase> {
    const accountColletction = MongoHelper.getCollection('accounts')
    const result = await accountColletction.insertOne(account)
    const accountResult = result.ops[0]
    const { _id, ...accountResultWithoutId } = accountResult
    return Object.assign({}, accountResultWithoutId, { id: _id })
  }
}
