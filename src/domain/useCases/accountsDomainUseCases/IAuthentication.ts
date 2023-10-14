export type TypesAuthenticationModel = {
  email: string
  password: string
}
export interface IAuthentication {
  auth: (authentication: TypesAuthenticationModel) => Promise<string>
}
