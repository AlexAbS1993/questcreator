import { FC, ReactNode } from "react";
import styles from "./styles.module.css";

type ModalPropsType = {
  children: ReactNode;
};

export const Modal: FC<ModalPropsType> = ({ children }) => {
  return (
    <div
      className={styles.ModalContainer}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <section className={styles.Modal}>{children}</section>
    </div>
  );
};
