import { MissingParamError } from '@presentation/errors'
import { badRequest, ok, serverError, unAuthorized } from '@presentation/helpers/http/httpHelper'
import { LoginController } from './LoginController'
import { TypesHttpRequest, IAuthentication, IValidation } from './loginProtocols'
import { throwError } from '@domain/test/test-error-helper'
import { mockAuthenticationUseCase, mockValidation } from '@presentation/test'

type SutTypes = {
  sut: LoginController
  authenticationUseCaseStub: IAuthentication
  validationStub: IValidation
}

const makeSut = (): SutTypes => {
  const authenticationUseCaseStub = mockAuthenticationUseCase()
  const validationStub = mockValidation()
  const sut = new LoginController(authenticationUseCaseStub, validationStub)
  return {
    sut,
    authenticationUseCaseStub,
    validationStub
  }
}
const makeFakeRequest = (): TypesHttpRequest => ({
  body: {
    email: 'any_email@gmail.com',
    password: 'any_password'
  }
})
describe('Login Controller', () => {
  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationUseCaseStub } = makeSut()
    const authSpy = jest.spyOn(authenticationUseCaseStub, 'auth')

    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@gmail.com',
      password: 'any_password'
    })
  })

  it('Should returns 401 if invalid credentials are provided', async () => {
    const { sut, authenticationUseCaseStub } = makeSut()
    jest.spyOn(authenticationUseCaseStub, 'auth').mockReturnValueOnce(
      new Promise(resolve => resolve(null))
    )

    const httResponse = await sut.handle(makeFakeRequest())
    expect(httResponse).toEqual(unAuthorized())
  })

  it('Should returns 500 if Authentication throws', async () => {
    const { sut, authenticationUseCaseStub } = makeSut()
    jest.spyOn(authenticationUseCaseStub, 'auth').mockImplementationOnce(throwError)
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
