import { useStore } from "effector-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { $IdList } from "../../entities/Id/model";
import { defineIdOfTheLastNode } from "../../shared/helpers/defineTheLastNode";
import {
  addToIdList,
  clearAllUnsaved,
  deleteFromList,
  saveToList,
} from "./model";
import styles from "./styles.module.css";
import { randomId } from "../../shared/helpers/idRandomizer";

type IdActionsType = {
  id: string;
};

export const IdActions: FC<IdActionsType> = ({ id }) => {
  const navigate = useNavigate();
  const IdList = useStore($IdList);
  return (
    <section className={styles.IdActionsContainer}>
      <article
        className={styles.IdActionButtonContainer}
        onClick={(event) => {
          event.stopPropagation();
          saveToList(id);
        }}
      >
        S
      </article>
      <article className={styles.IdActionButtonContainer}>R</article>
      <article
        className={styles.IdActionButtonContainer}
        onClick={(event) => {
          event.stopPropagation();
          if (id === "root") {
            return;
          }
          deleteFromList(id);
          navigate(`/creator/${defineIdOfTheLastNode(IdList)}`);
        }}
      >
        D
      </article>
    </section>
  );
};
export const InstrumentActions = () => {
  return (
    <div className={styles.InstrumentsContainer}>
      <article
        className={styles.IdActionButtonContainer}
        onClick={() => {
          addToIdList(randomId());
        }}
      >
        A
      </article>
      <article
        className={styles.IdActionButtonContainer}
        onClick={() => {
          clearAllUnsaved();
        }}
      >
        Cl
      </article>
    </div>
  );
};
