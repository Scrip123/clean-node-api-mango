import bcrypt from 'bcrypt'
import { BcrypterAdapter } from './BcrypterAdapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))
describe('Bcrypter Adapter', () => {
  it('Should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcrypterAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('Should return hash on success', async () => {
    const salt = 12
    const sut = new BcrypterAdapter(salt)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
