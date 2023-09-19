import jwt from 'jsonwebtoken'
import { IEncrypter } from '@data/protocols/cryptografy/IEncrypter'
import { IDecrypter } from '@data/protocols/cryptografy/IDecrypter'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (private readonly secret: string) {}
  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (value: string): Promise<string> {
    jwt.verify(value, this.secret)
    return await new Promise(resolve => resolve(null))
  }
}
