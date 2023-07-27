import { ILoadAccountByEmailRepository } from '@data/protocols/ILoadAccountByEmailRepository'
import { IAccountModelDataBase } from '../addAccount/dbAddAccountProtocols'
import { AuthenticationUseCase } from './Authentication'
import { IAuthenticationModel } from '@domain/useCases/IAuthentication'

const makeFakeAccount = (): IAccountModelDataBase => ({
  id: 'id',
  name: 'any_name',
  email: 'any_email@gmail.com',
  password: 'any_password'
})
const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async load (email: string): Promise<IAccountModelDataBase> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}
interface ISutTypes {
  sut: AuthenticationUseCase
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}
const makeSut = (): ISutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new AuthenticationUseCase(loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}
const makeFakeAuthentication = (): IAuthenticationModel => ({
  email: 'any_email@gmail.com',
  password: 'any_password'
})
describe('DbAuthentication useCase', () => {
  it('Should call loadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@gmail.com')
  })
})
