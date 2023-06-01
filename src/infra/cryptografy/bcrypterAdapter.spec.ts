import bcrypt from 'bcrypt'
import { BcrypterAdapter } from './BcrypterAdapter'
describe('Bcrypter Adapter', () => {
  it('Should call bcrypter with correct values', async () => {
    const salt = 12
    const sut = new BcrypterAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
