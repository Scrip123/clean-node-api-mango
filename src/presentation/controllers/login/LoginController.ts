import { badRequest } from '@presentation/helpers/httpHelper'
import { IController, IEmailValidator, IHttpRequest, IHttpResponse } from '../signUp/signUpProtocols'
import { MissingParamError } from '@presentation/errors'

export class LoginController implements IController {
  constructor (private readonly emailValidator: IEmailValidator) {}
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    if (!httpRequest.body.email) {
      return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }
    if (!httpRequest.body.password) {
      return await new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }
    this.emailValidator.isValid(httpRequest.body.email)
  }
}
