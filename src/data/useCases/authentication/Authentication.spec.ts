import { ILoadAccountByEmailRepository } from '@data/protocols/db/ILoadAccountByEmailRepository'
import { IAccountModelDataBase } from '../addAccount/dbAddAccountProtocols'
import { AuthenticationUseCase } from './Authentication'
import { IAuthenticationModel } from '@domain/useCases/IAuthentication'
import { IHashCompare } from '@data/protocols/cryptografy/IHashCompare'
import { ITokenGenerator } from '@data/protocols/db/ITokenGenerator'

const makeFakeAccount = (): IAccountModelDataBase => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@gmail.com',
  password: 'hashed_password'
})
const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async load (email: string): Promise<IAccountModelDataBase> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHahsComapre = (): IHashCompare => {
  class LoadAccountByEmailRepositoryStub implements IHashCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}
const makeTokenGenerator = (): ITokenGenerator => {
  class TokenGeneratorStub implements ITokenGenerator {
    async generate (id: string): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new TokenGeneratorStub()
}
interface ISutTypes {
  sut: AuthenticationUseCase
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
  hashCompareStub: IHashCompare
  tokenGeneratorStub: ITokenGenerator
}
const makeSut = (): ISutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashCompareStub = makeHahsComapre()
  const tokenGeneratorStub = makeTokenGenerator()
  const sut = new AuthenticationUseCase(
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    tokenGeneratorStub
  )
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    tokenGeneratorStub
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

  it('Should throw if loadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  it('Should return null if loadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(null)
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  it('Should call HashCompare with correct values', async () => {
    const { sut, hashCompareStub } = makeSut()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(makeFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  it('Should throw if HashCompare throws', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  it('Should return null if HashCompare returns null', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })
  it('Should call toknGenerator with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const tokenSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.auth(makeFakeAuthentication())
    expect(tokenSpy).toHaveBeenLastCalledWith('any_id')
  })
})
