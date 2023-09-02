import { IValidation } from '@presentation/protocols/IValidation'
import { IEmailValidator } from '@validation/protocols/IEmailValidator'
import { makeLoginValidation } from './loginValidationFactory'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@validation/validators'

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
describe('LoginValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: IValidation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
