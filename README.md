## Rest-api för Laboration 2.2
Webbtjänst byggd med Node.js, Fastify och MongoDB. API:t hanterar boksamling med full CRUD-funktionalitet och validering av data.

## CRUD för böcker


| Metod  | Ändpunkt        | Beskrivning                                                       |
|--------|-----------------|-------------------------------------------------------------------|
| GET    | /books          | Hämtar alla böcker från databasen.                                |
| GET    | /books/:id      | Hämtar en specifik bok baserat på ID.                             |
| POST   | /books          | Lägger till en ny bok.                                            |
| PUT    | /books/:id      | Uppdaterar information för en bok baserat på id.                  |
| DELETE | /books/:id      | Tar bort en bok baserat på id.                                    |

Exempel på POST:

```json
{
   "title": "Min favoritbok",
   "author": "Astrid Lindgren.",
   "pages": 120,
   "isRead": false
}
```
## Databasstruktur
book

| _id | title | author | pages | isRead |


## Tekniker

**Node.js**
**Fastify**
**MongoDB**
**dotenv**
**@fastify/mongodb**
**@fastify/CORS**
