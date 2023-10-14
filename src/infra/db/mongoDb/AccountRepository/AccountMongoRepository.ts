import { TypeAccountModelDataBase } from '@domain/models/IAccountModel'
import { TypesAddAccountModel } from '@domain/useCases/accountsDomainUseCases/IAddAcount'
import { IAddAccountRepository } from '@data/protocols/db/account/IAddAccountRepository'
import { MongoHelper } from '../helpers/mongoHelper'
import { ILoadAccountByEmailRepository } from '@data/protocols/db/account/ILoadAccountByEmailRepository'
import { IUpdateAccessTokenRepository } from '@data/protocols/db/account/IUpdateAccessTokenRepository'
import { ILoadAccountByTokenRepository } from '@data/protocols/db/account/ILoad-account-by-token-repository'

export class AccountMongoRepository
implements IAddAccountRepository,
ILoadAccountByEmailRepository,
IUpdateAccessTokenRepository,
ILoadAccountByTokenRepository {
  async add (account: TypesAddAccountModel): Promise<TypeAccountModelDataBase> {
    const accountColletction = await MongoHelper.getCollection('accounts')
    const result = await accountColletction.insertOne(account)
    const accountResult = result.ops[0]
    return MongoHelper.map(accountResult)
  }

  async loadAccountByEmail (email: string): Promise<TypeAccountModelDataBase> {
    const accountColletction = await MongoHelper.getCollection('accounts')
    const account = await accountColletction.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountColletction = await MongoHelper.getCollection('accounts')
    await accountColletction.updateOne({ _id: id }, { $set: { accessToken: token } })
  }

  async loadAccountByToken (token: string, role?: string): Promise<TypeAccountModelDataBase> {
    const accountColletction = await MongoHelper.getCollection('accounts')
    const account = await accountColletction.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    })
    return account && MongoHelper.map(account)
  }
}
