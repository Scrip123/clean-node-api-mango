import { AccessDeniedError } from '@presentation/errors/Access-denied-error'
import { forBidden } from '@presentation/helpers/http/httpHelper'
import { AuthMiddleware } from './auth-middleware'

describe('Auth middleware', () => {
  it('Should return 403 if x-access-token no exists in headers', async () => {
    const sut = new AuthMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forBidden(new AccessDeniedError()))
  })
})
