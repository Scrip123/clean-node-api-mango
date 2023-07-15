import { ValidationComposite } from '@presentation/helpers/validators/ValidationComposite'
import { makeSignUpValidation } from './signupValidationFactory'
import { IValidation } from '@presentation/helpers/validators/IValidation'
import { RequiredFieldValidation } from '@presentation/helpers/validators/RequiredFieldValidation'

jest.mock('@presentation/helpers/validators/ValidationComposite')
describe('SignUpValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: IValidation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
