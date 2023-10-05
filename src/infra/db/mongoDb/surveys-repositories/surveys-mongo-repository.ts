import { IAddSurveyRepository } from '@data/protocols/db/surveys/IAdd-survey-repository'
import { MongoHelper } from '../helpers/mongoHelper'
import { ISurveyInputModelDTO } from '@domain/models/ISurvey-model-domain'

export class SurveyMongoRepository implements IAddSurveyRepository {
  async add (data: ISurveyInputModelDTO): Promise<void> {
    const surveysCollecction = await MongoHelper.getCollection('surveys')
    await surveysCollecction.insertOne(data)
  }
}
