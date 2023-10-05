import mockdate from 'mockdate'
import { LoadSurveyController } from './Load-survey-controller'
import { ISurveyOutputModelDTO, ILoadSurveyUseCaseDomain } from './load-survey-controller-protocols'
import { ok, serverError } from '@presentation/helpers/http/httpHelper'

const makeFakeSurveyRequest = (): ISurveyOutputModelDTO[] => {
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
interface ISutTypes {
  sut: LoadSurveyController
  loadSurveyStub: ILoadSurveyUseCaseDomain
}
const makeLoadSurvey = (): ILoadSurveyUseCaseDomain => {
  class LoadSurveyStub implements ILoadSurveyUseCaseDomain {
    async loadSurveys (): Promise<ISurveyOutputModelDTO[]> {
      return await new Promise(resolve => resolve(makeFakeSurveyRequest()))
    }
  }
  return new LoadSurveyStub()
}
const makeSut = (): ISutTypes => {
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

  it('should reutrns 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveyStub } = makeSut()
    jest.spyOn(loadSurveyStub, 'loadSurveys')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
