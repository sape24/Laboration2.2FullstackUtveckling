import * as bookController from '../controllers/bookController.js'
import {bookSchema} from '../models/bookModel.js'

export default async function (fastify, options) {
    fastify.get('/books', bookController.getAllBooks)

    fastify.get('/books/:id', bookController.getBookByID)

    fastify.post('/books', {schema: bookSchema}, bookController.addBook)

    fastify.put('/books/:id', bookController.updateBook)

    fastify.delete('/books/:id', bookController.deleteBook)
}