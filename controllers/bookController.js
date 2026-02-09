import { ObjectId } from "mongodb";

//Hämtar alla böcker
export const getAllBooks = async (request, reply) => {
    const collection = request.server.mongo.db.collection('books')  //skapar en variabelk av books collection i databasen
    const result = await collection.find().toArray()                      //hämtar alla dokument och konvertera till en array
    return result
}

//Hämta en specifik bok med hjälp av id
export const getBookByID = async (request, reply) => {
    const collection = request.server.mongo.db.collection('books')      
    const {id} = request.params       //Hämta id från URLen

    try{
        const book = await collection.findOne({_id: new ObjectId(id)})           //konvertera strängen id till objectid så mongodb hittar den
        if (!book) return reply.code(404).send({error: 'Boken hittades inte'})       //om ingen bok hittas skickar tillbaka 404
            return book
    } catch (err){
        return reply.code(400).send({error: 'Ogiltigt ID'})
    }
}


//Lägg till en bok
export const addBook = async (request, reply) => {
    const collection = request.server.mongo.db.collection('books')
    const newBook = request.body                         //datan kommer i body
    
    const result = await collection.insertOne(newBook)    //spara boken i databasen

    return {           //return en bekräftelse och det nya idt
        message: 'Bok tillagd',
        id: result.insertedId,
        book: newBook
    }
}

//Uppdatera en bok
export const updateBook = async (request, reply) => {
    const collection = request.server.mongo.db.collection('books')
    const {id} = request.params
    const updates = request.body          //De nya värdena som ska sparas
    
    try{
        const result = await collection.updateOne(       //hitta boken med rätt id och uppdatera den $set skriver över det angivna fältet
            { _id: new ObjectId(id)},
            { $set: updates}
        )

        if (result.matchedCount === 0) return reply.code(404).send({ error: 'Boken hittades inte'})   //om ingen bok matchar id 
        
        return {message: 'Bok uppdaterad'} 
    } catch (err) {
        return reply.code(400).send({ error: 'Ogiltigt ID'})
    }
}


//Ta bort en bok
export const deleteBook = async (request, reply) => {
    const collection = request.server.mongo.db.collection('books')
    const {id} = request.params

    try{
        const result = await collection.deleteOne({_id: new ObjectId(id)})          //Radera boken med angivna idt
        if (result.deletedCount === 0) return reply.code(404).send({error: 'Boken hittades inte'})     //om inget raderades fanns inte boken

        return {message: `Bok med id ${id} är borttagen`}
    } catch (err){
        return reply.code(400).send({error:'Ogiltigt ID'})
    }
}