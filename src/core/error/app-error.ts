import { StatusCodes } from 'http-status-codes'

/**
 * @extends Error
 */
export class AppError extends Error {
  constructor(
    public message: string,
    public status: StatusCodes, // http status code
    public isPublic: boolean,
    public code: string | number = status
  ) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
  }
}
