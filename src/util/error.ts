// src/utils/errors.ts
export class CustomError extends Error {
    public statusCode: number;
    public message: string;
  
    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }
  
  export class BadRequestError extends CustomError {
    constructor(message: string = 'Bad Request') {
      super(400, message);
    }
  }
  
  export class UnauthorizedError extends CustomError {
    constructor(message: string = 'Unauthorized') {
      super(401, message);
    }
  }
  
  export class NotFoundError extends CustomError {
    constructor(message: string = 'Not Found') {
      super(404, message);
    }
  }
  