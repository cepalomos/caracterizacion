export default class ServerError extends Error {
  private readonly statusCode: number
  constructor (message: string, statusCode: number = 500) {
    super(message)
    this.statusCode = statusCode
  }

  public get StatusCode (): number {
    return this.statusCode
  }
}
