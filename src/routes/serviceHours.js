import { prisma } from '../lib/prisma.js';
import * as yup from 'yup';
import hoursCalculator from '../factory/hoursCalculatorFactory.js';

export async function serviceHours(app) {
  app.addHook('preHandler', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: 'Usuário não logado!' });
    }
  });

  app.setErrorHandler(function (error, request, reply) {
    console.error('Ocorreu um erro:', error.message);
    const menssageError = error.message;

    reply.status(400).send({ menssageError });
  });

  app.post('/calculate-hours', async (request, reply) => {
    const bodySchema = yup.object({
      collaborator: yup.string().required('Preenchimento de nome obrigatório'),
      initialDate: yup
        .string()
        .matches(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
          'Formato esperado Ano/Mês/DiaTHorário ex 2023-07-08T15:40'
        )
        .required('Preenchimento de data e horário inicial obrigatório'),
      finalDate: yup
        .string()
        .matches(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
          'Formato esperado Ano/Mês/DiaTHorário ex 2023-07-08T15:40'
        )
        .required('Preenchimento de data e horário final obrigatório'),
      daytimePrice: yup
        .string()
        .matches(
          /^\d+(?:\.\d+)?$/,
          'Formato de valor errado, deve conter N.N ex 22.90'
        )
        .required('Preenchimento do valor da hora diurna obrigatório'),
      nightPrice: yup
        .string()
        .matches(
          /^\d+(?:\.\d+)?$/,
          'Formato de valor errado, deve conter N.N ex 22.90'
        )
        .required('Preenchimento do valor da hora noturna obrigatório'),
    });

    const dataRequest = await bodySchema.validate(request.body);

    const initialDate = new Date(dataRequest.initialDate);
    const finalDate = new Date(dataRequest.finalDate);
    const dayValue = parseFloat(dataRequest.daytimePrice);
    const nightValue = parseFloat(dataRequest.nightPrice);

    const result = hoursCalculator(
      initialDate,
      finalDate,
      dayValue,
      nightValue,
      dataRequest.initialDate,
      dataRequest.finalDate
    );

    const day = +(result.daytimeMinutes / 60).toFixed(2);
    const nigth = +(result.nightMinutes / 60).toFixed(2);

    const { email } = request.user;

    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const createdServiceHours = await prisma.serviceHours.create({
      data: {
        collaborator: dataRequest.collaborator,
        initialDate: result.initialDate,
        finalDate: result.finalDate,
        initialHours: result.initialHours,
        finalHours: result.finalHours,
        daytimePrice: result.daytimePrice,
        nightPrice: result.nightPrice,
        hoursDay: day,
        hoursNigth: nigth,
        amount: result.amount,
        userId: findUser.id,
      },
    });

    return reply.code(200).send({ createdServiceHours });
  });

  app.get('/find-all-hours/:id', async (request, reply) => {
    const paramsSchema = yup.object({
      id: yup.string().uuid('id inválido'),
    });

    const dataParams = await paramsSchema.validate(request.params);

    const { email } = request.user;

    const verifyUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (dataParams.id === verifyUser.id) {
      const workedHours = await prisma.serviceHours.findMany({
        where: {
          userId: dataParams.id,
        },
      });

      reply.code(200).send({ hours: workedHours });
    } else {
      reply.code(401).send({ message: 'Não autorizado!' });
    }
  });
}
