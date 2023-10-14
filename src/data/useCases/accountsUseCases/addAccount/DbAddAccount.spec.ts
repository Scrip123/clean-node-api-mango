import { TypeAccountModelDataBase, TypesAddAccountModel, ILoadAccountByEmailRepository } from './dbAddAccountProtocols'
import { DbAddAcount } from './DbAddAccount'
import { IAddAccountRepository } from '@data/protocols/db/account/IAddAccountRepository'
import { IHasher } from '@data/protocols/cryptografy/IHasher'

const makeAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (account: TypesAddAccountModel): Promise<TypeAccountModelDataBase> {
      return makeFakeAccount()
    }
  }
  return new AddAccountRepositoryStub()
}
const makeEncrypter = (): IHasher => {
  class EncryptStub implements IHasher {
    async hash (value: string): Promise<string> {
      return await new Promise((resolve, reject) => { resolve('hashed_password') })
    }
  }
  return new EncryptStub()
}

const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async loadAccountByEmail (email: string): Promise<TypeAccountModelDataBase> {
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
  const encryptStub = makeEncrypter()
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
const makeFakeAccount = (): TypeAccountModelDataBase => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})
const makeFakeAccountData = (): TypesAddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@gmail.com',
  password: 'valid_password'
})

describe('DbAddAccount UseCase', () => {
  it('Should call Hahser with correct value', async () => {
    const { sut, encryptStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptStub, 'hash')

    await sut.add(makeFakeAccountData())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  it('Should throw if Hahser throws', async () => {
    const { sut, encryptStub } = makeSut()
    jest.spyOn(encryptStub, 'hash').mockReturnValueOnce(
      new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(makeFakeAccountData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      password: 'hashed_password'
    })
  })

  it('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  it('Should returns an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeAccountData())
    expect(account).toEqual(makeFakeAccount())
  })

  it('Should call loadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadAccountByEmail')
    await sut.add(makeFakeAccountData())
    expect(loadSpy).toHaveBeenCalledWith('valid_email@gmail.com')
  })

  it('Should returns null if loadAccountByEmailRepository not returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadAccountByEmail')
      .mockReturnValueOnce(new Promise(resolve => resolve(makeFakeAccount())))
    const accessToken = await sut.add(makeFakeAccountData())
    expect(accessToken).toBeNull()
  })
})
