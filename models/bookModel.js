export const bookSchema = {
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