import { AccessDeniedError } from '@presentation/errors/Access-denied-error'
import { forBidden } from '@presentation/helpers/http/httpHelper'
import { AuthMiddlewareController } from './auth-middleware-controller'
import { IAccountModelDataBase, ILoadAccountByToken } from './auth-middleware-controller-protocols'

const makeFakeAccount = (): IAccountModelDataBase => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@gmail.com',
  password: 'valid_password'
})
describe('Auth middleware', () => {
  it('Should return 403 if x-access-token no exists in headers', async () => {
    const sut = new AuthMiddlewareController()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forBidden(new AccessDeniedError()))
  })

  it('Should call LoadAccountByToken with correct accessToken', async () => {
    class LoadAccountByTokenStub implements ILoadAccountByToken {
      async load (accessToken: string, role?: string): Promise<IAccountModelDataBase> {
        return await new Promise(resolve => resolve(makeFakeAccount()))
      }
    }
    const loadAccountByTokenStub = new LoadAccountByTokenStub()
    const sut = new AuthMiddlewareController(loadAccountByTokenStub)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
