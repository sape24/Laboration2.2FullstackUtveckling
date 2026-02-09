import * as bookController from '../controllers/bookController.js'
import {bookSchema} from '../models/bookModel.js'

export default async function (fastify, options) {
    fastify.get('/books', bookController.getAllBooks)      //Get där man hämtar listan av böcker

    fastify.get('/books/:id', bookController.getBookByID)      //get där man hämtar detaljer om en specifik bok via ID

    fastify.post('/books', {schema: bookSchema}, bookController.addBook)        //post där man skapar en ny bok där schemat används för validering

    fastify.put('/books/:id', bookController.updateBook)            //put där man uppdatera information om en befintlig bok

    fastify.delete('/books/:id', bookController.deleteBook)            //delete där man tar bort en bok  
}