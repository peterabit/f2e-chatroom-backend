import { StatusCodes } from 'http-status-codes'
import { AppError } from './app-error'

export class AccountDuplicateError extends AppError {
  constructor(message = '帳戶名稱已被使用') {
    super(message, StatusCodes.CONFLICT, true)
  }
}
