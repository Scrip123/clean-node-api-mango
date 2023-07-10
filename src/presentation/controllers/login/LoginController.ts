import { badRequest, ok, serverError, unAuthorized } from '@presentation/helpers/httpHelper'
import { IController, IEmailValidator, IHttpRequest, IHttpResponse, IAuthentication } from './loginProtocols'
import { InvalidParamError, MissingParamError } from '@presentation/errors'

export class LoginController implements IController {
  constructor (private readonly emailValidator: IEmailValidator,
    private readonly authentication: IAuthentication) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
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
