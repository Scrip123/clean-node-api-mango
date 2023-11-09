import mockdate from 'mockdate'
import { SaveSurveyResultController } from './Save-survey-result-controller'
import { ILoadSurveyByIdDomain, ISaveSurveyResultDomain, InvalidParamError, TypeSurveyResultInputParams, TypeSurveyResultOutputParams, TypesHttpRequest, TypeSurveyOutputParams, forBidden, ok, serverError } from './save-survey-result-controller-protocols'
import { throwError } from '@domain/test/test-error-helper'

const makeSaveSurveyResultUseCase = (): ISaveSurveyResultDomain => {
  class SaveSurveyResultUseCaseStub implements ISaveSurveyResultDomain {
    async save (data: TypeSurveyResultInputParams): Promise<TypeSurveyResultOutputParams> {
      return await Promise.resolve(makeFakeSaveSurveyResultOutputData())
    }
  }
  return new SaveSurveyResultUseCaseStub()
}
const makeFakeSaveSurveyResultInputData = (): TypeSurveyResultInputParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_user_id',
  answer: 'any_answer',
  createdAt: new Date()
})
const makeFakeSaveSurveyResultOutputData = (): TypeSurveyResultOutputParams => ({
  id: 'any_id',
  surveyId: 'any_survey_id',
  accountId: 'any_user_id',
  answer: 'any_answer',
  createdAt: new Date()
})

const makeSurveyLoadByIdUseCase = (): ILoadSurveyByIdDomain => {
  class LoadSurveyByIdUseCaseStub implements ILoadSurveyByIdDomain {
    async loadSurveyById (id: string): Promise<TypeSurveyOutputParams> {
      return await Promise.resolve(makeFakeSurveyData())
    }
  }
  return new LoadSurveyByIdUseCaseStub()
}
const makeFakeRequest = (): TypesHttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  },
  body: {
    answer: 'any_answer'
  },
  accountId: 'any_user_id'
})
const makeFakeSurveyData = (): TypeSurveyOutputParams => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  createdAt: new Date()
})

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdUseCaseStub: ILoadSurveyByIdDomain
  saveSurveyResultUseCaseStub: ISaveSurveyResultDomain
}
const makeSut = (): SutTypes => {
  const loadSurveyByIdUseCaseStub = makeSurveyLoadByIdUseCase()
  const saveSurveyResultUseCaseStub = makeSaveSurveyResultUseCase()
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
      await sut.handle(makeFakeRequest())
      expect(surveySpy).toHaveBeenCalledWith('any_survey_id')
    })

    test('Should return 403 if loadSurveyByIdUseCaseStub returns null', async () => {
      const { sut, loadSurveyByIdUseCaseStub } = makeSut()
      jest.spyOn(loadSurveyByIdUseCaseStub, 'loadSurveyById')
        .mockReturnValueOnce(Promise.resolve(null))
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(forBidden(new InvalidParamError('surveyId')))
    })

    test('Should return 500 if loadSurveyByIdUseCaseStub throws', async () => {
      const { sut, loadSurveyByIdUseCaseStub } = makeSut()
      jest.spyOn(loadSurveyByIdUseCaseStub, 'loadSurveyById').mockImplementationOnce(throwError)
      const httpResponse = await sut.handle(makeFakeRequest())
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
      await sut.handle(makeFakeRequest())
      expect(surveyResultSpy).toHaveBeenCalledWith(makeFakeSaveSurveyResultInputData())
    })

    test('Should return 200 on success', async () => {
      const { sut } = makeSut()
      const httpResonpse = await sut.handle(makeFakeRequest())
      expect(httpResonpse).toEqual(ok(makeFakeSaveSurveyResultOutputData()))
    })

    test('Should return 500 if saveSurveyResultUseCaseStub throws', async () => {
      const { sut, saveSurveyResultUseCaseStub } = makeSut()
      jest.spyOn(saveSurveyResultUseCaseStub, 'save').mockImplementationOnce(throwError)
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
})
