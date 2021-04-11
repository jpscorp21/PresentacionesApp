export class ErrorPresentacion extends Error {
  public readonly message: any;

  constructor(response: string | any) {
    super();
    this.message = response;
  }

  public toString(): string {
    return `Error: ${this.message}`;
  }
}
