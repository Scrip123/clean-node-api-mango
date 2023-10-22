import { ISaveSurveyResultRepository } from '@data/protocols/db/surveys/ISave-survey-result-repository'
import { TypeSurveyResultInputModelDTO, TypeSurveyResultOutputModelDTO } from '@domain/models/Types-survey-result-model'
import { MongoHelper } from '../helpers/mongoHelper'

export class SurveyResultMongoRepository implements ISaveSurveyResultRepository {
  async save (data: TypeSurveyResultInputModelDTO): Promise<TypeSurveyResultOutputModelDTO> {
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
