import jwt from 'jsonwebtoken'
import { JwtAdapter } from './JwtAdapter'
jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  }
}))
describe('Jwt Adapter', () => {
  it('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secrect')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.hash('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secrect')
  })
  it('Should a token sign on sign success', async () => {
    const sut = new JwtAdapter('secrect')
    const accessToken = await sut.hash('any_id')
    expect(accessToken).toBe('any_token')
  })
  it('Should throw if sign throws', async () => {
    const sut = new JwtAdapter('secrect')
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.hash('any_id')
    await expect(promise).rejects.toThrow()
  })
})
