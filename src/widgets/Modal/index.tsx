import { useGate, useStore } from "effector-react";
import { Modal } from "../../entities/Modal";
import { GmodalGate, setAcceptOfIDListSelect } from "./model";
import { ModalWithSelect } from "./ui";
import styles from "./styles.module.css";
import { $SelectedList } from "../../entities/SelectedList/model";
import {
  $SelectedIdOnModalList,
  setSelectedIdOnModalList,
} from "../../features/SelectIdAtList/model";
import { $AlreadySelectedPath } from "../../entities/Variant/model";

export const SelectIdListModal = () => {
  useGate(GmodalGate);
  const idList = useStore($SelectedList);
  const selected = useStore($SelectedIdOnModalList);
  const alreadySelectedPath = useStore($AlreadySelectedPath);
  return (
    <>
      <Modal>
        <div className={styles.SelectedIDListModalContainer}>
          <h5>{selected || alreadySelectedPath || "Не выбрано"}</h5>
          <ModalWithSelect
            selectedId={selected}
            list={idList}
            selectIt={setSelectedIdOnModalList}
            accepter={setAcceptOfIDListSelect}
          />
        </div>
      </Modal>
    </>
  );
};
