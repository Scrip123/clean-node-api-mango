import { IHttpRequest, IHttpResponse } from '@presentation/protocols/IHttp'

export class SignUpController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing Param: name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing Param: email')
      }
    }
    return { statusCode: 200, body: new Error('sucess') }
  }
}
