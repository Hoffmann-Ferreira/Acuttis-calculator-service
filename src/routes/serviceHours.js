// import { prisma } from '../lib/prisma.js';
import * as yup from 'yup';
import hoursCalculator from '../factory/hoursCalculatorFactory.js';

export async function serviceHours(app) {
  app.post('/calculate-hours', async (request) => {
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
          /^\d+\.\d{2}$/,
          'Formato de valor errado, deve conter N.N ex 22.90'
        )
        .required('Preenchimento do valor da hora diurna obrigatório'),
      nightPrice: yup
        .string()
        .matches(
          /^\d+\.\d{2}$/,
          'Formato de valor errado, deve conter N.N ex 22.90'
        )
        .required('Preenchimento do valor da hora noturna obrigatório'),
    });

    const data = await bodySchema.validate(request.body);


    const initialDate = new Date(data.initialDate);
    const finalDate = new Date(data.finalDate);
    const dayValue = parseFloat(data.daytimePrice);
    const nightValue = parseFloat(data.nightPrice);

    const result = hoursCalculator(
      initialDate,
      finalDate,
      dayValue,
      nightValue,
      data.initialDate,
      data.finalDate
    );

    

    return result;
  });
}
