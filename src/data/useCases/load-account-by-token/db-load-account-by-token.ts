import { ILoadAccountByToken } from '@domain/useCases/middleware-domain-usecase/ILoad-account-by-token'
import { IAccountModelDataBase } from '../accountsUseCases/addAccount/dbAddAccountProtocols'
import { IDecrypter } from '@data/protocols/cryptografy/IDecrypter'
import { ILoadAccountByTokenRepository } from '@data/protocols/db/account/ILoad-account-by-token-repository'

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor (
    private readonly decrypter: IDecrypter,
    private readonly loadAccountByTokenRepository: ILoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<IAccountModelDataBase> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      await this.loadAccountByTokenRepository.loadAccountByToken(accessToken, role)
    }
    return null
  }
}
