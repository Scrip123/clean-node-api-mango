import mockdate from 'mockdate'
import { SaveSurveyResultController } from './Save-survey-result-controller'
import { ILoadSurveyByIdDomain } from '@domain/useCases/surveys-domain-usecases/ILoad-survey-by-id'
import { TypesSurveyOutputModelDTO } from '@domain/models/ISurvey-model-domain'
import { TypesHttpRequest } from '@presentation/protocols'
import { forBidden, serverError } from '@presentation/helpers/http/httpHelper'
import { InvalidParamError } from '@presentation/errors'

const makeFakeRequest = (): TypesHttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  },
  body: {
    answer: 'any_answer'
  }
})
const makeFakeSurveyData = (): TypesSurveyOutputModelDTO => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_question'
  }],
  createdAt: new Date()
})
const makeSaveSurveyResult = (): ILoadSurveyByIdDomain => {
  class LoadSurveyByIdStub implements ILoadSurveyByIdDomain {
    async loadSurveyById (id: string): Promise<TypesSurveyOutputModelDTO> {
      return await Promise.resolve(makeFakeSurveyData())
    }
  }
  return new LoadSurveyByIdStub()
}
type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: ILoadSurveyByIdDomain
}
const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeSaveSurveyResult()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub)
  return {
    sut,
    loadSurveyByIdStub
  }
}
describe('Save survey results controller', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })
  afterAll(() => {
    mockdate.reset()
  })

  test('Should calls loadSurveyByIdStub with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const surveyResultSpy = jest.spyOn(loadSurveyByIdStub, 'loadSurveyById')
    await sut.handle(makeFakeRequest())
    expect(surveyResultSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return 403 if loadSurveyByIdStub returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadSurveyById')
      .mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forBidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if loadSurveyByIdStub throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadSurveyById')
      .mockReturnValueOnce(Promise.reject(new Error()))
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
