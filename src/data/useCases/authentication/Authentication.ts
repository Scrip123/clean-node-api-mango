import { IHashCompare } from '@data/protocols/cryptografy/IHashCompare'
import { ILoadAccountByEmailRepository } from '@data/protocols/db/ILoadAccountByEmailRepository'
import { ITokenGenerator } from '@data/protocols/db/ITokenGenerator'
import { IAuthentication, IAuthenticationModel } from '@domain/useCases/IAuthentication'

export class AuthenticationUseCase implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComapre: IHashCompare,
    private readonly tokenGenerator: ITokenGenerator
  ) {}

  async auth (authentication: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComapre.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        return accessToken
      }
    }
    return null
  }
}
