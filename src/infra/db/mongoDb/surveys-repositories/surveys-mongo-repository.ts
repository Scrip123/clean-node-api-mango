import { IAddSurveyRepository } from '@data/protocols/db/surveys/IAdd-survey-repository'
import { MongoHelper } from '../helpers/mongoHelper'
import { TypesSurveyInputModelDTO, TypesSurveyOutputModelDTO } from '@domain/models/ISurvey-model-domain'
import { ILoadSurveysRepository } from '@data/protocols/db/surveys/ILoad-survey-repository'
import { ILoadSurveyByIdRepository } from '@data/protocols/db/surveys/ILoad-survey-by-id-repository'

export class SurveyMongoRepository implements
IAddSurveyRepository, ILoadSurveysRepository, ILoadSurveyByIdRepository {
  async add (data: TypesSurveyInputModelDTO): Promise<void> {
    const surveysCollecction = await MongoHelper.getCollection('surveys')
    await surveysCollecction.insertOne(data)
  }

  async loadAllSurveys (): Promise<TypesSurveyOutputModelDTO[]> {
    const surveysCollecction = await MongoHelper.getCollection('surveys')
    const surveys = await surveysCollecction.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<TypesSurveyOutputModelDTO> {
    const surveysCollecction = await MongoHelper.getCollection('surveys')
    const survey = await surveysCollecction.findOne({ _id: id })
    return survey && MongoHelper.map(survey)
  }
}
