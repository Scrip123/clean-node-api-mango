import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url, {
      useUnifiedTopology: true
    })
  },
  async desconnect (): Promise<void> {
    await this.client.close()
  },
  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },
  map (colletction: any): any {
    const { _id, ...accountResultWithoutId } = colletction
    return Object.assign({}, accountResultWithoutId, { id: _id })
  }
}
