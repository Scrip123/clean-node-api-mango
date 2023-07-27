import { IValidation } from '@presentation/protocols/IValidation'
import { IEmailValidator } from '@presentation/protocols/IEmailValidator'
import { makeLoginValidation } from './loginFactory'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@presentation/helpers/validators'

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
jest.mock('@presentation/helpers/validators/ValidationComposite')
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
