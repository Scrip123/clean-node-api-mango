import { InvalidParamError } from '@presentation/errors/InvalidParamError'
import { MissingParamError } from '@presentation/errors/MissingParamError'
import { ServerError } from '@presentation/errors/ServerError'
import { badRequest } from '@presentation/helpers/badRequest'
import { IController } from '@presentation/protocols/IController'
import { IEmailValidator } from '@presentation/protocols/IEmailValidator'
import { IHttpRequest, IHttpResponse } from '@presentation/protocols/IHttp'

export class SignUpController implements IController {
  constructor (private readonly emailValidator: IEmailValidator) {}
  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
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
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
