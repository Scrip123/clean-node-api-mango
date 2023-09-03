import { AddSurveyController } from './add-survey-controller'
import { IHttpRequest, IValidation } from './add-survey-protocols'

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    quation: 'any_value',
    answers: [{
      image: 'any_image',
      answer: 'any_value'
    }]
  }
})
describe('Add Survey Controller', () => {
  it('should calls validation with correct values', async () => {
    class ValidationStub implements IValidation {
      validate (input: any): Error {
        return null
      }
    }
    const validationStub = new ValidationStub()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddSurveyController(validationStub)
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
