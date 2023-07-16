import { ValidationComposite } from '@presentation/helpers/validators/ValidationComposite'
import { makeSignUpValidation } from './signupValidationFactory'
import { IValidation } from '@presentation/helpers/validators/IValidation'
import { RequiredFieldValidation } from '@presentation/helpers/validators/RequiredFieldValidation'
import { CompareFieldValidation } from '@presentation/helpers/validators/CompareFieldsValidation'

jest.mock('@presentation/helpers/validators/ValidationComposite')
describe('SignUpValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: IValidation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
