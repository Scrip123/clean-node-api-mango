import { ILogErrorRepository } from '@data/protocols/ILogErrorRepository'
import { MongoHelper } from '../helpers/mongoHelper'

export class LogErrorRepository implements ILogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorColletction = await MongoHelper.getCollection('errors')
    await errorColletction.insertOne({
      stack,
      date: new Date()
    })
  }
}
