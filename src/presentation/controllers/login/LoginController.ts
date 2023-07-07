import { badRequest } from '@presentation/helpers/httpHelper'
import { IController, IHttpRequest, IHttpResponse } from '../signUp/signUpProtocols'
import { MissingParamError } from '@presentation/errors'

export class LoginController implements IController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    if (!httpRequest.body.email) {
      return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }
    if (!httpRequest.body.password) {
      return await new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }
  }
}
