import { Collection, MongoClient } from 'mongodb'
export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useUnifiedTopology: true
    })
  },
  async desconnect (): Promise<void> {
    await this.client.close()
  },
  async getCollection (name: string): Collection {
    if (!this.client.db()) {
      await this.client.connect(this.uri)
    }
    return this.client.db().collection(name)
  },
  map (colletction: any): any {
    const { _id, ...accountResultWithoutId } = colletction
    return Object.assign({}, accountResultWithoutId, { id: _id })
  }
}
