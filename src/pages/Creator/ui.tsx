import { useStore } from "effector-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { $Dialogs } from "../../entities/EditorDialog";
import { FieldArea } from "../../entities/Field";
import { Id } from "../../entities/Id";
import { $ActiveId, $IdList } from "../../entities/Id/model";
import { $VariantList, Variant } from "../../entities/Variant";
import { changeVariant, defineVariants } from "../../entities/Variant/model";
import { defineActiveId, IdActions } from "../../features/List";
import { InstrumentActions } from "../../features/List/ui";
import { $TypingVariantField } from "../../features/Typing";
import { VariantActions } from "../../features/variantActions";
import {
  $isOneVariantPath,
  setManyVariants,
  setOneVariant,
} from "../../features/variantActions/model";
import { debounce } from "../../shared/helpers/debounce";
import { saveTriggerEvent } from "./model";
import styles from "./styles.module.css";

const NodeList = () => {
  const list = useStore($IdList);
  return (
    <div className={styles.NodeListContainer}>
      <section className={styles.NodeListSection}>
        {list.map((idObj) => {
          return (
            <article
              key={idObj.id}
              className={styles.IdContainer}
              onClick={(event) => {
                event.stopPropagation();
                defineActiveId(idObj.id);
              }}
            >
              <Id
                id={idObj.id}
                selected={idObj.selected}
                newID={idObj.newID}
                before={<IdActions id={idObj.id} />}
              />
            </article>
          );
        })}
      </section>
      <section className={styles.Instruments}>
        <InstrumentActions />
      </section>
    </div>
  );
};

const InputsList = () => {
  const inputs = useStore($VariantList);
  const nowTypingID = useStore($TypingVariantField);
  const isOnePath = useStore($isOneVariantPath);
  return (
    <div>
      <button
        onClick={() => {
          if (isOnePath) {
            setManyVariants();
          } else {
            setOneVariant();
          }
        }}
      >
        many paths
      </button>
      {inputs.map((variant) => {
        return (
          <article key={variant.id}>
            <Variant
              isNowTyping={nowTypingID === variant.id}
              name={variant.id}
              value={variant.discription}
              changer={(value: string) => {
                changeVariant({
                  id: variant.id,
                  value: value,
                });
              }}
              after={
                <VariantActions
                  isButtonBlocked={nowTypingID !== null}
                  isChanging={nowTypingID === variant.id}
                  id={variant.id}
                  isAlreadyConnected={variant.path !== null}
                  connectedPath={variant.path}
                />
              }
            />
          </article>
        );
      })}
    </div>
  );
};

const saver = () => {
  return debounce(saveTriggerEvent, 2500);
};

export const Creator = () => {
  const nav = useNavigate();
  const activeId = useStore($ActiveId);
  const Dialots = useStore($Dialogs);
  useEffect(() => {
    nav(`/creator/${activeId}`);
    defineVariants(Dialots[activeId].variants);
  }, [activeId, nav]);
  return (
    <article className={styles.Creator}>
      <section className={styles.ListContainer}>
        <NodeList />
      </section>
      <section className={styles.WorkplaceContainer}>
        <section>
          <FieldArea actions={<></>} value={activeId} saver={saver} />
        </section>
        <section>
          <InputsList />
        </section>
      </section>
    </article>
  );
};
