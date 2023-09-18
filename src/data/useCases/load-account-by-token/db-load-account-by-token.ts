import { ILoadAccountByToken } from '@domain/useCases/middleware-domain-usecase/ILoad-account-by-token'
import { IAccountModelDataBase } from '../accountsUseCases/addAccount/dbAddAccountProtocols'
import { IDecrypter } from '@data/protocols/cryptografy/IDecrypter'

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor (private readonly decrypter: IDecrypter) {}
  async load (accessToken: string, role?: string): Promise<IAccountModelDataBase> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
