import { FC, HTMLAttributes, ReactNode } from "react";
import { colorizeValue } from "./common/colorizeValue";
import { prettifyNumber } from "./common/prettifyNumber";
import { Tooltip } from "../Tooltip/Tooltip";
import "./PrettyNumber.scss";

export interface iPrettyNumber extends HTMLAttributes<HTMLSpanElement> {
  value: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  basicColorizeValue?: number;
  newColorValue?: number;
  children?: ReactNode;
  margin?: string;
  noColor?: boolean;
  hideTooltip?: boolean;
};

const INIT_MARGIN = "0.5rem";

export const PrettyNumber: FC<iPrettyNumber> = ({
  className = "",
  value,
  prefix = "",
  suffix = "",
  basicColorizeValue = 0,
  newColorValue,
  children,
  margin,
  noColor,
  hideTooltip = false,
  ...props
}) => {
  const colorizeClass = colorizeValue({ basicValue: basicColorizeValue, newValue: newColorValue || value });
  
  return (
    <span
      className={`PrettyNumber ${noColor ? "" : colorizeClass} ${className}`}
      {...props}
    >
      {children}

      <span className="PrettyNumber-container">
        {prefix && (
          <span className="PrettyNumber-prefix" style={{ marginRight: margin || INIT_MARGIN }}>
            {prefix}
          </span>
        )}

        <Tooltip
          className="PrettyNumber-value"
          value={value}
          hidden={value === 0 || hideTooltip}
        >
          {prettifyNumber(value)}
        </Tooltip>

        {suffix && (
          <span className="PrettyNumber-suffix" style={{ marginLeft: margin || INIT_MARGIN }}>
            {suffix}
          </span>
        )}
      </span>
    </span>
  );
};
