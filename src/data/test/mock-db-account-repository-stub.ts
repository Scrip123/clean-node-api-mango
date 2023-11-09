import { IAddAccountRepository } from '@data/protocols/db/account/IAddAccountRepository'
import { ILoadAccountByTokenRepository } from '@data/protocols/db/account/ILoad-account-by-token-repository'
import { ILoadAccountByEmailRepository } from '@data/protocols/db/account/ILoadAccountByEmailRepository'
import { IUpdateAccessTokenRepository } from '@data/protocols/db/account/IUpdateAccessTokenRepository'
import { TypeAccountInputParams, TypeAccountOutputParams } from '@domain/models/IAccountModel'
import { mockAccountOutputParams } from '@domain/test'

export const mockAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (account: TypeAccountInputParams): Promise<TypeAccountOutputParams> {
      return mockAccountOutputParams()
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async loadAccountByEmail (email: string): Promise<TypeAccountOutputParams> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

export const mockUpdateAccessTokenRepository = (): IUpdateAccessTokenRepository => {
  class UpdateTokenRepositoryStub implements IUpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new UpdateTokenRepositoryStub()
}

export const mcokLoadAccountByTokenRepository = (): ILoadAccountByTokenRepository => {
  class LoadAccountByTokenRepository implements ILoadAccountByTokenRepository {
    async loadAccountByToken (token: string, role?: string): Promise<TypeAccountOutputParams> {
      return await new Promise(resolve => resolve(mockAccountOutputParams()))
    }
  }
  return new LoadAccountByTokenRepository()
}
