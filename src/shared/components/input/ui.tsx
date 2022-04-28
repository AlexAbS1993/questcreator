import { FC } from "react";
import styles from "./styles.module.css";

type InputPropsType = {
  name: string;
  value: string;
  changer: any;
  placeholder?: string;
  id?: string;
  disabled: boolean;
};

export const Input: FC<InputPropsType> = ({
  name,
  value,
  changer,
  disabled,
}) => {
  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        name={name}
        value={value}
        disabled={disabled}
        onChange={(event) => {
          event.preventDefault();
          event.stopPropagation();
          changer(event.target.value);
        }}
      />
    </div>
  );
};
