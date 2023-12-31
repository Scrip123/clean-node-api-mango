import { IController, TypesHttpRequest, TypesHttpResponse } from '@presentation/protocols'
import { LogControllerDecorator } from './LogControllerDecorator'
import { ok, serverError } from '@presentation/helpers/http/httpHelper'
import { ILogErrorRepository } from '@data/protocols/db/log/ILogErrorRepository'
import { TypeAccountOutputParams } from '@domain/models/IAccountModel'

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle (httpRequest: TypesHttpRequest): Promise<TypesHttpResponse> {
      return await new Promise(resolve => resolve(ok(makeFakeAccount())))
    }
  }
  return new ControllerStub()
}
const makeLogErrorRepository = (): ILogErrorRepository => {
  class LogErrorRepositoryStub implements ILogErrorRepository {
    async logError (stack: string): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}
type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: IController
  logErrorRepositoryStub: ILogErrorRepository
}
const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
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
const makeFakeAccount = (): TypeAccountOutputParams => (
  {
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@gmail.com',
    password: 'valid_password'
  })
const makeServerError = (): TypesHttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}
describe('Log Controller Decorator', () => {
  it('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  it('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  it('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(makeServerError())))
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
