import { IHashCompare } from '@data/protocols/cryptografy/IHashCompare'
import { ILoadAccountByEmailRepository } from '@data/protocols/db/ILoadAccountByEmailRepository'
import { IAuthentication, IAuthenticationModel } from '@domain/useCases/IAuthentication'

export class AuthenticationUseCase implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComapre: IHashCompare
  ) {}

  async auth (authentication: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashComapre.compare(authentication.password, account.password)
    }
    return null
  }
}
