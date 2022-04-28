import { useStore } from "effector-react";
import { FC } from "react";
import { doOpenModal } from "../../entities/Modal/model";
import { deleteFromVariantList } from "../../entities/Variant/model";
import { Button } from "../../shared/components/button";
import { resetTyping, setTyping } from "../Typing";
import {
  $isOneVariantPath,
  $isUpPathButton,
  addToList,
  endTypingUpdate,
  setChangingId,
  setOnPathButton,
} from "./model";
import styles from "./styles.module.css";

type VariantActionsType = {
  isChanging: boolean;
  isButtonBlocked: boolean;
  id: string;
  isAlreadyConnected: boolean;
  connectedPath: string | null;
};
export const VariantActions: FC<VariantActionsType> = ({
  isChanging,
  isButtonBlocked,
  id,
  isAlreadyConnected,
  connectedPath,
}) => {
  const isUpPathButton = useStore($isUpPathButton);
  const isOneVariantShowPath = useStore($isOneVariantPath);
  return (
    <>
      <article className={styles.actionContainer}>
        {!isChanging ? (
          <button
            disabled={isButtonBlocked}
            onClick={() => {
              setTyping(id);
            }}
          >
            Ch
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                resetTyping();
                endTypingUpdate("save");
              }}
            >
              S
            </button>
            <button
              onClick={() => {
                resetTyping();
                endTypingUpdate("reset");
              }}
            >
              R
            </button>
          </>
        )}
      </article>
      <article className={styles.actionContainer}>
        <button
          disabled={isButtonBlocked || isChanging}
          onClick={() => {
            setChangingId(id);
            doOpenModal("selectId");
          }}
          onMouseEnter={() => {
            setOnPathButton({
              status: true,
              id: id,
            });
          }}
          onMouseLeave={() => {
            setOnPathButton({
              status: false,
              id: "",
            });
          }}
          className={styles.PHbutton}
        >
          Ph {isAlreadyConnected && "+"}
          {isAlreadyConnected &&
            isUpPathButton.status &&
            (isOneVariantShowPath ? isUpPathButton.id === id : true) && (
              <div className={styles.PHbutton_info}>{connectedPath}</div>
            )}
        </button>
      </article>
      <article className={styles.actionContainer}>
        <Button
          disabled={isButtonBlocked || isChanging}
          text={"D"}
          click={() => {
            deleteFromVariantList(id);
          }}
        />
      </article>
      <article className={styles.actionContainer}>
        <Button
          disabled={isButtonBlocked || isChanging}
          click={() => {
            addToList();
          }}
          text={"Add"}
        />
      </article>
    </>
  );
};
