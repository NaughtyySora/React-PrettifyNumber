
const symbols = {
  comma: ",",
  dot: "."
};

const THREE_DIGITS = /\d{3}/g;

const spacesFormatter = (options: Intl.NumberFormatOptions = {}, value: number | string) =>
  new Intl.NumberFormat("fi-FI", options).format(Number(value));

export const prettifySpaces = (value: number, maximumFractionDigits: number = 12) => {
  if (!Number(value) || isNaN(value) || !isFinite(value)) return "0";
  const fractionLength = value < 1 ? maximumFractionDigits : 3;
  const result = spacesFormatter({ maximumFractionDigits: fractionLength }, value).replace(symbols.comma, symbols.dot);
  return value < 1 ? result.replace(THREE_DIGITS, "$& ") : result;
};