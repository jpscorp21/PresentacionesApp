const errorGoogle = {
  isProblemLogin(mensajeError: string) {
      return typeof mensajeError === 'string' && mensajeError.indexOf('Login') > -1;
  },

  isInvalidCredentials(mensajeError: string) {
      return typeof mensajeError === 'string' && mensajeError.indexOf('Invalid Credentials') > -1;
  },

  isNotUnauthenticated(mensajeError: string) {
      return typeof mensajeError === 'string' && mensajeError.indexOf('Unauthenticated') > -1;
  }
}

export function isErrorGoogle(mensajeError: string): boolean {
  return Object.keys(errorGoogle).some((key) => errorGoogle[key](mensajeError));
}


