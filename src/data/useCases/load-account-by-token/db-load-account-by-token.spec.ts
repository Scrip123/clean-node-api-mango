import { IDecrypter } from '@data/protocols/cryptografy/IDecrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { ILoadAccountByTokenRepository } from '@data/protocols/db/account/ILoad-account-by-token-repository'
import { throwError } from '@domain/test/test-error-helper'
import { mcokLoadAccountByTokenRepository, mockDecrypter } from '@data/test'
import { mockAccountOutputParams } from '@domain/test'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterStub: IDecrypter
  loadAccountByTokenRepository: ILoadAccountByTokenRepository
}
const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter()
  const loadAccountByTokenRepository = mcokLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepository)

  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepository
  }
}
describe('DbAddAccountByToken useCase', () => {
  it('Should calls loadAccountByToken with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  it('Should returns null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  it('Should calls LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepository } = makeSut()
    const loadTokenSpy = jest.spyOn(loadAccountByTokenRepository, 'loadAccountByToken')
    await sut.load('any_token', 'any_role')
    expect(loadTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  it('Should returns null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepository } = makeSut()
    jest.spyOn(loadAccountByTokenRepository, 'loadAccountByToken')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  it('Should returns on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(mockAccountOutputParams())
  })

  it('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(throwError)
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })

  it('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepository } = makeSut()
    jest.spyOn(loadAccountByTokenRepository, 'loadAccountByToken').mockImplementationOnce(throwError)

    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })
})
