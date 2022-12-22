export class CommerceError extends Error {
  constructor({ message, code, errors }) {
    const error = message
      ? { message, ...(code ? { code } : {}) }
      : errors[0];

      super(error.message);
      this.errors = message ? [error] : errors;

      if (error.code) {
        this.code = error.code;
      }
  }
}

export class ValidationError extends CommerceError {
  constructor(options) {
    super(options);
    this.code = 'validation_error';
  }
}

export function getCustomMessage(code, message) {
  switch (code) {
    case 'UNIDENTIFIED_CUSTOMER':
      message = 'Cannot find an account that matches the provided credentials';
      break;
  }

  return message;
}

export function throwUserErrors(errors) {
  if (errors && errors.length) {
    throw new ValidationError({
      errors: errors.map(({ code, message }) => ({
        code: code ?? 'validation_error',
        message: getCustomMessage(code, message),
      })),
    });
  }
}
