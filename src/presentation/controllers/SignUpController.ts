import { MissingParamError } from '@presentation/errors/MissingParamError'
import { IHttpRequest, IHttpResponse } from '@presentation/protocols/IHttp'

export class SignUpController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
    return { statusCode: 200, body: new Error('sucess') }
  }
}
