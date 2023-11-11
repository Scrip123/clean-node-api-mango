import mockdate from 'mockdate'
import { SaveSurveyResultController } from './Save-survey-result-controller'
import { ILoadSurveyByIdDomain, ISaveSurveyResultDomain, InvalidParamError, TypesHttpRequest, forBidden, ok, serverError } from './save-survey-result-controller-protocols'
import { throwError } from '@domain/test/test-error-helper'
import { mockSurveyResultInputParams, mockSurveyResultOutputParams } from '@domain/test'
import { mockSaveSurveyResultUseCase } from '@presentation/test/mock-survey-result-usecase'
import { mockSurveyLoadByIdUseCase } from '@presentation/test/mock-survey-usecase'

const mockFakeRequest = (): TypesHttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  },
  body: {
    answer: 'any_answer'
  },
  accountId: 'any_user_id'
})

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdUseCaseStub: ILoadSurveyByIdDomain
  saveSurveyResultUseCaseStub: ISaveSurveyResultDomain
}
const makeSut = (): SutTypes => {
  const loadSurveyByIdUseCaseStub = mockSurveyLoadByIdUseCase()
  const saveSurveyResultUseCaseStub = mockSaveSurveyResultUseCase()
  const sut = new SaveSurveyResultController(loadSurveyByIdUseCaseStub, saveSurveyResultUseCaseStub)
  return {
    sut,
    loadSurveyByIdUseCaseStub,
    saveSurveyResultUseCaseStub
  }
}
describe('Save survey results controller', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })
  afterAll(() => {
    mockdate.reset()
  })
  describe('loadSurveyByIdUseCase', () => {
    test('Should calls loadSurveyByIdUseCaseStub with correct values', async () => {
      const { sut, loadSurveyByIdUseCaseStub } = makeSut()
      const surveySpy = jest.spyOn(loadSurveyByIdUseCaseStub, 'loadSurveyById')
      await sut.handle(mockFakeRequest())
      expect(surveySpy).toHaveBeenCalledWith('any_survey_id')
    })

    test('Should return 403 if loadSurveyByIdUseCaseStub returns null', async () => {
      const { sut, loadSurveyByIdUseCaseStub } = makeSut()
      jest.spyOn(loadSurveyByIdUseCaseStub, 'loadSurveyById')
        .mockReturnValueOnce(Promise.resolve(null))
      const httpResponse = await sut.handle(mockFakeRequest())
      expect(httpResponse).toEqual(forBidden(new InvalidParamError('surveyId')))
    })

    test('Should return 500 if loadSurveyByIdUseCaseStub throws', async () => {
      const { sut, loadSurveyByIdUseCaseStub } = makeSut()
      jest.spyOn(loadSurveyByIdUseCaseStub, 'loadSurveyById').mockImplementationOnce(throwError)
      const httpResponse = await sut.handle(mockFakeRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 403 if an invalid answer is provided', async () => {
      const { sut } = makeSut()
      const httpResonpse = await sut.handle({
        params: {
          surveyId: 'any_survey_id'
        },
        body: {
          answer: 'wrong_answer'
        }
      })
      expect(httpResonpse).toEqual(forBidden(new InvalidParamError('answer')))
    })
  })

  describe('SaveSurveyResultController', () => {
    test('Should calls saveSurveyResultUseCaseStub with correct values', async () => {
      const { sut, saveSurveyResultUseCaseStub } = makeSut()
      const surveyResultSpy = jest.spyOn(saveSurveyResultUseCaseStub, 'save')
      await sut.handle(mockFakeRequest())
      expect(surveyResultSpy).toHaveBeenCalledWith(mockSurveyResultInputParams())
    })

    test('Should return 200 on success', async () => {
      const { sut } = makeSut()
      const httpResonpse = await sut.handle(mockFakeRequest())
      expect(httpResonpse).toEqual(ok(mockSurveyResultOutputParams()))
    })

    test('Should return 500 if saveSurveyResultUseCaseStub throws', async () => {
      const { sut, saveSurveyResultUseCaseStub } = makeSut()
      jest.spyOn(saveSurveyResultUseCaseStub, 'save').mockImplementationOnce(throwError)
      const httpResponse = await sut.handle(mockFakeRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
})
