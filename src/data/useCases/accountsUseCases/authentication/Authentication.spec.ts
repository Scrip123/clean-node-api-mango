import { AuthenticationUseCase } from './Authentication'
import {
  TypeAccountOutputParams,
  IEncrypterToken,
  IHashCompare,
  ILoadAccountByEmailRepository,
  IUpdateAccessTokenRepository
} from './authenticationProtocols'
import { throwError } from '@domain/test/test-error-helper'
import { mockAuthenticationInputparams } from '@domain/test'
import { mockEncrypterToken, mockHahsComapre, mockUpdateAccessTokenRepository } from '@data/test'

const makeFakeAccount = (): TypeAccountOutputParams => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@gmail.com',
  password: 'hashed_password'
})
const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async loadAccountByEmail (email: string): Promise<TypeAccountOutputParams> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

type SutTypes = {
  sut: AuthenticationUseCase
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
  hashCompareStub: IHashCompare
  encrypterTokenStub: IEncrypterToken
  updateTokenRepositoryStub: IUpdateAccessTokenRepository
}
const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashCompareStub = mockHahsComapre()
  const encrypterTokenStub = mockEncrypterToken()
  const updateTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const sut = new AuthenticationUseCase(
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    encrypterTokenStub,
    updateTokenRepositoryStub
  )
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    encrypterTokenStub,
    updateTokenRepositoryStub
  }
}

describe('DbAuthentication useCase', () => {
  it('Should call loadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadAccountByEmail')
    await sut.auth(mockAuthenticationInputparams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@gmail.com')
  })

  it('Should throw if loadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadAccountByEmail')
      .mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationInputparams())
    await expect(promise).rejects.toThrow()
  })

  it('Should return null if loadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadAccountByEmail')
      .mockReturnValueOnce(null)
    const accessToken = await sut.auth(mockAuthenticationInputparams())
    expect(accessToken).toBeNull()
  })

  it('Should call HashCompare with correct values', async () => {
    const { sut, hashCompareStub } = makeSut()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(mockAuthenticationInputparams())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  it('Should throw if HashCompare throws', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationInputparams())
    await expect(promise).rejects.toThrow()
  })

  it('Should return null if HashCompare returns null', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const accessToken = await sut.auth(mockAuthenticationInputparams())
    expect(accessToken).toBeNull()
  })
  it('Should call encrypterToken with correct id', async () => {
    const { sut, encrypterTokenStub } = makeSut()
    const tokenSpy = jest.spyOn(encrypterTokenStub, 'encrypt')
    await sut.auth(mockAuthenticationInputparams())
    expect(tokenSpy).toHaveBeenLastCalledWith('any_id')
  })

  it('Should throw if encrypterToken throws', async () => {
    const { sut, encrypterTokenStub } = makeSut()
    jest.spyOn(encrypterTokenStub, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationInputparams())
    await expect(promise).rejects.toThrow()
  })

  it('Should returns a token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(mockAuthenticationInputparams())
    expect(accessToken).toBe('any_token')
  })

  it('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockAuthenticationInputparams())
    expect(updateSpy).toHaveBeenLastCalledWith('any_id', 'any_token')
  })

  it('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateTokenRepositoryStub } = makeSut()
    jest.spyOn(updateTokenRepositoryStub, 'updateAccessToken')
      .mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationInputparams())
    await expect(promise).rejects.toThrow()
  })
})
