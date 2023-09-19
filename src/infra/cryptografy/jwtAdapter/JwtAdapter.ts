import jwt from 'jsonwebtoken'
import { IEncrypter } from '@data/protocols/cryptografy/IEncrypter'
import { IDecrypter } from '@data/protocols/cryptografy/IDecrypter'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (private readonly secret: string) {}
  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (token: string): Promise<string> {
    const value: any = jwt.verify(token, this.secret)
    return value
  }
}
