export interface IEncrypterToken {
  encrypt: (value: string) => Promise<string>
}
