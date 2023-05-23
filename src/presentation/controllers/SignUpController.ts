import { InvalidParamError } from '@presentation/errors/InvalidParamError'
import { MissingParamError } from '@presentation/errors/MissingParamError'
import { badRequest } from '@presentation/helpers/badRequest'
import { IController } from '@presentation/protocols/IController'
import { IEmailValidator } from '@presentation/protocols/IEmailValidator'
import { IHttpRequest, IHttpResponse } from '@presentation/protocols/IHttp'

export class SignUpController implements IController {
  constructor (private readonly emailValidator: IEmailValidator) {}
  handle (httpRequest: IHttpRequest): IHttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
    // return { statusCode: 200, body: new Error('sucess') }
  }
}
