import { MissingParamError } from '@presentation/errors'
import { RequiredFieldValidation } from './RequiredFieldValidation'

describe('Required field name validation', () => {
  it('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  it('Should not return Validation succeds', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
