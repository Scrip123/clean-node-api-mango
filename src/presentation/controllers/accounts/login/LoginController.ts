import { badRequest, ok, serverError, unAuthorized } from '@presentation/helpers/http/httpHelper'
import { IController, TypesHttpRequest, TypesHttpResponse, IAuthentication, IValidation } from './loginProtocols'

export class LoginController implements IController {
  constructor (
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation) {}

  async handle (httpRequest: TypesHttpRequest): Promise<TypesHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)
      const { email, password } = httpRequest.body

      const acessToken = await this.authentication.auth({ email, password })
      if (!acessToken) {
        return unAuthorized()
      }
      return ok({ acessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
