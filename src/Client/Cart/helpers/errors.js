export class CommerceError extends Error {
  constructor({ message, code, errors }) {
    const error = message ? { message, ...(code ? { code } : {}) } : errors[0];

    super(error.message);
    this.errors = message ? [error] : errors;

    if (error.code) {
      this.code = error.code;
    }
  }
}

export function getCustomMessage(code, message) {
  switch (code) {
    case 'UNIDENTIFIED_CUSTOMER':
      return 'Cannot find an account that matches the provided credentials';

    default:
      return message;
  }
}

export function throwUserErrors(errors) {
  if (errors && errors.length) {
    throw new CommerceError({
      code: 'validation_error',
      errors: errors.map(({ code, message }) => ({
        code: code ?? 'validation_error',
        message: getCustomMessage(code, message),
      })),
    });
  }
}
