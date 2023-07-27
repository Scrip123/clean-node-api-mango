import { MissingParamError } from '@presentation/errors'
import { badRequest, ok, serverError, unAuthorized } from '@presentation/helpers/http/httpHelper'
import { LoginController } from './LoginController'
import { IHttpRequest, IAuthentication, IValidation } from './loginProtocols'

interface ISutTypes {
  sut: LoginController
  authenticationStub: IAuthentication
  validationStub: IValidation
}

const makeAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (email: string, password: string): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationStub()
}
const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
const makeSut = (): ISutTypes => {
  const authenticationStub = makeAuthentication()
  const validationStub = makeValidation()
  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    authenticationStub,
    validationStub
  }
}
const makeFakeRequest = (): IHttpRequest => ({
  body: {
    email: 'any_email@gmail.com',
    password: 'any_password'
  }
})
describe('Login Controller', () => {
  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')

    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith('any_email@gmail.com', 'any_password')
  })

  it('Should returns 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
      new Promise(resolve => resolve(null))
    )

    const httResponse = await sut.handle(makeFakeRequest())
    expect(httResponse).toEqual(unAuthorized())
  })

  it('Should returns 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const httResponse = await sut.handle(makeFakeRequest())
    expect(httResponse).toEqual(serverError(new Error()))
  })

  it('Should returns 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.handle(makeFakeRequest())
    expect(httResponse).toEqual(ok({ acessToken: 'any_token' }))
  })

  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should return 400 if validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
