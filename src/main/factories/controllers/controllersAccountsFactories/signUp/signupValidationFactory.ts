import { CompareFieldValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '@validation/validators'
import { IValidation } from '@presentation/protocols/IValidation'
import { EmailValidatorAdapter } from '@infra/validators/EmailValidatorAdapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
