import mockdate from 'mockdate'
import { TypeSurveyInputParams, IAddSurveyRepository } from './db-add-survey-usecase'
import { DbAddSurveyUseCase } from './db-add-survey-usecase-protocols'
import { throwError } from '@domain/test/test-error-helper'
import { mockAddSurveyRepository } from '@data/test'

type SutTypes = {
  sut: DbAddSurveyUseCase
  addSurveyRepositoryStub: IAddSurveyRepository
}
const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository()
  const sut = new DbAddSurveyUseCase(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}
const mockSurveyInputParams = (): TypeSurveyInputParams => ({
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
    await sut.add(mockSurveyInputParams())
    expect(addSpy).toHaveBeenCalledWith(mockSurveyInputParams())
  })

  it('Should throws if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockSurveyInputParams())
    await expect(promise).rejects.toThrow()
  })
})
