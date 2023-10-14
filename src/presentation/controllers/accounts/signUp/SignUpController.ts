import { badRequest, serverError, ok, forBidden } from '@presentation/helpers/http/httpHelper'
import { TypesHttpRequest, TypesHttpResponse, IController, IAddAccount, IValidation, IAuthentication }
  from './signUpProtocols'
import { EmailInUseError } from '@presentation/errors/EmailInUseError'

export class SignUpController implements IController {
  constructor (
    private readonly addAcount: IAddAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication
  ) {}

  async handle (httpRequest: TypesHttpRequest): Promise<TypesHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { name, email, password } = httpRequest.body

      const account = await this.addAcount.add({
        name,
        email,
        password
      })
      if (!account) return forBidden(new EmailInUseError())
      const accessToken = await this.authentication.auth({
        email,
        password
      })
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
