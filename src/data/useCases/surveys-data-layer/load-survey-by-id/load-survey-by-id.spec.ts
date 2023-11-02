import mockdate from 'mockdate'
import { DbLoadSurveyByIdUseCase } from './Load-survey-by-id-usecase'
import { ILoadSurveyByIdRepository, TypeSurveyOutputParams } from './load-survey-by-id-usecase-protocols'

const makeFakeSurveyData = (): TypeSurveyOutputParams => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_question'
  }],
  createdAt: new Date()
})
const makeLoadSurveyById = (): ILoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements ILoadSurveyByIdRepository {
    async loadById (id: string): Promise<TypeSurveyOutputParams> {
      return await Promise.resolve(makeFakeSurveyData())
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}
interface SutTypes {
  sut: DbLoadSurveyByIdUseCase
  loadSurveyByIdRepositoryStub: ILoadSurveyByIdRepository
}
const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyById()
  const sut = new DbLoadSurveyByIdUseCase(loadSurveyByIdRepositoryStub)
  return {
    sut,
    loadSurveyByIdRepositoryStub
  }
}
describe('Load Survey By Id', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })
  afterAll(() => {
    mockdate.reset()
  })
  it('Should call LoadSurveyByIdRepository with correct values', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadSurveyById('any_id')
    expect(loadSpy).toHaveBeenCalled()
  })
  it('Should return null if LoadSurveyByIdRepository has not exist', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const survey = await sut.loadSurveyById('any_id')
    expect(survey).toBeNull()
  })
  it('Should return survey on success', async () => {
    const { sut } = makeSut()
    const survey = await sut.loadSurveyById('any_id')
    expect(survey).toEqual(makeFakeSurveyData())
  })

  it('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.loadSurveyById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
