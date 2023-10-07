import mockdate from 'mockdate'
import { DbLoadSurveysUseCase } from './Db-load-surveys-usecase'
import { ILoadSurveysRepository, ISurveyOutputModelDTO } from './db-load-surveys-usecase-protocols'

const makeLoadSurveysRepository = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    async loadAllSurveys (): Promise<ISurveyOutputModelDTO[]> {
      return await new Promise(resolve => resolve(makeFakeSurveysOutputData()))
    }
  }
  return new LoadSurveysRepositoryStub()
}
interface ISutTypes {
  sut: DbLoadSurveysUseCase
  loadSurveysRepositoryStub: ILoadSurveysRepository
}
const makeSut = (): ISutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepository()
  const sut = new DbLoadSurveysUseCase(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

const makeFakeSurveysOutputData = (): ISurveyOutputModelDTO [] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_question'
      }],
      createdAt: new Date()
    }
  ]
}
describe('Db LoadSurveys useCase', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })
  afterAll(() => {
    mockdate.reset()
  })
  it('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAllSurveys')
    await sut.loadSurveys()
    expect(loadSpy).toHaveBeenCalled()
  })

  it('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.loadSurveys()
    expect(surveys).toEqual(makeFakeSurveysOutputData())
  })

  it('Should throws if AddSurveyRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAllSurveys')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadSurveys()
    await expect(promise).rejects.toThrow()
  })
})
