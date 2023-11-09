import { TypeAccountOutputParams, TypeAccountInputParams, ILoadAccountByEmailRepository } from './dbAddAccountProtocols'
import { DbAddAcount } from './DbAddAccount'
import { IAddAccountRepository } from '@data/protocols/db/account/IAddAccountRepository'
import { IHasher } from '@data/protocols/cryptografy/IHasher'
import { mockAccountInputParams, mockAccountOutputParams } from '@domain/test'
import { throwError } from '@domain/test/test-error-helper'
import { mockEncrypter } from '@data/test'

const makeAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (account: TypeAccountInputParams): Promise<TypeAccountOutputParams> {
      return mockAccountOutputParams()
    }
  }
  return new AddAccountRepositoryStub()
}

const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async loadAccountByEmail (email: string): Promise<TypeAccountOutputParams> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

type SutTypes = {
  sut: DbAddAcount
  encryptStub: IHasher
  addAccountRepositoryStub: IAddAccountRepository
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}
const makeSut = (): SutTypes => {
  const encryptStub = mockEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAddAcount(encryptStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)

  return {
    sut,
    encryptStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount UseCase', () => {
  it('Should call Hahser with correct value', async () => {
    const { sut, encryptStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptStub, 'hash')

    await sut.add(mockAccountInputParams())
    expect(encryptSpy).toHaveBeenCalledWith('any_password')
  })

  it('Should throw if Hahser throws', async () => {
    const { sut, encryptStub } = makeSut()
    jest.spyOn(encryptStub, 'hash').mockImplementationOnce(throwError)

    const promise = sut.add(mockAccountInputParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(mockAccountInputParams())
    expect(addSpy).toHaveBeenCalledWith(mockAccountInputParams())
  })

  it('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)

    const promise = sut.add(mockAccountInputParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should returns an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockAccountInputParams())
    expect(account).toEqual(mockAccountOutputParams())
  })

  it('Should call loadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadAccountByEmail')
    await sut.add(mockAccountInputParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@gmail.com')
  })

  it('Should returns null if loadAccountByEmailRepository not returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadAccountByEmail')
      .mockReturnValueOnce(new Promise(resolve => resolve(mockAccountOutputParams())))
    const accessToken = await sut.add(mockAccountInputParams())
    expect(accessToken).toBeNull()
  })
})
