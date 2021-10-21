import { HttpRequest, HttpResponse} from '../http/http-interfaces'
import { Controller } from '../protocols/controller'

export interface AddBookRequest {
  title: string
  description: string
  price: number
  publisher: string
  photo: string
  authors: Array<string>
}

export class AddBookController implements Controller {
	async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
		const requiredParams = ['title', 'description', 'price', 'publisher', 'photo', 'authors']
		for (const param of requiredParams) {
			if (!httpRequest.body[param]) {
				return { statusCode: 400, body: `Missing param ${param}` }
			}
		}

    const { title, description, price, publisher, photo, authors }: AddBookRequest = httpRequest.body
    if (typeof title !== 'string') {
      return { statusCode: 400, body: 'Invalid param title' }
    }
    if (typeof description !== 'string') {
      return { statusCode: 400, body: 'Invalid param description' }
    }
    if (typeof price !== 'number') {
      return { statusCode: 400, body: 'Invalid param price' }
    }
    if (typeof publisher !== 'string') {
      return { statusCode: 400, body: 'Invalid param publisher' }
    }
    if (typeof photo !== 'string') {
      return { statusCode: 400, body: 'Invalid param photo' }
    }
    if (!(authors instanceof Array) || authors.length === 0) {
      return { statusCode: 400, body: 'Invalid param authors' }
    }
    if (authors.some(author => typeof author !== 'string' || !author)) {
      return { statusCode: 400, body: 'Invalid param authors' }
    }
		return new Promise(resolve => resolve({statusCode: 100, body: ''}))
	}
}