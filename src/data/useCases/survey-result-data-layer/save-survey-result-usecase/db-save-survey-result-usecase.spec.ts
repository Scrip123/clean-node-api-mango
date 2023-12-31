import mockdate from 'mockdate'
import { DbSaveSurveyResultUseCase } from './Db-save-survey-result-usecase'
import { ISaveSurveyResultRepository } from './db-save-survey-result-usecase-protocols'
import { throwError } from '@domain/test/test-error-helper'
import { mockSurveyResultInputParams, mockSurveyResultOutputParams } from '@domain/test'
import { mockSaveSurveyResultRepository } from '@data/test'

type SutTypes = {
  sut: DbSaveSurveyResultUseCase
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository
}
const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResultUseCase(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

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
    await sut.save(mockSurveyResultInputParams())
    expect(saveSpy).toHaveBeenCalledWith(mockSurveyResultInputParams())
  })

  it('Should return survey result on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(mockSurveyResultInputParams())
    expect(surveyResult).toEqual(mockSurveyResultOutputParams())
  })

  it('Should throw if SaveSurveyResultRepositoryStub throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockSurveyResultInputParams())
    await expect(promise).rejects.toThrow()
  })
})
