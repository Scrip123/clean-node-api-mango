import { IAddSurveyRepository } from '@data/protocols/db/surveys/IAdd-survey-repository'
import { IAddSurveyInputModelDTO } from '@domain/useCases/surveys-domain-usecases/add-survey-model'
import { MongoHelper } from '../helpers/mongoHelper'

export class SurveyMongoRepository implements IAddSurveyRepository {
  async add (data: IAddSurveyInputModelDTO): Promise<void> {
    const surveysCollecction = await MongoHelper.getCollection('surveys')
    await surveysCollecction.insertOne(data)
  }
}
