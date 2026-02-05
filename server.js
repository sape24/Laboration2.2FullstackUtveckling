import Fastify from 'fastify'
import fastifyMongodb from '@fastify/mongodb'
import dotenv from 'dotenv'
import bookRoutes from './routes/bookRoutes.js'

dotenv.config()

const fastify = Fastify({
    logger: true
})

fastify.register(fastifyMongodb, {
    url: process.env.MONGO_URL
})

fastify.register(bookRoutes)

fastify.get('/', async (request, reply) => {
    return {message: 'Bok-API hämtad'}
})

try {
    await fastify.listen ({
        port: process.env.PORT || 3000,
        host: '0.0.0.0'
    })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}