import { ISaveSurveyResultRepository } from '@data/protocols/db/surveys/ISave-survey-result-repository'
import { TypeSurveyResultInputParams, TypeSurveyResultOutputParams } from '@domain/models/Types-survey-result-model'
import { MongoHelper } from '../helpers/mongoHelper'

export class SurveyResultMongoRepository implements ISaveSurveyResultRepository {
  async save (data: TypeSurveyResultInputParams): Promise<TypeSurveyResultOutputParams> {
    const surveyResultCollecction = await MongoHelper.getCollection('surveyResults')
    const surveyResult = await surveyResultCollecction.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    }, {
      $set: {
        answer: data.answer,
        createdAt: data.createdAt
      }
    }, {
      upsert: true,
      returnOriginal: false
    })
    return surveyResult.value && MongoHelper.map(surveyResult.value)
  }
}
