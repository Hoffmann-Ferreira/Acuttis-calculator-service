import fastify from 'fastify';

const server = fastify();

server.listen({ port: 3333 }, (err) => {
  if (err) {
    console.log(err);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }

  console.log('👨‍💻 HTTP server running on http://localhost:3333');
});
