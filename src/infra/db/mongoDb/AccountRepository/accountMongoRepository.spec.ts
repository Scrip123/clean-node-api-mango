import { MongoHelper } from '../helpers/mongoHelper'
import { AccountMongoRepository } from './AccountMongoRepository'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}
describe('Account MongoDb Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.desconnect()
  })
  it('Should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toEqual('any_name')
    expect(account.email).toEqual('any_email@gmail.com')
    expect(account.password).toEqual('any_password')
  })
})
