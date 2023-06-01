import bcrypt from 'bcrypt'
import { IEncrypter } from 'data/protocols/IEncrypter'

export class BcrypterAdapter implements IEncrypter {
  constructor (private readonly salt: number) {}
  async encrypt (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}
