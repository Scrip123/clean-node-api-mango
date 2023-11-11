import { TypeAccountInputParams, TypeAccountOutputParams } from '@domain/models/IAccountModel'
import { mockAccountOutputParams } from '@domain/test'
import { IAddAccount } from '@domain/useCases/accountsDomainUseCases/IAddAcount'
import { ILoadAccountByToken } from '@domain/useCases/middleware-domain-usecase/ILoad-account-by-token'

export const mockAddAccountUseCase = (): IAddAccount => {
  class AddAccountUseCaseStub implements IAddAccount {
    async add (account: TypeAccountInputParams): Promise<TypeAccountOutputParams> {
      return await new Promise(resolve => { resolve(mockAccountOutputParams()) })
    }
  }
  return new AddAccountUseCaseStub()
}

export const mockLoadAccountByTokenUseCase = (): ILoadAccountByToken => {
  class LoadAccountByTokenUseCaseStub implements ILoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<TypeAccountOutputParams> {
      return await new Promise(resolve => resolve(mockAccountOutputParams()))
    }
  }
  return new LoadAccountByTokenUseCaseStub()
}
