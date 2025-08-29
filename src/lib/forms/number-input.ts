type FuncArg = number | string | undefined;

interface IFuncArgs {
  decimal: number;
  inputValue: number | string;
  props: {
    max: FuncArg;
    min: FuncArg;
    step: FuncArg;
  };
}

const getRoundedValue = (value: string, decimal = 0) =>
  Math.floor(Number(value) * 10 ** decimal) / 10 ** decimal;

export const stepperIncrement = ({ props, inputValue, decimal }: IFuncArgs): string | number => {
  const { step, max, min } = props;
  const value = String(inputValue || '0');
  const numMin = Number(min);

  const roundedValue = getRoundedValue(value, decimal);
  const incrementedValue = roundedValue + Number(step || 1);

  if (min !== undefined && incrementedValue < numMin) return numMin.toFixed(decimal);

  if ((!max && max !== 0) || incrementedValue <= Number(max))
    return incrementedValue.toFixed(decimal);

  return value;
};

export const stepperDecrement = ({ props, inputValue, decimal }: IFuncArgs): string | number => {
  const { step, min, max } = props;
  const value = String(inputValue || '0');
  const numMax = Number(max);

  const roundedValue = getRoundedValue(value, decimal);
  const decrementedValue = roundedValue - Number(step || 1);

  if (max !== undefined && decrementedValue > numMax) return numMax.toFixed(decimal);

  if ((!min && min !== 0) || decrementedValue >= Number(min))
    return decrementedValue.toFixed(decimal);

  return value;
};
