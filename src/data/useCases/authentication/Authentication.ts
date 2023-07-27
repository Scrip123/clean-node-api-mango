import { ILoadAccountByEmailRepository } from '@data/protocols/ILoadAccountByEmailRepository'
import { IAuthentication, IAuthenticationModel } from '@domain/useCases/IAuthentication'

export class AuthenticationUseCase implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  ) {}

  async auth (authentication: IAuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authentication.email)
    return null
  }
}
