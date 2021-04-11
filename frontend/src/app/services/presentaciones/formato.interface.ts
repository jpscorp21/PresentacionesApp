export interface IFormato {
  type: string;
  text: string;

  format(request: any, requests?: any[], tema?: string): any;
}
