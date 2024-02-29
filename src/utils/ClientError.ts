export default class ClientError extends Error {
  private readonly statusCode: number
  constructor (message: string, statusCode: number = 400) {
    super(message)
    this.statusCode = statusCode
  }

  public get StatusCode (): number {
    return this.statusCode
  }
}
