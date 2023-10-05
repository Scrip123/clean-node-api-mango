import mockdate from 'mockdate'
import { LoadSurveyController } from './Load-survey-controller'
import { IAddSurveyOutputModelDTO, ILoadSurveyUseCaseDomain } from './load-survey-controller-protocols'

const makeFakeSurveyRequest = (): IAddSurveyOutputModelDTO[] => {
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
describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })
  afterAll(() => {
    mockdate.reset()
  })

  it('Should calls LoadSurveys', async () => {
    class LoadSurveyStub implements ILoadSurveyUseCaseDomain {
      async loadSurveys (): Promise<IAddSurveyOutputModelDTO[]> {
        return await new Promise(resolve => resolve(makeFakeSurveyRequest()))
      }
    }
    const loadSurveyStub = new LoadSurveyStub()
    const sut = new LoadSurveyController(loadSurveyStub)
    const loadSpy = jest.spyOn(loadSurveyStub, 'loadSurveys')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
