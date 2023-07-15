import { InvalidParamError } from '@presentation/errors'
import { badRequest, serverError, ok } from '@presentation/helpers/httpHelper'
import { IHttpRequest, IHttpResponse, IController, IEmailValidator, IAddAccount, IValidation }
  from './signUpProtocols'

export class SignUpController implements IController {
  constructor (private readonly emailValidator: IEmailValidator,
    private readonly addAcount: IAddAccount, private readonly validation: IValidation) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (passwordConfirmation !== password) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = await this.addAcount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
