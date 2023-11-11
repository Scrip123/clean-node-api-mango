import { SignUpController } from './SignUpController'
import { MissingParamError, ServerError } from '@presentation/errors'
import {
  IEmailValidator,
  IAddAccount,
  TypesHttpRequest,
  IValidation,
  IAuthentication
}
  from './signUpProtocols'
import { ok, badRequest, serverError, forBidden } from '@presentation/helpers/http/httpHelper'
import { EmailInUseError } from '@presentation/errors/EmailInUseError'
import { throwError } from '@domain/test/test-error-helper'
import { mockAddAccountUseCase, mockAuthenticationUseCase, mockEmailValidator } from '@presentation/test'
import { mockValidation } from '@presentation/test/mock-validation'

type SutTypes = {
  sut: SignUpController
  emailValidatorStub: IEmailValidator
  addAccountUseCaseStub: IAddAccount
  validationStub: IValidation
  authenticationUseCaseStub: IAuthentication
}
const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const addAccountUseCaseStub = mockAddAccountUseCase()
  const validationStub = mockValidation()
  const authenticationUseCaseStub = mockAuthenticationUseCase()
  const sut = new SignUpController(addAccountUseCaseStub, validationStub, authenticationUseCaseStub)
  return {
    sut,
    emailValidatorStub,
    addAccountUseCaseStub,
    validationStub,
    authenticationUseCaseStub
  }
}
const makeFakeRequest = (): TypesHttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@gmail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

describe('Signup controller', () => {
  it('Should call AddAccount with correct values', async () => {
    const { sut, addAccountUseCaseStub } = makeSut()
    const addSpy = jest.spyOn(addAccountUseCaseStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'any_password'
    })
  })

  it('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountUseCaseStub } = makeSut()
    jest.spyOn(addAccountUseCaseStub, 'add').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  it('Should return 403 if addAccount return null', async () => {
    const { sut, addAccountUseCaseStub } = makeSut()
    jest.spyOn(addAccountUseCaseStub, 'add')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forBidden(new EmailInUseError()))
  })

  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
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

  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationUseCaseStub } = makeSut()
    const authSpy = jest.spyOn(authenticationUseCaseStub, 'auth')

    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@gmail.com',
      password: 'any_password'
    })
  })
  it('Should returns 500 if Authentication throws', async () => {
    const { sut, authenticationUseCaseStub } = makeSut()
    jest.spyOn(authenticationUseCaseStub, 'auth').mockImplementationOnce(throwError)
    const httResponse = await sut.handle(makeFakeRequest())
    expect(httResponse).toEqual(serverError(new Error()))
  })
})
