import { prisma } from '../lib/prisma.js';
import * as yup from 'yup';
import bcrypt from 'bcrypt';

export async function authRoutes(app) {
  app.setErrorHandler(function (error, request, reply) {
    console.error('Ocorreu um erro:', error.message);
    const menssageError = error.message;

    reply.status(400).send({ menssageError });
  });

  app.post('/register', async (request, reply) => {
    const bodySchema = yup.object({
      name: yup.string().required('Preenchimento obrigatório'),
      email: yup
        .string()
        .email('Email inválido')
        .required('Preenchimento obrigatório'),
      password: yup
        .string()
        .matches(
          /((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
          'A senha deve incluir pelo menos 8 caracteres, uma letra maiúscula um dígito e caracter especial'
        )
        .required('Preenchimento obrigatório'),
    });

    const date = await bodySchema.validate(request.body);

    const verifyUser = await prisma.user.findUnique({
      where: {
        email: date.email,
      },
    });

    if (verifyUser) {
      throw reply.code(400).send({ message: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(date.password, 10);

    const createUser = await prisma.user.create({
      data: {
        name: date.name,
        email: date.email,
        password: hashedPassword,
      },
    });

    return createUser;
  });

  app.post('/login', async (request, reply) => {
    const bodySchema = yup.object({
      email: yup
        .string()
        .email('Email inválido')
        .required('Preenchimento obrigatório'),
      password: yup
        .string()
        .matches(
          /((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
          'Senha incorreta!'
        )
        .required('Preenchimento obrigatório'),
    });

    const data = await bodySchema.validate(request.body);

    const verifyUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (verifyUser) {
      const passwordMatches = bcrypt.compareSync(
        data.password,
        verifyUser.password
      );

      if (passwordMatches) {
        const token = app.jwt.sign(
          {
            email: verifyUser.email,
          },
          {
            expiresIn: '30 days',
          }
        );

        reply.code(200).send({ token: token, userId: verifyUser.id });
        console.log('token', token);
      } else {
        reply.code(401).send({ message: 'Senha incorreta!' });
      }
    } else {
      reply.code(404).send({ message: 'Usuário não cadastrado' });
    }
  });
}
