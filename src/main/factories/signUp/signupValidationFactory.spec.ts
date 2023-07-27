import { ValidationComposite } from '@presentation/helpers/validators/ValidationComposite'
import { makeSignUpValidation } from './signupValidationFactory'
import { IValidation } from '@presentation/protocols/IValidation'
import { RequiredFieldValidation } from '@presentation/helpers/validators/RequiredFieldValidation'
import { CompareFieldValidation } from '@presentation/helpers/validators/CompareFieldsValidation'
import { EmailValidation } from '@presentation/helpers/validators/EmailValidation'
import { IEmailValidator } from '@presentation/protocols/IEmailValidator'

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
jest.mock('@presentation/helpers/validators/ValidationComposite')
describe('SignUpValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: IValidation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
