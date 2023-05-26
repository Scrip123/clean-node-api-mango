import { InvalidParamError, MissingParamError } from '@presentation/errors'
import { badRequest, serverError } from '@presentation/helpers/badRequest'
import { IHttpRequest, IHttpResponse, IController, IEmailValidator }
  from '@presentation/protocols'

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
      const { email, password, passwordConfirmation } = httpRequest.body
      if (passwordConfirmation !== password) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
