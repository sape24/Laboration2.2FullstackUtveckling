export const bookSchema = {           //schema för validering av data, detta säkertställer att man inte får in felaktig data i databasen
    body: {
        type: 'object',
        required: ['title', 'author', 'pages', 'isRead'],
        properties: {
            title: {type: 'string'},
            author: {type: 'string'},
            pages: {type: 'integer'},
            isRead: {type: 'boolean'}
        }
    }
}