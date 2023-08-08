import jwt from 'jsonwebtoken'
import { IHasher } from '@data/protocols/cryptografy/IHasher'

export class JwtAdapter implements IHasher {
  constructor (private readonly secret: string) {}
  async hash (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }
}
