import { MongoHelper } from '../helpers/mongoHelper'
import { LogErrorRepository } from './LogErrorMongoRepository'
import { Collection } from 'mongodb'

const makeSut = (): LogErrorRepository => {
  return new LogErrorRepository()
}
describe('log Error MongoDb Repository', () => {
  let errorCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.desconnect()
  })
  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })
  it('Should create an error log on sucess', async () => {
    const sut = makeSut()
    await sut.logError('any_stack')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
