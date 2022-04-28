import { FC, ReactNode } from "react";
import styles from "./styles.module.css";

type IdElementType = {
  id: string;
  newID: boolean;
  selected: boolean;
  before: ReactNode;
};

export const Id: FC<IdElementType> = ({ id, newID, selected, before }) => {
  return (
    <div
      className={[
        styles.NodeListElement,
        newID ? styles.NodeListElement__active__new : "",
        selected ? styles.NodeListElement__active : "",
      ].join(" ")}
    >
      <div>{before}</div>
      <div className={styles.Id} key={id}>
        {id}
      </div>
    </div>
  );
};
