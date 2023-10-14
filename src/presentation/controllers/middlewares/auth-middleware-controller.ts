import { AccessDeniedError } from '@presentation/errors/Access-denied-error'
import { forBidden, ok, serverError } from '@presentation/helpers/http/httpHelper'
import { TypesHttpRequest, TypesHttpResponse, ILoadAccountByToken, IMiddleware } from './auth-middleware-controller-protocols'

export class AuthMiddlewareController implements IMiddleware {
  constructor (
    private readonly loadAccountByToken: ILoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: TypesHttpRequest): Promise<TypesHttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account) return ok({ accountId: account.id })
      }
      return forBidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
