export interface ILogErrorRepositor {
  log: (stack: string) => Promise<void>
}
