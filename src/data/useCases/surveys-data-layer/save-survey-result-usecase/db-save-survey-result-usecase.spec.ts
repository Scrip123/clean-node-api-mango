import mockdate from 'mockdate'
import { TypeSurveyResultInputModelDTO, TypeSurveyResultOutputModelDTO } from '@domain/models/Types-survey-result-model'
import { ISaveSurveyResultRepository } from '@data/protocols/db/surveys/ISave-survey-result-repository'
import { DbSaveSurveyResultUseCase } from './Db-save-survey-result-usecase'

const makeSaveSurveyResult = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    async save (data: TypeSurveyResultInputModelDTO): Promise<TypeSurveyResultOutputModelDTO> {
      return await new Promise(resolve => resolve(makeFakeSurveyResultOutputData()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

type SutTypes = {
  sut: DbSaveSurveyResultUseCase
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository
}
const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResult()
  const sut = new DbSaveSurveyResultUseCase(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}
const makeFakeSurveyResultInputData = (): TypeSurveyResultInputModelDTO => ({
  surveyId: 'any_survey_id',
  accountId: 'user_id',
  answer: 'any_answer',
  createdAt: new Date()
})
const makeFakeSurveyResultOutputData = (): TypeSurveyResultOutputModelDTO => ({
  id: 'any_id',
  surveyId: 'any_survey_id',
  accountId: 'user_id',
  answer: 'any_answer',
  createdAt: new Date()
})
describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })
  afterAll(() => {
    mockdate.reset()
  })
  it('Should calls SaveSurveyResultRepositoryStub with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    await sut.save(makeFakeSurveyResultInputData())
    expect(saveSpy).toHaveBeenCalledWith(makeFakeSurveyResultInputData())
  })

  it('Should return survey result on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(makeFakeSurveyResultInputData())
    expect(surveyResult).toEqual(makeFakeSurveyResultOutputData())
  })

  it('Should throw if SaveSurveyResultRepositoryStub throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.save(makeFakeSurveyResultInputData())
    await expect(promise).rejects.toThrow()
  })
})
