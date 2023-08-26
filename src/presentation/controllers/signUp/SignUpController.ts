import { badRequest, serverError, ok } from '@presentation/helpers/http/httpHelper'
import { IHttpRequest, IHttpResponse, IController, IAddAccount, IValidation, IAuthentication }
  from './signUpProtocols'

export class SignUpController implements IController {
  constructor (
    private readonly addAcount: IAddAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { name, email, password } = httpRequest.body

      const account = await this.addAcount.add({
        name,
        email,
        password
      })
      await this.authentication.auth({
        email,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
