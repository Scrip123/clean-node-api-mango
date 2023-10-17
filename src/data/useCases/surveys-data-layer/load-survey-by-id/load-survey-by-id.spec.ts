import mockdate from 'mockdate'
import { DbLoadSurveyByIdUseCase } from './Load-survey-by-id-usecase'
import { ILoadSurveyByIdRepository, TypesSurveyOutputModelDTO } from './load-survey-by-id-usecase-protocols'

const makeFakeSurveyData = (): TypesSurveyOutputModelDTO => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_question'
  }],
  createdAt: new Date()
})
const makeLoadSurveyById = (): ILoadSurveyByIdRepository => {
  class LoadSurveyByIdStub implements ILoadSurveyByIdRepository {
    async loadById (id: string): Promise<TypesSurveyOutputModelDTO> {
      return await Promise.resolve(makeFakeSurveyData())
    }
  }
  return new LoadSurveyByIdStub()
}
interface SutTypes {
  sut: DbLoadSurveyByIdUseCase
  loadSurveyByIdStub: ILoadSurveyByIdRepository
}
const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById()
  const sut = new DbLoadSurveyByIdUseCase(loadSurveyByIdStub)
  return {
    sut,
    loadSurveyByIdStub
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
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.loadSurveyById('any_id')
    expect(loadSpy).toHaveBeenCalled()
  })
  it('Should return null if LoadSurveyByIdRepository has not exist', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById')
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
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.loadSurveyById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
