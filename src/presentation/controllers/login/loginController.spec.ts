import { MissingParamError } from '@presentation/errors'
import { badRequest } from '@presentation/helpers/httpHelper'
import { LoginController } from './LoginController'

describe('Login Controller', () => {
  it('Should returns 400 if no email is provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('Should returns 400 if no password is provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        email: 'any_email@gmail.com'
      }
    }
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
