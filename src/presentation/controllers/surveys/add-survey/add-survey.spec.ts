import mockdate from 'mockdate'
import { badRequest, noContent, serverError } from '@presentation/helpers/http/httpHelper'
import { AddSurveyController } from './add-survey-controller'
import { IAddSurvey, TypeSurveyInputParams, TypesHttpRequest, IValidation } from './add-survey-protocols'
import { throwError } from '@domain/test/test-error-helper'

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
const makeAddSurveyUseCase = (): IAddSurvey => {
  class AddSurveyUseCaseStub implements IAddSurvey {
    async add (data: TypeSurveyInputParams): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyUseCaseStub()
}
type SutTypes = {
  sut: AddSurveyController
  validationStub: IValidation
  addSurveyUseCaseStub: IAddSurvey
}
const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addSurveyUseCaseStub = makeAddSurveyUseCase()
  const sut = new AddSurveyController(validationStub, addSurveyUseCaseStub)
  return {
    sut,
    validationStub,
    addSurveyUseCaseStub
  }
}
const makeFakeRequest = (): TypesHttpRequest => ({
  body: {
    question: 'any_value',
    answers: [{
      image: 'any_image',
      answer: 'any_value'
    }],
    createdAt: new Date()
  }
})
describe('Add Survey Controller', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })
  afterAll(() => {
    mockdate.reset()
  })
  it('should calls validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('should reutrns 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  it('should calls AddSurvey with correct values', async () => {
    const { sut, addSurveyUseCaseStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyUseCaseStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('should reutrns 500 if AddSurvey throws', async () => {
    const { sut, addSurveyUseCaseStub } = makeSut()
    jest.spyOn(addSurveyUseCaseStub, 'add').mockImplementationOnce(throwError)
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return AddSurvey 204 on success', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.handle(makeFakeRequest())
    expect(httResponse).toEqual(noContent())
  })
})
