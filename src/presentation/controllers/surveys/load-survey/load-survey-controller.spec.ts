import mockdate from 'mockdate'
import { LoadSurveyController } from './Load-survey-controller'
import { TypeSurveyOutputParams, ILoadSurveyUseCaseDomain } from './load-survey-controller-protocols'
import { noContent, ok, serverError } from '@presentation/helpers/http/httpHelper'
import { throwError } from '@domain/test/test-error-helper'

const makeFakeSurveyRequest = (): TypeSurveyOutputParams[] => {
  return [{
    id: 'any_id',
    question: 'any_value',
    answers: [{
      image: 'any_image',
      answer: 'any_value'
    }],
    createdAt: new Date()
  }]
}
type SutTypes = {
  sut: LoadSurveyController
  loadSurveyStub: ILoadSurveyUseCaseDomain
}
const makeLoadSurvey = (): ILoadSurveyUseCaseDomain => {
  class LoadSurveyStub implements ILoadSurveyUseCaseDomain {
    async loadSurveys (): Promise<TypeSurveyOutputParams[]> {
      return await new Promise(resolve => resolve(makeFakeSurveyRequest()))
    }
  }
  return new LoadSurveyStub()
}
const makeSut = (): SutTypes => {
  const loadSurveyStub = makeLoadSurvey()
  const sut = new LoadSurveyController(loadSurveyStub)
  return {
    sut,
    loadSurveyStub
  }
}
describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })
  afterAll(() => {
    mockdate.reset()
  })

  it('Should calls LoadSurveys', async () => {
    const { sut, loadSurveyStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyStub, 'loadSurveys')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.handle({})
    expect(httResponse).toEqual(ok(makeFakeSurveyRequest()))
  })

  it('should reutrns 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveyStub } = makeSut()
    jest.spyOn(loadSurveyStub, 'loadSurveys')
      .mockReturnValueOnce(new Promise(resolve => resolve([])))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  it('should reutrns 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveyStub } = makeSut()
    jest.spyOn(loadSurveyStub, 'loadSurveys').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
