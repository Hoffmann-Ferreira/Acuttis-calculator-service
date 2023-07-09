export default function hoursCalculator(
  initial,
  final,
  dayValue,
  nightValue,
  initialDate,
  finalDate
) {
  const initialDateParse = initialDate.split('T');
  const finalDateParse = finalDate.split('T');

  //milliseconds
  let workedmilli = initial > final ? initial - final : final - initial;

  //hours
  let workedHours = workedmilli / (60 * 60 * 1000);
  //minutes
  let workedMinutes = workedmilli / (60 * 1000);

  if (final < initial) {
    console.log('datas divergentes');
    return;
  }
  if (workedHours > 24) {
    console.log('trabalho escravo');
    return;
  }

  let started = initial.getHours() * 60 + initial.getMinutes();

  let daytimeMinutes = 0;
  let nightMinutes = 0;

  for (let i = 0; i < Math.abs(workedMinutes); i++) {
    if (started == 24 * 60) {
      started = 0;
    }

    if (started >= 5 * 60 && started <= 22 * 60) {
      daytimeMinutes++;
      started++;
    }
    if (
      (started >= 22 * 60 && started <= 24 * 60) ||
      (started >= 0 && started <= 5 * 60)
    ) {
      nightMinutes++;
      started++;
    }
    if (daytimeMinutes + nightMinutes == workedMinutes) {
      break;
    }
  }
  console.log('workedMinutes', workedMinutes);
  console.log('minutosDiurnos', daytimeMinutes);
  console.log('minutosNoturnos', nightMinutes);
  const amount =
    (daytimeMinutes / 60) * dayValue + (nightMinutes / 60) * nightValue;

  const result = {
    daytimePrice: dayValue,
    nightPrice: nightValue,
    amount: Number(amount.toFixed(2)),
    daytimeMinutes: daytimeMinutes,
    nightMinutes: nightMinutes,
    initialDate: initialDateParse[0],
    finalDate: finalDateParse[0],
    initialHours: initialDateParse[1],
    finalHours: finalDateParse[1],
  };

  return result;
}
