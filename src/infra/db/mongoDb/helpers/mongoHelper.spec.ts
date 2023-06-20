import { MongoHelper as sut } from './mongoHelper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await sut.desconnect()
  })
  it('Should reconnect if mongoDb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.desconnect()
    accountCollection = await sut.getCollection('accounts')
  })
})
