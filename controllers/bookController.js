import { ObjectId } from "mongodb";

export const getAllBooks = async (request, reply) => {
    const collection = request.server.mongo.db.collection('books')
    const {id} = request.params
    const result = await collection.find().toArray()
    return result
}

export const getBookByID = async (request, reply) => {
    const collection = request.server.mongo.db.collection('books')
    const {id} = request.params

    try{
        const book = await collection.findOne({_id: new ObjectId(id)})
        if (!book) return reply.code(404).send({error: 'Boken hittades inte'})
            return book
    } catch (err){
        return reply.code(400).send({error: 'Ogiltigt ID'})
    }
}

export const addBook = async (request, reply) => {
    const collection = request.server.mongo.db.collection('books')
    const newBook = request.body
    
    const result = await collection.insertOne(newBook)

    return {
        message: 'Bok tillagd',
        id: result.insertedId,
        book: newBook
    }
}

export const updateBook = async (request, reply) => {
    const collection = request.server.mongo.db.collection('books')
    const {id} = request.params
    const updates = request.body
    
    try{
        const result = await collection.updateOne(
            { _id: new ObjectId(id)},
            { $set: updates}
        )

        if (result.matchedCount === 0) return reply.code(404).send({ error: 'Boken hittades inte'})
        
        return {message: 'Bok uppdaterad'} 
    } catch (err) {
        return reply.code(400).send({ error: 'Ogiltigt ID'})
    }
}

export const deleteBook = async (request, reply) => {
    const collection = request.server.mongo.db.collection('books')
    const {id} = request.params

    try{
        const result = await collection.deleteOne({_id: new ObjectId(id)})
        if (result.deletedCount === 0) return reply.code(404).send({error: 'Boken hittades inte'})

        return {message: `Bok med id${id} är borttagen`}
    } catch (err){
        return reply.code(400).send({error:'Ogiltigt ID'})
    }
}