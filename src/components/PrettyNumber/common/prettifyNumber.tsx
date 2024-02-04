const regexps = { fractionZeros: /\.0*/, findZeros: /^(\-*)(0.0+)(\d*)/ };
const prettyOptions = { compactDisplay: "short", notation: "compact", maximumFractionDigits: 2 };

const MAX_FRACTION_DIGITS = 3;
const PRETTY_RANGE = 1000;
const MIN_INTEGER = 1;
const MIN_FRACTION = 0.0001;

const numberFormatter = <T extends Object>(v: number, options?: T) =>
  new Intl.NumberFormat("en-US", options || { maximumFractionDigits: 20 }).format(v);

export const prettifyNumber = (num: number) => {
  if (!Number(num) || isNaN(num) || !isFinite(num)) return "0";
  const positiveNumber = Math.abs(num);
  const formatter = numberFormatter.bind(null, num);

  if (positiveNumber < MIN_INTEGER) {
    if (positiveNumber >= MIN_FRACTION) return formatter({ maximumFractionDigits: 4 });
    const [, sign, zeros, digits] = formatter().match(regexps.findZeros) || [];
    return sign + zeros?.replace(regexps.fractionZeros, `.(${zeros.length - 2})`) + digits?.slice(0, MAX_FRACTION_DIGITS)
  }
  return formatter(positiveNumber < PRETTY_RANGE ? { maximumFractionDigits: 2 } : prettyOptions);
};
