import { AddSurveyController } from './add-survey-controller'
import { IHttpRequest, IValidation } from './add-survey-protocols'

interface ISutTypes {
  sut: AddSurveyController
  validationStub: IValidation
}
const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
const makeSut = (): ISutTypes => {
  const validationStub = makeValidation()
  const sut = new AddSurveyController(validationStub)
  return {
    sut,
    validationStub
  }
}
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
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
