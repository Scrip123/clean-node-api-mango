import { IMiddleware } from '@presentation/protocols/IMiddleware'
import { IHttpRequest, IHttpResponse } from '../accounts/login/loginProtocols'
import { AccessDeniedError } from '@presentation/errors/Access-denied-error'
import { forBidden } from '@presentation/helpers/http/httpHelper'
import { ILoadAccountByToken } from '@domain/useCases/middleware-domain-usecase/ILoad-account-by-token'

export class AuthMiddleware implements IMiddleware {
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
