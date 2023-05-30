import { IEncrypter } from 'data/protocols/IEncrypter'
import { DbAddAcountUseCase } from './DbAddAccountUseCase'

interface ISutTypes {
  sut: DbAddAcountUseCase
  encryptStub: IEncrypter
}
const makeSut = (): ISutTypes => {
  class EncrypterStub {
    async encrypt (value: string): Promise<string> {
      return await new Promise((resolve, reject) => { resolve('hashed_password') })
    }
  }
  const encryptStub = new EncrypterStub()
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
})
