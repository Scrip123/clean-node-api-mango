import { IMiddleware } from '@presentation/protocols/IMiddleware'
import { IHttpRequest, IHttpResponse } from '../accounts/login/loginProtocols'
import { AccessDeniedError } from '@presentation/errors/Access-denied-error'
import { forBidden } from '@presentation/helpers/http/httpHelper'

export class AuthMiddleware implements IMiddleware {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = forBidden(new AccessDeniedError())
    return await new Promise(resolve => resolve(error))
  }
}
