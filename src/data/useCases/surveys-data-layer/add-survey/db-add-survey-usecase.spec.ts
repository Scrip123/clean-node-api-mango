import mockdate from 'mockdate'
import { ISurveyInputModelDTO, IAddSurveyRepository } from './db-add-survey-usecase'
import { DbAddSurveyUseCase } from './db-add-survey-usecase-protocols'

const makeSutAddSurvey = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    async add (data: ISurveyInputModelDTO): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

interface ISutTypes {
  sut: DbAddSurveyUseCase
  addSurveyRepositoryStub: IAddSurveyRepository
}
const makeSut = (): ISutTypes => {
  const addSurveyRepositoryStub = makeSutAddSurvey()
  const sut = new DbAddSurveyUseCase(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}
const makeFakeSurveyData = (): ISurveyInputModelDTO => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_question'
  }],
  createdAt: new Date()
})
describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })
  afterAll(() => {
    mockdate.reset()
  })
  it('Should calls AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(makeFakeSurveyData())
    expect(addSpy).toHaveBeenCalledWith(makeFakeSurveyData())
  })

  it('Should throws if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeSurveyData())
    await expect(promise).rejects.toThrow()
  })
})
