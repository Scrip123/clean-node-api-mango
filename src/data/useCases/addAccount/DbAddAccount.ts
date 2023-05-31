import { IAccountModelDataBase } from '@domain/models/IAccountModel'
import { IAddAccount, IAddAccountModel } from '@domain/useCases/IAddAcount'
import { IEncrypter } from 'data/protocols/IEncrypter'

export class DbAddAcount implements IAddAccount {
  constructor (private readonly encrypter: IEncrypter) {}
  async add (account: IAddAccountModel): Promise<IAccountModelDataBase> {
    await this.encrypter.encrypt(account.password)
    return await new Promise((resolve, reject) => { resolve(null) })
  }
}
