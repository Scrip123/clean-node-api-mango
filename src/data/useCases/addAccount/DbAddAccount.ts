import { IAddAccountRepository } from '@data/protocols/db/IAddAccountRepository'
import { IAccountModelDataBase, IAddAccount, IAddAccountModel, IHasher }
  from './dbAddAccountProtocols'

export class DbAddAcount implements IAddAccount {
  constructor (private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository) {}

  async add (account: IAddAccountModel): Promise<IAccountModelDataBase> {
    const passwordHashed = await this.hasher.hash(account.password)
    const accountData = Object.assign({}, account, { password: passwordHashed })
    const accountResult = await this.addAccountRepository.add(accountData)
    return accountResult
  }
}
