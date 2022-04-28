import { FC } from "react";
import styles from "./styles.module.css";

type TextAreaType = {
  disabled: boolean;
  name: string;
  value: string;
  changer: any;
  saver?: any;
};

export const TextArea: FC<TextAreaType> = ({
  disabled,
  name,
  value,
  changer,
  saver,
}) => {
  return (
    <textarea
      disabled={disabled}
      name={name}
      className={styles.Textarea}
      style={{
        resize: "none",
      }}
      value={value}
      onChange={(event) => {
        event.preventDefault();
        changer(event.target.value);
        if (saver) {
          saver(event.target.value);
        }
      }}
    ></textarea>
  );
};
