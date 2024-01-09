import { FunctionComponent, MouseEvent } from "react";
import styles from "./styles.module.css";

interface ButtonProps {
  symbol: string | number;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  isSpan?: boolean;
  isBlue?: boolean;
  isGray?: boolean;
  isGrayLight?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({
  symbol,
  onClick,
  isSpan = false,
  isBlue = false,
  isGray = false,
  isGrayLight = false,
}) => {
  return (
    <div
      className={` flex justify-center items-center 
      ${styles.button} 
      ${isSpan && "col-span-2"} 
      ${isBlue && styles.blue} 
      ${isGray && styles.gray}
      `}
      onClick={onClick}
    >
      {symbol}
    </div>
  );
};

export default Button;
