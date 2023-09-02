import { makeSignUpValidation } from './signupValidationFactory'
import { IValidation } from '@presentation/protocols/IValidation'
import { IEmailValidator } from '@validation/protocols/IEmailValidator'
import { CompareFieldValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '@validation/validators'

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
// jest.mock('@presentation/helpers/validators/ValidationComposite')
jest.mock('@validation/validators/ValidationComposite')
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
