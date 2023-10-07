import { IAddSurveyRepository } from '@data/protocols/db/surveys/IAdd-survey-repository'
import { MongoHelper } from '../helpers/mongoHelper'
import { ISurveyInputModelDTO, ISurveyOutputModelDTO } from '@domain/models/ISurvey-model-domain'
import { ILoadSurveysRepository } from '@data/protocols/db/surveys/ILoad-survey-repository'

export class SurveyMongoRepository implements IAddSurveyRepository, ILoadSurveysRepository {
  async add (data: ISurveyInputModelDTO): Promise<void> {
    const surveysCollecction = await MongoHelper.getCollection('surveys')
    await surveysCollecction.insertOne(data)
  }

  async loadAllSurveys (): Promise<ISurveyOutputModelDTO[]> {
    const surveysCollecction = await MongoHelper.getCollection('surveys')
    const surveys: ISurveyOutputModelDTO[] = await surveysCollecction.find().toArray()
    return surveys
  }
}
