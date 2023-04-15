export default class AppError extends Error {
  statusCode;

  constructor(statusCode: number, message: any) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
