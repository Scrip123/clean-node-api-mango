import { badRequest, serverError } from '@presentation/helpers/httpHelper'
import { IController, IEmailValidator, IHttpRequest, IHttpResponse } from '../signUp/signUpProtocols'
import { InvalidParamError, MissingParamError } from '@presentation/errors'

export class LoginController implements IController {
  constructor (private readonly emailValidator: IEmailValidator) {}
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
      }
      if (!password) {
        return await new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return await new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
