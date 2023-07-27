import { badRequest, ok, serverError, unAuthorized } from '@presentation/helpers/httpHelper'
import { IController, IHttpRequest, IHttpResponse, IAuthentication, IValidation } from './loginProtocols'

export class LoginController implements IController {
  constructor (
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)
      const { email, password } = httpRequest.body

      const acessToken = await this.authentication.auth(email, password)
      if (!acessToken) {
        return unAuthorized()
      }
      return ok({ acessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
