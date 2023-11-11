import { IAuthentication, TypeAuthenticationInputParams } from '@domain/useCases/accountsDomainUseCases/IAuthentication'

export const mockAuthenticationUseCase = (): IAuthentication => {
  class AuthenticationUseCaseStub implements IAuthentication {
    async auth (authentication: TypeAuthenticationInputParams): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationUseCaseStub()
}
