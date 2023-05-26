import { IAddAccount } from '@domain/useCases/IAddAcount'
import { InvalidParamError, MissingParamError } from '@presentation/errors'
import { badRequest, serverError } from '@presentation/helpers/badRequest'
import { IHttpRequest, IHttpResponse, IController, IEmailValidator }
  from '@presentation/protocols'

export class SignUpController implements IController {
  constructor (private readonly emailValidator: IEmailValidator,
    private readonly addAcount: IAddAccount) {}

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (passwordConfirmation !== password) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      this.addAcount.add({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError()
    }
  }
}
