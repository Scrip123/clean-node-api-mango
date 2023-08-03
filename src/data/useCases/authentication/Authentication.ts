import {
  IAuthentication,
  IAuthenticationModel,
  IHashCompare,
  ILoadAccountByEmailRepository,
  IEncrypterToken,
  IUpdateAccessTokenRepository
} from './authenticationProtocols'

export class AuthenticationUseCase implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComapre: IHashCompare,
    private readonly tokenGenerator: IEncrypterToken,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) {}

  async auth (authentication: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComapre.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.encrypt(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
