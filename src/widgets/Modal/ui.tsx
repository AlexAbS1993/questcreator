import { FC } from "react";
import { doCloseModal } from "../../entities/Modal/model";
import styles from "./styles.module.css";

type ModalWithSelectPropsType = {
  list: any[];
  accepter: any;
  selectIt: any;
  selectedId: string | null;
};

export const ModalWithSelect: FC<ModalWithSelectPropsType> = ({
  list,
  accepter,
  selectIt,
  selectedId,
}) => {
  return (
    <div className={styles.ModalSelectContainer}>
      <section className={styles.ModalSelectedList}>
        <ul>
          {list.map((element) => {
            return (
              <li
                key={element.key}
                onClick={(event) => {
                  event.stopPropagation();
                  selectIt(element.name);
                }}
              >
                {element.name}
              </li>
            );
          })}
        </ul>
      </section>
      <section className={styles.ModalActionButtons}>
        <button
          disabled={!selectedId}
          onClick={() => {
            accepter();
          }}
        >
          Accept
        </button>
        <button
          onClick={() => {
            doCloseModal();
          }}
        >
          Decline
        </button>
      </section>
    </div>
  );
};
