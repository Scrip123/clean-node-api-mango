import { AccessDeniedError } from '@presentation/errors/Access-denied-error'
import { forBidden, ok, serverError } from '@presentation/helpers/http/httpHelper'
import { AuthMiddlewareController } from './auth-middleware-controller'
import { TypeAccountOutputParams, TypesHttpRequest, ILoadAccountByToken } from './auth-middleware-controller-protocols'
import { throwError } from '@domain/test/test-error-helper'

type SutTypes = {
  sut: AuthMiddlewareController
  loadAccountByTokenUseCaseStub: ILoadAccountByToken
}
const makeLoadAccountByTokenUseCase = (): ILoadAccountByToken => {
  class LoadAccountByTokenUseCaseStub implements ILoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<TypeAccountOutputParams> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTokenUseCaseStub()
}
const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenUseCaseStub = makeLoadAccountByTokenUseCase()
  const sut = new AuthMiddlewareController(loadAccountByTokenUseCaseStub, role)
  return {
    sut,
    loadAccountByTokenUseCaseStub
  }
}
const makeFakeAccount = (): TypeAccountOutputParams => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@gmail.com',
  password: 'valid_password'
})
const makeFakeRequest = (): TypesHttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})
describe('Auth middleware', () => {
  it('Should return 403 if x-access-token no exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forBidden(new AccessDeniedError()))
  })

  it('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenUseCaseStub } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenUseCaseStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  it('Should returns 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenUseCaseStub } = makeSut()
    jest.spyOn(loadAccountByTokenUseCaseStub, 'load')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forBidden(new AccessDeniedError()))
  })

  it('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }))
  })

  it('Should returns 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenUseCaseStub } = makeSut()
    jest.spyOn(loadAccountByTokenUseCaseStub, 'load').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
