import Fastify from 'fastify'
import fastifyMongodb from '@fastify/mongodb'
import fastifyCors from '@fastify/cors'
import dotenv from 'dotenv'
import bookRoutes from './routes/bookRoutes.js'

dotenv.config()                             //läser in variablerna från .env

const fastify = Fastify({                      //skapar en instans av fastify och aktiverar loggning
    logger: true
})

fastify.register(fastifyCors, {                    //Registrerar CORS så att alla frontend kan prata med APIt
    origin: '*'
})

fastify.register(fastifyMongodb, {                //registerar MongoDB pluginet och hämtar urlen med lösenordet från .env
    url: process.env.MONGO_URL
})

fastify.register(bookRoutes)                           //registrerar routes

fastify.get('/', async (request, reply) => {           //enkel testroute för att se servern är igång
    return {message: 'Bok-API är igång'}                      
})

try {                                                     //startar servern 
    await fastify.listen ({                                  //använder porten från render eller 3000 lokalt
        port: process.env.PORT || 3000,
        host: '0.0.0.0'
    })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}