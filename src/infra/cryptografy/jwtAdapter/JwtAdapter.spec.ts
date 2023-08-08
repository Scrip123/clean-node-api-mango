import jwt from 'jsonwebtoken'
import { JwtAdapter } from './JwtAdapter'
/* jest.mock('jwt', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  }
})) */
describe('Jwt Adapter', () => {
  it('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secrect')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.hash('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secrect')
  })
})
