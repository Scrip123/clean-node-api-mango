import { IValidation } from '@presentation/protocols/IValidation'
import { RequiredFieldValidation, ValidationComposite } from '@validation/validators'
import { makeAddSurveyValidation } from './addSurveyValidation'

jest.mock('@validation/validators/ValidationComposite')
describe('AddSurvey Validation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: IValidation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
