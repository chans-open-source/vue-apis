export default class ApiOptions {
  static assemble(key: string, value: string, token: any): void

  setUrl(url: string): ApiOptions

  setMethod(method: string): ApiOptions

  setData(data: object): ApiOptions

  setParams(params: object): ApiOptions

  setTimeout(timeout: number): ApiOptions

  setMaxContentLength(maxContentLength: number): ApiOptions

  setHeaders(headers: object): ApiOptions

  setSilence(isSilence: boolean): ApiOptions

  request(): Promise<any>
}
