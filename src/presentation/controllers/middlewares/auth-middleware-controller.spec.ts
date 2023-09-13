import { AccessDeniedError } from '@presentation/errors/Access-denied-error'
import { forBidden } from '@presentation/helpers/http/httpHelper'
import { AuthMiddlewareController } from './auth-middleware-controller'
import { IAccountModelDataBase, IHttpRequest, ILoadAccountByToken } from './auth-middleware-controller-protocols'

interface ISutTypes {
  sut: AuthMiddlewareController
  loadAccountByTokenStub: ILoadAccountByToken
}
const makeLoadAccountByToken = (): ILoadAccountByToken => {
  class LoadAccountByTokenStub implements ILoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<IAccountModelDataBase> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTokenStub()
}
const makeSut = (): ISutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken()
  const sut = new AuthMiddlewareController(loadAccountByTokenStub)
  return {
    sut,
    loadAccountByTokenStub
  }
}
const makeFakeAccount = (): IAccountModelDataBase => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@gmail.com',
  password: 'valid_password'
})
const makeFakeRequest = (): IHttpRequest => ({
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
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})