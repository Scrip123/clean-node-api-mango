import { IEncrypter } from 'data/protocols/IEncrypter'
import { DbAddAcountUseCase } from './DbAddAccountUseCase'

const makeEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise((resolve, reject) => { resolve('hashed_password') })
    }
  }
  return new EncrypterStub()
}
interface ISutTypes {
  sut: DbAddAcountUseCase
  encryptStub: IEncrypter
}
const makeSut = (): ISutTypes => {
  const encryptStub = makeEncrypter()
  const sut = new DbAddAcountUseCase(encryptStub)
  return {
    sut,
    encryptStub
  }
}
describe('DbAddAccount UseCase', () => {
  it('Should call Encrypter with correct value', async () => {
    const { sut, encryptStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  it('Should throw if Encrypter throws', async () => {
    const { sut, encryptStub } = makeSut()
    jest.spyOn(encryptStub, 'encrypt').mockReturnValueOnce(
      new Promise((resolve, reject) => { reject(new Error()) }))
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
