import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.js';

dotenv.config();

const server = fastify();
const secretKey = process.env.SECRET_KEY;

server.register(fastifyJwt, {
  secret: secretKey,
});

server.register(authRoutes);

server.listen({ port: 3333 }, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('👨‍💻 HTTP server running on http://localhost:3333');
});
