export enum ErrorCode {
  IncorrectEmailPassword = "incorrect-email-password",
  InternalServerError = "internal-server-error",
}

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(400, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor() {
    super(401, "Unauthorized");
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

export class InternalServerError extends AppError {
  constructor(message = "Internal Server Error") {
    super(500, message);
  }
}

export class UnauthenticatedError extends Error {
  constructor(message: string = "Unauthenticated") {
    super(message);
    this.name = "UnauthenticatedError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string = "Not Found") {
    super(message);
    this.name = "NotFoundError";
  }
}
