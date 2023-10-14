import { AccessDeniedError } from '@presentation/errors/Access-denied-error'
import { forBidden, ok, serverError } from '@presentation/helpers/http/httpHelper'
import { AuthMiddlewareController } from './auth-middleware-controller'
import { TypeAccountModelDataBase, TypesHttpRequest, ILoadAccountByToken } from './auth-middleware-controller-protocols'

type SutTypes = {
  sut: AuthMiddlewareController
  loadAccountByTokenStub: ILoadAccountByToken
}
const makeLoadAccountByToken = (): ILoadAccountByToken => {
  class LoadAccountByTokenStub implements ILoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<TypeAccountModelDataBase> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTokenStub()
}
const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken()
  const sut = new AuthMiddlewareController(loadAccountByTokenStub, role)
  return {
    sut,
    loadAccountByTokenStub
  }
}
const makeFakeAccount = (): TypeAccountModelDataBase => ({
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
    const { sut, loadAccountByTokenStub } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  it('Should returns 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load')
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
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
