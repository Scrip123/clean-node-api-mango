import { SignUpController } from './SignUpController'
import { MissingParamError, ServerError } from '@presentation/errors'
import {
  IEmailValidator,
  IAccountModelDataBase,
  IAddAccount,
  IAddAccountModel,
  IHttpRequest,
  IValidation,
  IAuthentication,
  IAuthenticationModel
}
  from './signUpProtocols'
import { ok, badRequest, serverError } from '@presentation/helpers/http/httpHelper'

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
const makeAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add (account: IAddAccountModel): Promise<IAccountModelDataBase> {
      return await new Promise(resolve => { resolve(makeFakeAccount()) })
    }
  }
  return new AddAccountStub()
}
const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
const makeAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (authentication: IAuthenticationModel): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationStub()
}

interface ISutTypes {
  sut: SignUpController
  emailValidatorStub: IEmailValidator
  addAccountStub: IAddAccount
  validationStub: IValidation
  authenticationStub: IAuthentication
}
const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const authenticationStub = makeAuthentication()
  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}
const makeFakeRequest = (): IHttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@gmail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})
const makeFakeAccount = (): IAccountModelDataBase => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@gmail.com',
  password: 'valid_password'
})
describe('Signup controller', () => {
  it('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'any_password'
    })
  })

  it('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => { reject(new Error()) })
    })

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
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
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')

    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@gmail.com',
      password: 'any_password'
    })
  })
})
