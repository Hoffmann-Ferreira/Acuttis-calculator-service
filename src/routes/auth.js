// import {prisma} from '../lib/prisma';

export async function authRoutes(app){
    
    // eslint-disable-next-line no-unused-vars
    app.get('/test', async (request) => {
        return { hello: 'world' }
      })
}

