import { FC } from "react";
import styles from "./styles.module.css";

type ButtonPropsType = {
  text: string;
  click: any;
  disabled: boolean;
};

export const Button: FC<ButtonPropsType> = ({ text, click, disabled }) => {
  return (
    <button onClick={click} disabled={disabled} className={styles.Button}>
      {text}
    </button>
  );
};
