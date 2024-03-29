import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import { authRoutes } from './routes/auth.js';
import { serviceHours } from './routes/serviceHours.js';

dotenv.config();

const server = fastify();
const secretKey = process.env.SECRET_KEY;

server.register(fastifyJwt, {
  secret: secretKey,
});

server.register(cors, {
  origin: true,
});

server.register(authRoutes);
server.register(serviceHours)

server.listen({ port: 3333 }, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('👨‍💻 HTTP server running on http://localhost:3333');
});
