export type TypeAuthenticationInputParams = {
  email: string
  password: string
}
export interface IAuthentication {
  auth: (authentication: TypeAuthenticationInputParams) => Promise<string>
}
