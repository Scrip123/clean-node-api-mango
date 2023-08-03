import bcrypt from 'bcrypt'
import { IHasher } from '@data/protocols/cryptografy/IHasher'

export class BcrypterAdapter implements IHasher {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
