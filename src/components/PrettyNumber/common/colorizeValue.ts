interface iColorizeValue {
  basicValue?: number;
  newValue: number;
};

const isValid = (n: number) => typeof n === "number" && !isNaN(n) && isFinite(n);

export const colorizeValue = ({ basicValue = 0, newValue }: iColorizeValue) => {
  if (!isValid(basicValue) || !isValid(newValue) || (basicValue === newValue)) return "neutral";
  return newValue < basicValue ? "negative" : "positive";
};
