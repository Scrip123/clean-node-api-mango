import { MissingParamError } from '@presentation/errors/MissingParamError'
import { badRequest } from '@presentation/helpers/badRequest'
import { IHttpRequest, IHttpResponse } from '@presentation/protocols/IHttp'

export class SignUpController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return { statusCode: 200, body: new Error('sucess') }
  }
}
