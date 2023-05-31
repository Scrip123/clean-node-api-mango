import { IAccountModelDataBase, IAddAccount, IAddAccountModel, IEncrypter }
  from './dbAddAccountProtocols'

export class DbAddAcount implements IAddAccount {
  constructor (private readonly encrypter: IEncrypter) {}
  async add (account: IAddAccountModel): Promise<IAccountModelDataBase> {
    await this.encrypter.encrypt(account.password)
    return await new Promise((resolve, reject) => { resolve(null) })
  }
}
