import { ILoadAccountByEmailRepository } from '@data/protocols/ILoadAccountByEmailRepository'
import { IAccountModelDataBase } from '../addAccount/dbAddAccountProtocols'
import { AuthenticationUseCase } from './Authentication'

describe('DbAuthentication useCase', () => {
  it('Should call loadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
      async load (email: string): Promise<IAccountModelDataBase> {
        const account: IAccountModelDataBase = {
          id: 'id',
          name: 'any_name',
          email: 'any_email@gmail.com',
          password: 'any_password'
        }
        return await new Promise(resolve => resolve(account))
      }
    }
    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new AuthenticationUseCase(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth({
      email: 'any_email@gmail.com',
      password: 'any_password'
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email@gmail.com')
  })
})
