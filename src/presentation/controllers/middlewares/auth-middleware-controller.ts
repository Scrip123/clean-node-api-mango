import { AccessDeniedError } from '@presentation/errors/Access-denied-error'
import { forBidden } from '@presentation/helpers/http/httpHelper'
import { IHttpRequest, IHttpResponse, ILoadAccountByToken, IMiddleware } from './auth-middleware-controller-protocols'

export class AuthMiddlewareController implements IMiddleware {
  constructor (private readonly loadAccountByToken?: ILoadAccountByToken) {}
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
      return
    }
    return forBidden(new AccessDeniedError())
  }
}
