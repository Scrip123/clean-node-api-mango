import { IAddAccountRepository } from '@data/protocols/db/account/IAddAccountRepository'
import { IAccountModelDataBase, IAddAccount, IAddAccountModel, ILoadAccountByEmailRepository }
  from './dbAddAccountProtocols'
import { IHasher } from '@data/protocols/cryptografy/IHasher'

export class DbAddAcount implements IAddAccount {
  constructor (private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository,
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  ) {}

  async add (account: IAddAccountModel): Promise<IAccountModelDataBase> {
    await this.loadAccountByEmailRepository.loadAccountByEmail(account.email)
    const passwordHashed = await this.hasher.hash(account.password)
    const accountData = Object.assign({}, account, { password: passwordHashed })
    const accountResult = await this.addAccountRepository.add(accountData)
    return accountResult
  }
}
