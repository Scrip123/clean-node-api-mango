import { MissingParamError } from '@presentation/errors/MissingParamError'
import { badRequest } from '@presentation/helpers/badRequest'
import { IHttpRequest, IHttpResponse } from '@presentation/protocols/IHttp'

export class SignUpController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    return { statusCode: 200, body: new Error('sucess') }
  }
}
