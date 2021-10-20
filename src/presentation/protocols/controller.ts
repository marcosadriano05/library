import { HttpRequest, HttpResponse } from '../http/http-interfaces'

export interface Controller {
	handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}