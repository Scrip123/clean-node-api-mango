import bcrypt from 'bcrypt'
import { BcrypterAdapter } from './BcrypterAdapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12
const makeSut = (): BcrypterAdapter => {
  return new BcrypterAdapter(salt)
}
describe('Bcrypter Adapter', () => {
  it('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('Should return hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hash')
  })

  it('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash')
      .mockImplementationOnce(async () => {
        return await new Promise((_resolve, reject) => reject(new Error()))
      })
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })
})
