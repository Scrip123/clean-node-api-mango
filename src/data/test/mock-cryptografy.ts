import { IDecrypter } from '@data/protocols/cryptografy/IDecrypter'
import { IHashCompare } from '@data/protocols/cryptografy/IHashCompare'
import { IHasher } from '@data/protocols/cryptografy/IHasher'
import { IEncrypterToken } from '@data/protocols/db/account/IEncrypterToken'

export const mockEncrypter = (): IHasher => {
  class EncryptStub implements IHasher {
    async hash (value: string): Promise<string> {
      return await new Promise((resolve, reject) => { resolve('any_password') })
    }
  }
  return new EncryptStub()
}
export const mockEncrypterToken = (): IEncrypterToken => {
  class EncrypterTokenStub implements IEncrypterToken {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new EncrypterTokenStub()
}

export const mockDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

export const mockHahsComapre = (): IHashCompare => {
  class HashCompareStub implements IHashCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }
  return new HashCompareStub()
}
