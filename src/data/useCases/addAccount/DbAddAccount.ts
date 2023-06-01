import { IAddAccountRepository } from 'data/protocols/IAddAccountRepository'
import { IAccountModelDataBase, IAddAccount, IAddAccountModel, IEncrypter }
  from './dbAddAccountProtocols'

export class DbAddAcount implements IAddAccount {
  constructor (private readonly encrypter: IEncrypter,
    private readonly addAccountRepository: IAddAccountRepository) {}

  async add (account: IAddAccountModel): Promise<IAccountModelDataBase> {
    const passwordHashed = await this.encrypter.encrypt(account.password)
    const accountData = Object.assign({}, account, { password: passwordHashed })
    const accountResult = await this.addAccountRepository.add(accountData)
    return accountResult
  }
}
