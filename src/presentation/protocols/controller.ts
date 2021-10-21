import { HttpRequest, HttpResponse } from './http-interfaces'

export interface Controller {
	handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}