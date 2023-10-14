import {
  IAuthentication,
  TypesAuthenticationModel,
  IHashCompare,
  ILoadAccountByEmailRepository,
  IEncrypterToken,
  IUpdateAccessTokenRepository
} from './authenticationProtocols'

export class AuthenticationUseCase implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComapre: IHashCompare,
    private readonly encrypterToken: IEncrypterToken,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) {}

  async auth (authentication: TypesAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadAccountByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComapre.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypterToken.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
