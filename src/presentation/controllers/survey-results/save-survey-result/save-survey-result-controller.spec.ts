import { SaveSurveyResultController } from './Save-survey-result-controller'
import { ILoadSurveyByIdDomain } from '@domain/useCases/surveys-domain-usecases/ILoad-survey-by-id'
import { TypesSurveyOutputModelDTO } from '@domain/models/ISurvey-model-domain'
import { TypesHttpRequest } from '@presentation/protocols'

const makeFakeRequest = (): TypesHttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
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
  test('Should calls loadSurveyByIdStub with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const surveyResultSpy = jest.spyOn(loadSurveyByIdStub, 'loadSurveyById')
    await sut.handle(makeFakeRequest())
    expect(surveyResultSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
