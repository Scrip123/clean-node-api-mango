import { IAccountModelDataBase, IAddAccountModel, IHasher } from './dbAddAccountProtocols'
import { DbAddAcount } from './DbAddAccount'
import { IAddAccountRepository } from '@data/protocols/db/IAddAccountRepository'

const makeAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (account: IAddAccountModel): Promise<IAccountModelDataBase> {
      return makeFakeAccount()
    }
  }
  return new AddAccountRepositoryStub()
}
const makeHasher = (): IHasher => {
  class HasherStub implements IHasher {
    async hash (value: string): Promise<string> {
      return await new Promise((resolve, reject) => { resolve('hashed_password') })
    }
  }
  return new HasherStub()
}
interface ISutTypes {
  sut: DbAddAcount
  encryptStub: IHasher
  addAccountRepositoryStub: IAddAccountRepository
}
const makeSut = (): ISutTypes => {
  const encryptStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAcount(encryptStub, addAccountRepositoryStub)

  return {
    sut,
    encryptStub,
    addAccountRepositoryStub
  }
}
const makeFakeAccount = (): IAccountModelDataBase => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})
const makeFakeAccountData = (): IAddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@gmail.com',
  password: 'valid_password'
})
describe('DbAddAccount UseCase', () => {
  it('Should call Encrypter with correct value', async () => {
    const { sut, encryptStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptStub, 'hash')

    await sut.add(makeFakeAccountData())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  it('Should throw if Encrypter throws', async () => {
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
})
