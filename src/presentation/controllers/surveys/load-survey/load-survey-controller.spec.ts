import mockdate from 'mockdate'
import { LoadSurveyController } from './Load-survey-controller'
import { ILoadSurveyUseCaseDomain } from './load-survey-controller-protocols'
import { noContent, ok, serverError } from '@presentation/helpers/http/httpHelper'
import { throwError } from '@domain/test/test-error-helper'
import { mockSurveyOutputParams } from '@domain/test'
import { mockLoadSurveyUseCase } from '@presentation/test/mock-survey-usecase'

type SutTypes = {
  sut: LoadSurveyController
  loadSurveyUseCaseStub: ILoadSurveyUseCaseDomain
}

const makeSut = (): SutTypes => {
  const loadSurveyUseCaseStub = mockLoadSurveyUseCase()
  const sut = new LoadSurveyController(loadSurveyUseCaseStub)
  return {
    sut,
    loadSurveyUseCaseStub
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
    const { sut, loadSurveyUseCaseStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyUseCaseStub, 'loadSurveys')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.handle({})
    expect(httResponse).toEqual(ok([mockSurveyOutputParams()]))
  })

  it('should reutrns 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveyUseCaseStub } = makeSut()
    jest.spyOn(loadSurveyUseCaseStub, 'loadSurveys')
      .mockReturnValueOnce(new Promise(resolve => resolve([])))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  it('should reutrns 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveyUseCaseStub } = makeSut()
    jest.spyOn(loadSurveyUseCaseStub, 'loadSurveys').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
