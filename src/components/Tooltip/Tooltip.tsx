
import { CSSProperties, FC, useState, MouseEvent, ReactNode, HTMLAttributes } from "react";
import { prettifySpaces } from "../PrettyNumber/common/prettifySpaces";
import "./Tooltip.scss";

interface iPosition {
  "--x": string;
  "--y": string;
  "--display"?: string;
};

interface iTooltip {
  children: ReactNode;
  value?: number | string;
  props?: HTMLAttributes<HTMLSpanElement>;
  className?: string;
  arrowColor?: "arrow-white" | "arrow-black";
  hidden?: boolean;
};

const INIT_POSITION = { "--x": "1px", "--y": "1px", "--display": "none" };
const MINUS = "-";

const strategies = {
  number: (value: any) => (value < 0 ? MINUS : "") + prettifySpaces(Math.abs(value)),
  string: (value: any) => value,
  undefined: () => "",
  null: () => ""
};

export const Tooltip: FC<iTooltip> = ({ children, value, props, className = "", arrowColor = "arrow-white", hidden }) => {
  const [position, setPosition] = useState<iPosition>(INIT_POSITION);
  const type = typeof value as keyof typeof strategies;

  const onMouseOver = (e: MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLSpanElement;
    target.classList.add('active');
    const { xCoord, yCoord } = getCoords(target);
    setPosition({ "--x": xCoord, "--y": yCoord });
  };

  const getCoords = (target: HTMLSpanElement) => {
    const { x, y, width } = target.getBoundingClientRect();
    const xCoord = `${x + (width / 2)}px`;
    const yCoord = `${y - 25}px`;
    return { xCoord, yCoord };
  };

  const onMouseLeave = (e: MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLSpanElement;
    target.classList.remove('active');
    setPosition(INIT_POSITION);
  };

  if (!children) return null;

  return (
    <span
      {...props}
      className={`Tooltip fixed ${arrowColor} ${className} ${hidden ? "hidden" : ""}`}
      data-value={strategies[type]?.(value)}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      style={position as CSSProperties}
    >
      {children}
    </span>
  );
};