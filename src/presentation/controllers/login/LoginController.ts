import { badRequest } from '@presentation/helpers/httpHelper'
import { IController, IHttpRequest, IHttpResponse } from '../signUp/signUpProtocols'
import { MissingParamError } from '@presentation/errors'

export class LoginController implements IController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
  }
}
